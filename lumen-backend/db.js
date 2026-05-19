const { Sequelize } = require("sequelize");
require("dotenv").config();

const DB_NAME = process.env.POSTGRES_DB || "lumendb";
const DB_USER = process.env.POSTGRES_USER || "postgres";
const DB_PASS = process.env.POSTGRES_PASSWORD || "";

let DB_HOST = "127.0.0.1";

// =======================
// SAFE URL PARSING
// =======================
if (process.env.POSTGRES_URL) {
  try {
    const url = new URL(process.env.POSTGRES_URL);

    // IMPORTANT: force VPS-safe host
    DB_HOST = url.hostname === "db" ? "127.0.0.1" : url.hostname;

  } catch (err) {
    console.warn("⚠️ POSTGRES_URL invalide, fallback localhost");
    DB_HOST = "127.0.0.1";
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
// TEST CONNECTION (SAFE)
// =======================
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connectée avec succès");
  } catch (err) {
    console.error("❌ Erreur DB :", err.message);

    console.log("⚠️ Backend continue sans DB stable...");
    console.log("👉 Vérifie PostgreSQL + credentials");
  }
})();

module.exports = sequelize;