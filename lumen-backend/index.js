require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// DATABASE
// =======================
const db = require("./models");

// 🔥 IMPORTANT: sync AVANT routes (plus stable)
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

// lancer DB
initDB();

// =======================
// ROUTES
// =======================
const lumenRoutes = require("./routes/lumen.routes");
app.use("/api/lumen", lumenRoutes);

// health check
app.get("/", (req, res) => {
  res.json({ status: "API Lumen running" });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 9000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


// =======================
// ROUTES
// =======================
const lumenRoutes = require("./routes/lumen.routes");
app.use("/api/lumen", lumenRoutes);

const solarmanMock = require("./routes/solarman.mock");
app.use("/api/solarman", solarmanMock);

// health check
app.get("/", (req, res) => {
  res.json({ status: "API Lumen running" });
});