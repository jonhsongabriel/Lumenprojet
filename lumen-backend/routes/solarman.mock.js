const express = require("express");
const router = express.Router();

/**
 * SIMULATION : données d'onduleur SOLARMAN
 */
router.get("/inverter/data", (req, res) => {
  res.json({
    success: true,
    data: {
      deviceId: "SIM-INV-001",
      power: 1250,          // W
      energyToday: 8.6,     // kWh
      totalEnergy: 1523.4,  // kWh
      voltage: 230,
      current: 5.4,
      status: "online",
      timestamp: new Date()
    }
  });
});

/**
 * SIMULATION : liste des devices
 */
router.get("/devices", (req, res) => {
  res.json({
    success: true,
    devices: [
      {
        id: "SIM-INV-001",
        name: "Onduleur Maison",
        status: "online"
      },
      {
        id: "SIM-INV-002",
        name: "Onduleur Jardin",
        status: "offline"
      }
    ]
  });
});

module.exports = router;