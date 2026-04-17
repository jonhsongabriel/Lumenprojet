const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const db = require("../models");
const Projet = db.Projet;
const auth = require("../middleware/auth");

// dossier upload
const uploadDir = "public/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// =========================
// GET ALL PROJETS
// =========================
router.get(
  "/",
  auth(["admin", "technicien", "ingenieur"]),
  async (req, res) => {
    try {
      const projets = await Projet.findAll();
      res.json(projets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// =========================
// CLIENT PROJETS
// =========================
router.get("/client", auth(["client"]), async (req, res) => {
  try {
    const projets = await Projet.findAll({
      where: { createdBy: req.user.id },
    });

    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================
// CREATE PROJET
// =========================
router.post(
  "/",
  auth(["admin", "technicien", "ingenieur"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        nom,
        description,
        client,
        modeConnexion,
        ip,
        qrCode,
        latitude,
        longitude,
      } = req.body;

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
        createdBy: req.user.id,
      });

      res.status(201).json(projet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur ajout projet" });
    }
  }
);

module.exports = router;