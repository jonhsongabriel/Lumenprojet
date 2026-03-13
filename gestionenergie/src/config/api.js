// src/config/api.js
// Détecte l'environnement pour utiliser l'URL correcte

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/lumen" // local
    : "/api/lumen";                     // prod (NGINX fait le proxy)

export default API_URL;