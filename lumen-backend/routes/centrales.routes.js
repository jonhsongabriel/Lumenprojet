const express = require("express");
const router = express.Router();

const db = require("../models");
const Centrale = db.Centrale;

// =======================
// CREATE CENTRALE
// =======================
router.post("/", async (req, res) => {
  try {
    const centrale = await Centrale.create(req.body);
    res.json(centrale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// GET ALL
// =======================
router.get("/", async (req, res) => {
  try {
    const data = await Centrale.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// TEST CENTRALE (SIMULATION + REAL)
// =======================
router.post("/test", async (req, res) => {
  const { ipAddress, port } = req.body;

  // simulation intelligente (car WiFi local)
  const isLocal =
    ipAddress.startsWith("192.") ||
    ipAddress.startsWith("10.") ||
    ipAddress === "localhost";

  if (isLocal) {
    return res.json({
      success: true,
      online: true,
      mode: "SIMULATION",
      ip: ipAddress,
      power: Math.round(800 + Math.random() * 700),
      voltage: Math.round(220 + Math.random() * 20),
    });
  }

  return res.json({
    success: true,
    online: false,
    mode: "UNREACHABLE",
    message: "Centrale non accessible depuis VPS",
  });
});

module.exports = router;