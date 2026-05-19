require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./models");

const lumenRoutes = require("./routes/lumen.routes");
const solarmanMock = require("./routes/solarman.mock");

const app = express();
const PORT = process.env.PORT || 9000;

// =======================
// MIDDLEWARES
// =======================
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// =======================
// DATABASE INIT SAFE
// =======================
const initDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ DB connectée avec succès");

    await db.sequelize.sync({ alter: false });

    console.log("✅ Tables OK");

  } catch (err) {
    console.error("❌ Erreur DB init :", err.message);
  }
};

initDB();

// =======================
// ROUTES
// =======================
app.use("/api/lumen", lumenRoutes);
app.use("/api/lumen/solarman", solarmanMock);

// =======================
// SIMULATION SOLAIRE
// =======================
app.get("/api/lumen/donnees-solaire", (req, res) => {
  res.json({
    tension: Math.round(220 + Math.random() * 20),
    courant: Math.round((4 + Math.random() * 3) * 10) / 10,
    puissance: Math.round(1000 + Math.random() * 500),
    timestamp: new Date(),
  });
});

app.get("/api/lumen/historique", (req, res) => {

  const data = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    timestamp: new Date(Date.now() - i * 60000),
    tension: Math.round(220 + Math.random() * 20),
    courant: Math.round((4 + Math.random() * 2) * 10) / 10,
    puissance: Math.round(900 + Math.random() * 600),
  }));

  res.json(data);
});

// =======================
// RAPPORTS
// =======================
app.get("/api/lumen/rapports/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: "Site " + id,
    labels: ["J1", "J2", "J3", "J4", "J5"],
    production: [120, 140, 160, 150, 180],
    consumption: [100, 110, 130, 120, 140],
    battery: [80, 85, 90, 88, 95],
  });
});

// =======================
// TEST DEVICE (VERSION CORRIGÉE)
// =======================
app.post("/api/lumen/test-device", (req, res) => {

  const { ipAddress, port, protocol } = req.body;

  if (!ipAddress) {
    return res.status(400).json({
      success: false,
      error: "IP address requis"
    });
  }

  const url = `${protocol || "http"}://${ipAddress}:${port || 80}`;

  console.log("🔍 Test device:", url);

  // ==========================
  // 🔥 MODE SIMULATION INTELLIGENT
  // ==========================

  const isLocalIP =
    ipAddress.startsWith("192.") ||
    ipAddress.startsWith("10.") ||
    ipAddress.startsWith("172.") ||
    ipAddress === "localhost";

  if (isLocalIP) {
    return res.json({
      success: true,
      online: true,
      mode: "SIMULATION_LOCAL",
      device: {
        ip: ipAddress,
        status: "ONLINE (SIMULÉ)",
        power: Math.round(800 + Math.random() * 700),
      }
    });
  }

  // ==========================
  // CAS RÉEL (optionnel)
  // ==========================
  return res.json({
    success: true,
    online: false,
    mode: "UNREACHABLE_EXTERNAL",
    message: "Device non accessible depuis serveur"
  });
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