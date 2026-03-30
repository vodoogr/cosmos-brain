import json
import math
import os
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_SERVICE_ROLE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

BUCKET_NAME = "small-body-assets"
STEP_COUNT = 720
STEP_SECONDS = 3600
DAYS_SPAN = 30  # +/- 30 days around "now" for a visual orbit window

sb: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)


def safe_float(value: Any) -> Optional[float]:
    if value is None or value == "":
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def solve_kepler(mean_anomaly_rad: float, eccentricity: float, iterations: int = 15) -> float:
    """
    Solve Kepler's equation:
        M = E - e sin(E)
    """
    e = eccentricity
    E = mean_anomaly_rad if e < 0.8 else math.pi

    for _ in range(iterations):
        f = E - e * math.sin(E) - mean_anomaly_rad
        fp = 1.0 - e * math.cos(E)
        if abs(fp) < 1e-12:
            break
        E = E - f / fp

    return E


def orbital_position_au(
    a_au: float,
    e: float,
    i_deg: float,
    node_deg: float,
    arg_peri_deg: float,
    mean_anomaly_deg: float,
) -> Dict[str, float]:
    """
    Compute heliocentric ecliptic-ish 3D position from classic Keplerian elements.
    This is a visual approximation suitable for rendering, not a high-precision propagator.
    """
    i = math.radians(i_deg)
    node = math.radians(node_deg)
    arg_peri = math.radians(arg_peri_deg)
    M = math.radians(mean_anomaly_deg % 360.0)

    E = solve_kepler(M, e)

    # Orbital plane coordinates
    x_orb = a_au * (math.cos(E) - e)
    y_orb = a_au * math.sqrt(max(0.0, 1.0 - e * e)) * math.sin(E)
    z_orb = 0.0

    # Rotate by argument of perihelion, inclination, ascending node
    cos_O = math.cos(node)
    sin_O = math.sin(node)
    cos_i = math.cos(i)
    sin_i = math.sin(i)
    cos_w = math.cos(arg_peri)
    sin_w = math.sin(arg_peri)

    x = (
        (cos_O * cos_w - sin_O * sin_w * cos_i) * x_orb
        + (-cos_O * sin_w - sin_O * cos_w * cos_i) * y_orb
    )
    y = (
        (sin_O * cos_w + cos_O * sin_w * cos_i) * x_orb
        + (-sin_O * sin_w + cos_O * cos_w * cos_i) * y_orb
    )
    z = (sin_w * sin_i) * x_orb + (cos_w * sin_i) * y_orb + z_orb

    return {"x_au": x, "y_au": y, "z_au": z}


def build_orbit_points(body: Dict[str, Any]) -> List[Dict[str, Any]]:
    a = safe_float(body.get("semi_major_axis_au"))
    e = safe_float(body.get("eccentricity"))
    i = safe_float(body.get("inclination_deg"))
    period_days = safe_float(body.get("orbital_period_days"))

    # These column names are from your current small_bodies schema
    node = safe_float(body.get("ascending_node_deg"))
    arg_peri = safe_float(body.get("arg_perihelion_deg"))
    mean_anomaly = safe_float(body.get("mean_anomaly_deg"))

    # Fallbacks for older / partial rows
    if node is None:
        node = 0.0
    if arg_peri is None:
        arg_peri = 0.0
    if mean_anomaly is None:
        mean_anomaly = 0.0

    if None in (a, e, i, period_days):
        raise ValueError(
            f"Body {body.get('name')} is missing orbital fields required for orbit generation"
        )

    now = datetime.now(timezone.utc)
    start_time = now - timedelta(days=DAYS_SPAN)

    points: List[Dict[str, Any]] = []
    mean_motion_deg_per_day = 360.0 / period_days

    for idx in range(STEP_COUNT):
        t = start_time + timedelta(seconds=idx * STEP_SECONDS)
        delta_days = (t - now).total_seconds() / 86400.0
        current_M = mean_anomaly + mean_motion_deg_per_day * delta_days

        pos = orbital_position_au(
            a_au=a,
            e=e,
            i_deg=i,
            node_deg=node,
            arg_peri_deg=arg_peri,
            mean_anomaly_deg=current_M,
        )

        points.append(
            {
                "t": t.isoformat(),
                "x_au": pos["x_au"],
                "y_au": pos["y_au"],
                "z_au": pos["z_au"],
            }
        )

    return points


def upload_json_to_storage(path: str, payload: Dict[str, Any]) -> None:
    content = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    sb.storage.from_(BUCKET_NAME).upload(
        path=path,
        file=content,
        file_options={
            "content-type": "application/json",
            "upsert": "true",
        },
    )


def upsert_ephemeris_asset(
    small_body_id: str,
    storage_path: str,
    time_start: str,
    time_end: str,
    point_count: int,
) -> None:
    existing = (
        sb.table("small_body_ephemeris_assets")
        .select("id")
        .eq("small_body_id", small_body_id)
        .eq("asset_type", "orbit_path")
        .limit(1)
        .execute()
    )

    payload = {
        "small_body_id": small_body_id,
        "asset_type": "orbit_path",
        "storage_path": storage_path,
        "format": "json",
        "time_start": time_start,
        "time_end": time_end,
        "step_seconds": STEP_SECONDS,
        "point_count": point_count,
        "metadata": {
            "generator": "keplerian_visual_v1",
            "units": "au",
        },
    }

    if existing.data:
        asset_id = existing.data[0]["id"]
        sb.table("small_body_ephemeris_assets").update(payload).eq("id", asset_id).execute()
    else:
        sb.table("small_body_ephemeris_assets").insert(payload).execute()


def fetch_bodies(limit: int = 200) -> List[Dict[str, Any]]:
    # Include optional fields if your schema already has them.
    # If some columns do not exist yet in your DB, remove them from this select and defaults above will apply.
    query = (
        sb.table("small_bodies")
        .select(
            "id,name,is_neo,is_pha,semi_major_axis_au,eccentricity,inclination_deg,"
            "ascending_node_deg,arg_perihelion_deg,mean_anomaly_deg,orbital_period_days"
        )
        .limit(limit)
    )
    result = query.execute()
    return result.data or []


def main() -> None:
    bodies = fetch_bodies(limit=500)
    if not bodies:
        print("No small bodies found.")
        return

    ok = 0
    failed = 0

    for body in bodies:
        name = body["name"]
        try:
            points = build_orbit_points(body)

            payload = {
                "small_body_id": body["id"],
                "name": name,
                "is_neo": body.get("is_neo", False),
                "is_pha": body.get("is_pha", False),
                "units": "au",
                "points": points,
            }

            safe_name = (
                name.lower()
                .replace("/", "-")
                .replace(" ", "-")
                .replace("(", "")
                .replace(")", "")
                .replace(",", "")
            )
            storage_path = f"orbits/{body['id']}/{safe_name}.json"

            upload_json_to_storage(storage_path, payload)
            upsert_ephemeris_asset(
                small_body_id=body["id"],
                storage_path=storage_path,
                time_start=points[0]["t"],
                time_end=points[-1]["t"],
                point_count=len(points),
            )

            ok += 1
            print(f"[OK] {name} -> {storage_path}")

        except Exception as exc:
            failed += 1
            print(f"[FAIL] {name}: {exc}")

    print(f"Completed. ok={ok}, failed={failed}")


if __name__ == "__main__":
    main()