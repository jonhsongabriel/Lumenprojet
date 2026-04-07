// lumen-backend/routes/auth.js (exemple)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Administrateur = require('../models/Administrateur');

// POST /api/lumen/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Administrateur.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

    // Générer un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

app.get("/api/lumen/test", (req, res) => {
  res.json({ message: "Backend OK" });
});
