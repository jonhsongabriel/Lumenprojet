const express = require("express");
const router = express.Router();

const { connectDevice } = require("../controllers/lumen.controller");

// CONNECT DEVICE
router.post("/connect-device", connectDevice);

// PROJETS (IMPORTANT)
router.get("/projets", (req, res) => {
  res.json([]);
});

module.exports = router;