const express = require("express");
const router = express.Router();
const db = require("../models");

// GET ALL PROJETS
router.get("/", async (req, res) => {
  try {
    const projets = await db.Projet.findAll();
    res.json(projets);
  } catch (err) {
    console.error("PROJETS ERROR:", err);
    res.status(500).json({
      message: "Erreur récupération projets",
      error: err.message
    });
  }
});

// CREATE PROJET
router.post("/", async (req, res) => {
  try {
    const projet = await db.Projet.create(req.body);
    res.status(201).json(projet);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur création projet",
      error: err.message
    });
  }
});

module.exports = router;