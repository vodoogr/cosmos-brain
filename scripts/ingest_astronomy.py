import math
import random
import os
import sys

MAX_STARS = 3000
ARMS = 4
ARM_OFFSET = (2 * math.pi) / ARMS
SPIN = 2.5
SPREAD = 0.6
CORE_STARS = 800

def main():
    print("Calculando coordenadas espirales para la Vía Láctea...")
    
    release_id = "11111111-1111-1111-1111-111111111111"
    filepath = "scripts/seed_galaxy.sql"
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write("-- DESACTIVAR CATÁLOGOS ANTIGUOS\n")
        f.write("UPDATE dataset_releases SET is_active = false WHERE kind = 'universe_catalog';\n\n")
        
        f.write("-- REGISTRAR NUEVO MILKY WAY DATASET\n")
        f.write(f"INSERT INTO dataset_releases (id, kind, version, label, is_active, metadata) \n")
        f.write(f"VALUES ('{release_id}', 'universe_catalog', '2.1.0', 'Procedural Milky Way (Astrophysics Math)', true, '{{\"source\": \"Logarithmic Spiral Simulation\", \"stars_count\": {MAX_STARS}}}');\n\n")

        f.write("-- VACIAR ASTROS VIEJOS DEL UNIVERSO PARA EVITAR COLISIONES\n")
        f.write("DELETE FROM astronomy_objects;\n\n")

        f.write("-- INYECTAR LA NUEVA GALAXIA ESPIRAL\n")
        f.write("INSERT INTO astronomy_objects (name, object_type, x, y, z, dataset_release_id) VALUES\n")

        records = []
        
        # 1. Núcleo Galáctico
        for i in range(CORE_STARS):
            radius = random.gauss(0, 80)
            theta = random.uniform(0, 2 * math.pi)
            x = radius * math.cos(theta)
            z = radius * math.sin(theta)
            y = random.gauss(0, 25)
            obj_type = "cluster" if random.random() > 0.8 else "star"
            records.append(f"('Core Star {i}', '{obj_type}', {x:.4f}, {y:.4f}, {z:.4f}, '{release_id}')")
            
        # 2. Brazos Espirales
        arm_stars = MAX_STARS - CORE_STARS
        for i in range(arm_stars):
            arm = i % ARMS
            radius = random.uniform(100, 1600)
            theta = (radius / 1600) * SPIN * math.pi + arm * ARM_OFFSET
            
            spreadX = random.gauss(0, SPREAD * radius * 0.15)
            spreadZ = random.gauss(0, SPREAD * radius * 0.15)
            
            x = radius * math.cos(theta) + spreadX
            z = radius * math.sin(theta) + spreadZ
            y = random.gauss(0, 10)
            
            rnd = random.random()
            obj_type = "star"
            if rnd < 0.04: obj_type = "nebula" 
            elif rnd < 0.01: obj_type = "galaxy"
            elif rnd < 0.06: obj_type = "cluster"
            
            records.append(f"('Sector {arm} Obj {i}', '{obj_type}', {x:.4f}, {y:.4f}, {z:.4f}, '{release_id}')")
            
        # Join values with comma, and end with semicolon
        f.write(",\n".join(records) + ";\n")
        
    print(f"\n[✔] COMPILACIÓN MATEMÁTICA EXITOSA.")
    print(f"-> Archivo generado en: {filepath}")
    print("-> Sube este archivo en el 'SQL Editor' de tu dashboard de Supabase y ejecútalo.")

if __name__ == "__main__":
    main()
