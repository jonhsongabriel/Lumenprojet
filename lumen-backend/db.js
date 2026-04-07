const { Sequelize } = require("sequelize");
require("dotenv").config();

// Récupération des variables d'environnement
const DB_NAME = process.env.POSTGRES_DB || "lumendb";
const DB_USER = process.env.POSTGRES_USER || "lumenuser";
const DB_PASS = process.env.POSTGRES_PASSWORD || "lumenpass";
const DB_HOST = process.env.POSTGRES_URL
  ? new URL(process.env.POSTGRES_URL).hostname
  : "db"; // "db" = nom du service Docker

// Configuration Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false, // désactive les logs SQL pour prod
  pool: {
    max: 10,   // connexions max
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test connexion
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à PostgreSQL réussie");
  } catch (err) {
    console.error("❌ Erreur de connexion :", err);
  }
})();

module.exports = sequelize;