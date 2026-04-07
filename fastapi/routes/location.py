from fastapi import APIRouter
from pydantic import BaseModel
import sqlite3
from datetime import datetime
from typing import List, Dict

router = APIRouter(prefix="/api/fastapi", tags=["locations"])

# ----------------------
# Modèle Pydantic
# ----------------------
class Location(BaseModel):
    nom: str
    latitude: float
    longitude: float

# ----------------------
# Chemin de la DB
# ----------------------
DB_FILE = "/data/lumen.db"  # utiliser un volume Docker pour persistance

# ----------------------
# Initialisation de la DB
# ----------------------
def init_db():
    with sqlite3.connect(DB_FILE) as conn:
        c = conn.cursor()
        c.execute("""
            CREATE TABLE IF NOT EXISTS site_solaire (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                created_at TEXT NOT NULL
            )
        """)
        conn.commit()

init_db()

# ----------------------
# Endpoint POST : sauvegarde d'un site
# ----------------------
@router.post("/location", response_model=Dict[str, str])
def save_location(data: Location):
    """Enregistre un site solaire avec nom et coordonnées"""
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO site_solaire (nom, latitude, longitude, created_at)
            VALUES (?, ?, ?, ?)
        """, (data.nom, data.latitude, data.longitude, datetime.now().isoformat()))
        conn.commit()
    return {"message": "Coordonnées enregistrées avec succès"}

# ----------------------
# Endpoint GET : récupération de tous les sites
# ----------------------
@router.get("/sites", response_model=List[Dict[str, object]])
def get_sites():
    """Retourne la liste de tous les sites solaires"""
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT nom, latitude, longitude FROM site_solaire")
        rows = cursor.fetchall()
    return [{"nom": str(row[0]), "latitude": float(row[1]), "longitude": float(row[2])} for row in rows]