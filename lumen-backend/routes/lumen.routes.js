const express = require("express");
const router = express.Router();

const db = require("../models");
const Projet = db.Projet;

const { connectDevice } = require("../controllers/lumen.controller");

// CONNECT DEVICE
router.post("/connect-device", connectDevice);

// CREATE PROJET
router.post("/projets", async (req, res) => {
  try {
    const projet = await Projet.create({
      nom: req.body.nom,
      description: req.body.description,
      client: req.body.client,
      serialNumber: req.body.serialNumber,
      devicePassword: req.body.devicePassword,
      createdBy: req.body.createdBy || null
    });

    res.json(projet);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur création projet" });
  }
});

// GET PROJETS
router.get("/projets", async (req, res) => {
  try {
    const projets = await Projet.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json(projets);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur récupération projets" });
  }
});

module.exports = router;