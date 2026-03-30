import os
from typing import Any, Dict, List, Optional

import requests
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_SERVICE_ROLE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

sb: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

JPL_URL = "https://ssd-api.jpl.nasa.gov/sbdb_query.api"


def safe_float(value: Any) -> Optional[float]:
    if value in (None, "", "null"):
        return None
    try:
        return float(value)
    except Exception:
        return None


def parse_bool(value: Any) -> bool:
    if value is None:
        return False
    return str(value).strip().lower() in {"y", "yes", "true", "1"}


def get_active_release_id() -> str:
    res = (
        sb.table("small_body_releases")
        .select("id")
        .eq("is_active", True)
        .limit(1)
        .execute()
    )
    if not res.data:
        raise RuntimeError("No active small_body_releases row found.")
    return res.data[0]["id"]


def fetch_jpl_objects(limit: int = 500) -> List[Dict[str, Any]]:
    # Fields documented by SBDB Query API / SBDB ecosystem.
    # We request enough orbital data to reconstruct a visual orbit.
    params = {
        "sb-kind": "a",
        "fields": ",".join(
            [
                "spkid",        # external id
                "full_name",    # display name
                "class",        # orbit class (used to be orbit_class)
                "neo",          # near-earth object flag
                "pha",          # potentially hazardous flag
                "H",            # absolute magnitude
                "diameter",     # estimated diameter
                "moid",         # minimum orbit intersection distance
                "a",            # semi-major axis
                "e",            # eccentricity
                "i",            # inclination
                "om",           # ascending node longitude
                "w",            # argument of perihelion
                "ma",           # mean anomaly
                "per",          # orbital period
                "epoch",        # epoch julian day
            ]
        ),
        "limit": str(limit),
    }

    resp = requests.get(JPL_URL, params=params, timeout=60)
    resp.raise_for_status()
    payload = resp.json()

    fields = payload["fields"]
    rows = payload["data"]

    objects: List[Dict[str, Any]] = []
    for row in rows:
        objects.append(dict(zip(fields, row)))
    return objects


def infer_body_type(name: str, orbit_class: Optional[str]) -> str:
    if name.startswith(("C/", "P/", "1P/", "2P/", "67P/", "153P/")):
        return "comet"
    if orbit_class and "comet" in orbit_class.lower():
        return "comet"
    return "asteroid"


def upsert_small_body(release_id: str, item: Dict[str, Any]) -> None:
    name = item.get("full_name") or "Unknown"
    orbit_class = item.get("class")
    external_id = item.get("spkid")

    payload = {
        "release_id": release_id,
        "external_id": str(external_id) if external_id is not None else None,
        "name": name,
        "body_type": infer_body_type(name, orbit_class),
        "orbit_class": orbit_class,
        "is_neo": parse_bool(item.get("neo")),
        "is_pha": parse_bool(item.get("pha")),
        "absolute_magnitude": safe_float(item.get("H")),
        "estimated_diameter_m": safe_float(item.get("diameter")),
        "moid_au": safe_float(item.get("moid")),
        "epoch_jd": safe_float(item.get("epoch")),
        "semi_major_axis_au": safe_float(item.get("a")),
        "eccentricity": safe_float(item.get("e")),
        "inclination_deg": safe_float(item.get("i")),
        "ascending_node_deg": safe_float(item.get("om")),
        "arg_perihelion_deg": safe_float(item.get("w")),
        "mean_anomaly_deg": safe_float(item.get("ma")),
        "orbital_period_days": safe_float(item.get("per")),
        "metadata": {
            "source": "JPL_SBDB",
            "raw_name": name,
        },
    }

    # Upsert logical by (release_id, name)
    existing = (
        sb.table("small_bodies")
        .select("id")
        .eq("release_id", release_id)
        .eq("name", name)
        .limit(1)
        .execute()
    )

    if existing.data:
        body_id = existing.data[0]["id"]
        sb.table("small_bodies").update(payload).eq("id", body_id).execute()
    else:
        sb.table("small_bodies").insert(payload).execute()


def main() -> None:
    release_id = get_active_release_id()
    items = fetch_jpl_objects(limit=500)

    ok = 0
    failed = 0

    for item in items:
        try:
            upsert_small_body(release_id, item)
            ok += 1
        except Exception as exc:
            failed += 1
            print(f"[FAIL] {item.get('full_name')}: {exc}")

    print(f"JPL enriched import completed. ok={ok}, failed={failed}")


if __name__ == "__main__":
    main()