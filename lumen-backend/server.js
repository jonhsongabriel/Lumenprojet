// server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./db");
const Administrateur = require("./models/Administrateur");
const Client = require("./models/Client");
const Demande = require("./models/Demande");
const User = require("./models/User"); // si tu veux garder User séparé

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "lumen_secret_2026";

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("public/images"));

// =========================
// TEST BACKEND
// =========================
app.get("/api/lumen/test", (req, res) => {
  res.json({ message: "Backend OK" });
});

// =========================
// REGISTER ADMIN / CLIENT
// =========================
app.post("/api/lumen/register", async (req, res) => {
  try {
    const { nom, email, motdepasse, role } = req.body;

    const exist = await Administrateur.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    const user = await Administrateur.create({
      nom,
      email,
      role: role || "client",
      motdepasse: hashedPassword,
    });

    res.status(201).json({ message: "Compte créé", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================
// LOGIN
// =========================
app.post("/api/lumen/login", async (req, res) => {
  try {
    const { email, motdepasse } = req.body;

    const user = await Administrateur.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const valid = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!valid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({
      token,
      role: user.role,
      nom: user.nom,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================
// MIDDLEWARE TOKEN
// =========================
const verifyToken = (req, res, next) => {
  const bearer = req.headers["authorization"];
  if (!bearer) return res.status(403).json({ message: "Token requis" });

  const token = bearer.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalide" });

    req.user = decoded;
    next();
  });
};

// =========================
// ROUTES PROTÉGÉES
// =========================
app.get("/api/lumen/demande", verifyToken, async (req, res) => {
  const demandes = await Demande.findAll();
  res.json(demandes);
});

app.post("/api/lumen/demande", verifyToken, async (req, res) => {
  const demande = await Demande.create(req.body);
  res.json(demande);
});

// =========================
// UPLOAD IMAGE
// =========================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post(
  "/api/lumen/upload",
  verifyToken,
  upload.single("image"),
  (req, res) => {
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  }
);

// =========================
// START SERVER
// =========================
sequelize
  .sync()
  .then(() => {
    console.log("DB synchronisée !");
    app.listen(PORT, () => {
      console.log("Serveur démarré sur le port " + PORT);
    });
  })
  .catch((err) => {
    console.error("Erreur DB:", err);
  });