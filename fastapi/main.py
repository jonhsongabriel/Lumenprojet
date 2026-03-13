from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import sqlite3
from datetime import datetime

app = FastAPI(title="Moniteur Panneau Solaire Lumen")

# CORS pour React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permet tous les front (prod & dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "donnees_solaire.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS mesures (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            tension REAL,
            courant REAL,
            puissance REAL
        )
    """)
    conn.commit()
    conn.close()

def enregistrer_donnees(tension, courant, puissance):
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute(
            "INSERT INTO mesures (timestamp, tension, courant, puissance) VALUES (?, ?, ?, ?)",
            (datetime.now().isoformat(), tension, courant, puissance)
        )
        conn.commit()
    finally:
        conn.close()

init_db()

MONITEUR_URL = "http://192.168.1.100:5000/api/donnees"

@app.get("/donnees-solaire")
def get_donnees():
    try:
        response = requests.get(MONITEUR_URL, timeout=5)
        response.raise_for_status()
        data = response.json()
        tension = float(data.get("tension", 0))
        courant = float(data.get("courant", 0))
        puissance = float(data.get("puissance", 0))

        # Enregistrement historique
        enregistrer_donnees(tension, courant, puissance)

        return {"tension": tension, "courant": courant, "puissance": puissance}
    except Exception as e:
        # Retourne toujours un format compatible pour le front
        return {"tension": 0, "courant": 0, "puissance": 0, "erreur": str(e)}

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
            "puissance": row[4]
        }
        for row in rows
    ]