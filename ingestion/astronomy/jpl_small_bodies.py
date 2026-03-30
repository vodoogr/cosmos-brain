import os
import requests
from supabase import create_client, Client

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_SERVICE_ROLE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

sb: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

JPL_URL = "https://ssd-api.jpl.nasa.gov/sbdb_query.api"

params = {
    "sb-kind": "a",
    "fields": "full_name,class,neo,pha,H,diameter,moid,a,e,i,per,om,w,ma",
    "limit": "200"
}

resp = requests.get(JPL_URL, params=params, timeout=60)
resp.raise_for_status()
payload = resp.json()

fields = payload["fields"]
rows = payload["data"]

# Buscar release activa
release_res = sb.table("small_body_releases").select("id").eq("is_active", True).limit(1).execute()
if not release_res.data:
    raise RuntimeError("No active small_body_release found")
release_id = release_res.data[0]["id"]

to_insert = []

for row in rows:
    item = dict(zip(fields, row))

    def parse_bool(v):
        if v is None:
            return False
        return str(v).lower() in ("y", "yes", "true", "1")

    def parse_float(v):
        try:
            return float(v) if v not in (None, "", "null") else None
        except Exception:
            return None

    name = item.get("full_name") or "Unknown"
    orbit_class = item.get("class")
    is_neo = parse_bool(item.get("neo"))
    is_pha = parse_bool(item.get("pha"))

    to_insert.append({
        "release_id": release_id,
        "name": name,
        "body_type": "asteroid",
        "orbit_class": orbit_class,
        "is_neo": is_neo,
        "is_pha": is_pha,
        "absolute_magnitude": parse_float(item.get("H")),
        "estimated_diameter_m": parse_float(item.get("diameter")),
        "moid_au": parse_float(item.get("moid")),
        "semi_major_axis_au": parse_float(item.get("a")),
        "eccentricity": parse_float(item.get("e")),
        "inclination_deg": parse_float(item.get("i")),
        "orbital_period_days": parse_float(item.get("per")),
        "ascending_node_deg": parse_float(item.get("om")),
        "arg_perihelion_deg": parse_float(item.get("w")),
        "mean_anomaly_deg": parse_float(item.get("ma")),
        "metadata": {
            "source": "JPL_SBDB",
            "raw_name": item.get("full_name")
        }
    })

# Inserción por bloques
chunk_size = 100
for i in range(0, len(to_insert), chunk_size):
    chunk = to_insert[i:i+chunk_size]
    sb.table("small_bodies").insert(chunk).execute()

print(f"Imported {len(to_insert)} small bodies into Supabase")