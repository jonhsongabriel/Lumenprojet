require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./models");

const lumenRoutes = require("./routes/lumen.routes");
const solarmanMock = require("./routes/solarman.mock");

const app = express();

// =======================
// CONFIG
// =======================
const PORT = process.env.PORT || 9000;

// =======================
// MIDDLEWARES
// =======================
app.use(cors());
app.use(express.json());

// LOG REQUEST (debug utile)
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// =======================
// DATABASE INIT
// =======================
const initDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ DB connectée avec succès");

    // SAFE MODE (évite destruction tables)
    await db.sequelize.sync({ alter: false });

    console.log("✅ Tables OK");
  } catch (err) {
    console.error("❌ Erreur DB init :", err.message);
  }
};

initDB();

// =======================
// ROUTES PRINCIPALES
// =======================
app.use("/api/lumen", lumenRoutes);

// IMPORTANT : simulation SOLARMAN sous lumen
app.use("/api/lumen/solarman", solarmanMock);

// =======================
// SIMULATION SYSTÈME SOLAIRE
// =======================

// données temps réel
app.get("/api/lumen/donnees-solaire", (req, res) => {
  res.json({
    tension: Math.round(220 + Math.random() * 20),
    courant: Math.round((4 + Math.random() * 3) * 10) / 10,
    puissance: Math.round(1000 + Math.random() * 500),
    timestamp: new Date(),
  });
});

// historique
app.get("/api/lumen/historique", (req, res) => {
  const data = [];

  for (let i = 0; i < 20; i++) {
    data.push({
      id: i,
      timestamp: new Date(Date.now() - i * 60000),
      tension: Math.round(220 + Math.random() * 20),
      courant: Math.round((4 + Math.random() * 2) * 10) / 10,
      puissance: Math.round(900 + Math.random() * 600),
    });
  }

  res.json(data);
});

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




app.get("/api/lumen/rapports/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    id,
    name: "Site " + id,

    labels: ["J1", "J2", "J3", "J4", "J5"],

    production: [
      120, 140, 160, 150, 180
    ],

    consumption: [
      100, 110, 130, 120, 140
    ],

    battery: [
      80, 85, 90, 88, 95
    ],
  });
});