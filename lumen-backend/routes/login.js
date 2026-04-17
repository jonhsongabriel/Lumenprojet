const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Administrateur = require("../models/Administrateur");

const SECRET_KEY = process.env.SECRET_KEY || "lumen_secret_2026";

// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, motdepasse } = req.body || {};

    console.log("LOGIN BODY:", req.body);

    // 🔥 validation
    if (!email || !motdepasse) {
      return res.status(400).json({
        message: "Email et mot de passe requis",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await Administrateur.findOne({
      where: { email: cleanEmail },
    });

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    const valid = await bcrypt.compare(motdepasse, user.motdepasse);

    if (!valid) {
      return res.status(401).json({
        message: "Mot de passe incorrect",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      role: user.role,
      nom: user.nom,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
});

module.exports = router;