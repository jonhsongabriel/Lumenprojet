const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lumendb", "lumen", "Lum3n.pasS!", {
  localhost: "postgres",
  dialect: "postgres",
  logging: false, // désactive les logs SQL
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Connexion à PostgreSQL réussie"))
  .catch((err) => console.error("❌ Erreur de connexion :", err));

module.exports = sequelize;
