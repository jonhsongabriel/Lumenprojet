const { Sequelize } = require("sequelize");
require("dotenv").config();

// =======================
// CONFIG SIMPLE ET STABLE
// =======================
const DB_NAME = process.env.POSTGRES_DB || "lumendb";
const DB_USER = process.env.POSTGRES_USER || "lumen";
const DB_PASS = process.env.POSTGRES_PASSWORD || "";

// =======================
// HOST FIX DOCKER / VPS
// =======================
let DB_HOST = process.env.POSTGRES_HOST || "lumen-postgres";

// fallback intelligent si URL fournie
if (process.env.POSTGRES_URL) {
  try {
    const url = new URL(process.env.POSTGRES_URL);

    // IMPORTANT: en Docker, hostname = service name
    DB_HOST = url.hostname;
  } catch (err) {
    console.warn("⚠️ POSTGRES_URL invalide, fallback default host");
  }
}

// =======================
// SEQUELIZE INIT
// =======================
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: 5432,
  dialect: "postgres",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// =======================
// TEST CONNECTION SAFE
// =======================
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connectée avec succès (" + DB_HOST + ")");
  } catch (err) {
    console.error("❌ Erreur DB :", err.message);
    console.error("👉 Host utilisé:", DB_HOST);
  }
})();

module.exports = sequelize;