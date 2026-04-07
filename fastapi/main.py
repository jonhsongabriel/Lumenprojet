from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from datetime import datetime
import os

# ----------------------
# Application FastAPI
# ----------------------
app = FastAPI(title="Moniteur Panneau Solaire Lumen")

# ----------------------
# Middleware CORS
# ----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------
# Chemin DB standardisé
# ----------------------
DB_DIR = "/data"
DB_FILE = os.path.join(DB_DIR, "donnees_solaire.db")
os.makedirs(DB_DIR, exist_ok=True)  # Création du dossier /data pour volume Docker

# ----------------------
# Initialisation DB
# ----------------------
def init_db():
    with sqlite3.connect(DB_FILE) as conn:
        c = conn.cursor()
        c.execute("""
            CREATE TABLE IF NOT EXISTS mesures (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                tension REAL NOT NULL,
                courant REAL NOT NULL,
                puissance REAL NOT NULL
            )
        """)
        conn.commit()

init_db()

# ----------------------
# Fonction pour enregistrer les données
# ----------------------
def enregistrer_donnees(tension: float, courant: float, puissance: float):
    with sqlite3.connect(DB_FILE) as conn:
        c = conn.cursor()
        c.execute(
            "INSERT INTO mesures (timestamp, tension, courant, puissance) VALUES (?, ?, ?, ?)",
            (datetime.now().isoformat(), tension, courant, puissance)
        )
        conn.commit()

# ----------------------
# Endpoints
# ----------------------
@app.get("/")
def root():
    return {"status": "FastAPI solaire OK"}

@app.get("/donnees-solaire")
def get_donnees():
    """
    Simule la récupération de données du panneau solaire,
    enregistre les mesures dans la DB et retourne les valeurs.
    """
    try:
        tension, courant, puissance = 230, 5, 1150  # Valeurs simulées
        enregistrer_donnees(tension, courant, puissance)
        return {"tension": tension, "courant": courant, "puissance": puissance}
    except Exception as e:
        return {"tension": 0, "courant": 0, "puissance": 0, "erreur": str(e)}

@app.get("/historique")
def get_historique(limit: int = 100):
    """
    Retourne les dernières mesures enregistrées dans la DB
    """
    with sqlite3.connect(DB_FILE) as conn:
        c = conn.cursor()
        c.execute("SELECT * FROM mesures ORDER BY id DESC LIMIT ?", (limit,))
        rows = c.fetchall()
    return [
        {"id": r[0], "timestamp": r[1], "tension": r[2], "courant": r[3], "puissance": r[4]}
        for r in rows
    ]