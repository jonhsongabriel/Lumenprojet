// src/config/API.js
const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/lumen"      // Docker + Nginx proxy
    : "http://localhost:9000"; // Local dev

export default API_URL;