from fastapi import APIRouter
from pydantic import BaseModel
import sqlite3
from datetime import datetime

router = APIRouter()

class Location(BaseModel):
    nom: str
    latitude: float
    longitude: float

# Création table site_solaire si inexistante
def init_db():
    conn = sqlite3.connect("lumen.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS site_solaire (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            latitude REAL,
            longitude REAL,
            created_at TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

@router.post("/location")
def save_location(data: Location):
    conn = sqlite3.connect("lumen.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO site_solaire (nom, latitude, longitude, created_at)
        VALUES (?, ?, ?, ?)
    """, (data.nom, data.latitude, data.longitude, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"message": "Coordonnées enregistrées avec succès"}

@router.get("/sites")
def get_sites():
    conn = sqlite3.connect("lumen.db")
    cursor = conn.cursor()
    cursor.execute("SELECT nom, latitude, longitude FROM site_solaire")
    rows = cursor.fetchall()
    conn.close()
    return [{"nom": row[0], "latitude": row[1], "longitude": row[2]} for row in rows]
