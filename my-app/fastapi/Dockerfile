# Utiliser l'image officielle Python
FROM python:3.11

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY . .

# Installer les dépendances
RUN pip install --no-cache-dir fastapi uvicorn

# Exposer le port utilisé par FastAPI
EXPOSE 8000

# Commande de démarrage
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
