const express = require("express");
const router = express.Router();

const { connectDevice } = require("../controllers/lumen.controller");

router.post("/connect-device", connectDevice);

module.exports = router;