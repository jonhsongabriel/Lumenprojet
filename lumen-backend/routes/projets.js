// backend/routes/projets.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../models");
const Projet = db.Projet;
const auth = require("../middleware/auth");

// Configuration multer pour upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// GET tous les projets (accessible admin/technicien/ingénieur)
router.get("/", auth(["admin", "technicien", "ingénieur"]), async (req, res) => {
  try {
    const projets = await Projet.findAll();
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET projets pour client (seulement les si client)
router.get("/client", auth(["client"]), async (req, res) => {
  try {
    const projets = await Projet.findAll({ where: { client: req.user.username } });
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST ajouter projet
router.post("/", auth(["admin", "technicien", "ingénieur"]), upload.single("image"), async (req, res) => {
  try {
    const { nom, description, client, modeConnexion, ip, qrCode, latitude, longitude } = req.body;

    const projet = await Projet.create({
      nom,
      description,
      client,
      modeConnexion,
      ip: modeConnexion === "IP" ? ip : null,
      qrCode: modeConnexion === "QR" ? qrCode : null,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      image: req.file ? "/images/" + req.file.filename : null,
      createdBy: req.user.username,
    });

    res.status(201).json(projet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur ajout projet" });
  }
});

module.exports = router;