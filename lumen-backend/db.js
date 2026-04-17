const { Sequelize } = require("sequelize");
require("dotenv").config();

const DB_NAME = process.env.POSTGRES_DB || "lumendb";
const DB_USER = process.env.POSTGRES_USER || "lumenuser";
const DB_PASS = process.env.POSTGRES_PASSWORD || "lumenpass";

const DB_HOST = process.env.POSTGRES_URL
  ? new URL(process.env.POSTGRES_URL).hostname
  : "db";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// test connexion
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connectée avec succès");
  } catch (err) {
    console.error("❌ Erreur DB :", err);
  }
})();

module.exports = sequelize;