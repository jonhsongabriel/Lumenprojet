from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from datetime import datetime
import random

from routes.location import router as location_router  # ✅ routes pour le plan / sites

# -------------------------
# Création de l'app FastAPI (UNE SEULE FOIS)
# -------------------------
app = FastAPI(title="Moniteur Panneau Solaire Lumen")

# -------------------------
# CORS pour React
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ton frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Inclusion des routes du plan
# -------------------------
app.include_router(location_router)

# -------------------------
# Configuration base SQLite pour mesures solaires (inchangé)
# -------------------------
DB_FILE = "donnees_solaire.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS mesures (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            tension REAL,
            courant REAL
        )
    """)
    conn.commit()
    conn.close()

def enregistrer_donnees(tension, courant):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute(
        "INSERT INTO mesures (timestamp, tension, courant) VALUES (?, ?, ?)",
        (datetime.now().isoformat(), tension, courant)
    )
    conn.commit()
    conn.close()

init_db()

# -------------------------
# Simulation des données solaires (inchangé)
# -------------------------
def lire_donnees():
    tension = round(random.uniform(11.5, 13.5), 2)
    courant = round(random.uniform(0.5, 5.0), 2)
    return tension, courant

# -------------------------
# Routes FastAPI pour les données solaires (inchangé)
# -------------------------
@app.get("/donnees-solaire")
def get_donnees():
    tension, courant = lire_donnees()
    enregistrer_donnees(tension, courant)
    return {"tension": tension, "courant": courant}

@app.get("/historique")
def get_historique():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT * FROM mesures ORDER BY id DESC LIMIT 100")
    rows = c.fetchall()
    conn.close()
    return [
        {
            "id": row[0],
            "timestamp": row[1],
            "tension": row[2],
            "courant": row[3],
        }
        for row in rows
    ]
