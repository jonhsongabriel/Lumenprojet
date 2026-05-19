require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./models");
const lumenRoutes = require("./routes/lumen.routes");
const solarmanMock = require("./routes/solarman.mock");

const app = express();

const PORT = process.env.PORT || 5000;

// =======================
// MIDDLEWARES
// =======================
app.use(cors());
app.use(express.json());

// =======================
// DATABASE INIT
// =======================
const initDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ DB connectée avec succès");

    await db.sequelize.sync({ alter: true });
    console.log("✅ Tables synchronisées");

  } catch (err) {
    console.error("❌ Erreur DB init :", err);
  }
};

initDB();

// =======================
// ROUTES
// =======================
app.use("/api/lumen", lumenRoutes);
app.use("/api/solarman", solarmanMock);

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.json({ status: "API Lumen running" });
});

// =======================
// START SERVER
// =======================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});