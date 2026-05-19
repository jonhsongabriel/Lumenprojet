const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./db");

// MODELS
const Administrateur = require("./models/Administrateur");
const Demande = require("./models/Demande");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "lumen_secret_2026";

// =========================
// MIDDLEWARES
// =========================
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// STATIC
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("public/images"));

// =========================
// VERIFY TOKEN
// =========================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requis" });
  }

  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

// =========================
// AUTH
// =========================
app.post("/api/lumen/register", async (req, res) => {
  try {
    const { nom, email, motdepasse, role } = req.body;

    const exist = await Administrateur.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: "Email déjà utilisé" });

    const hashed = await bcrypt.hash(motdepasse, 10);

    const user = await Administrateur.create({
      nom,
      email,
      role: role || "client",
      motdepasse: hashed,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/lumen/login", async (req, res) => {
  try {
    const { email, motdepasse } = req.body;

    const user = await Administrateur.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const valid = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role, nom: user.nom });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================
// DEMANDES
// =========================
app.get("/api/lumen/demande", verifyToken, async (req, res) => {
  const data = await Demande.findAll();
  res.json(data);
});

// =========================
// UPLOAD
// =========================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

app.post("/api/lumen/upload", verifyToken, upload.single("image"), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// =========================
// RAPPORTS
// =========================
app.get("/api/lumen/rapports/:id", (req, res) => {
  const data = {
    1: { name: "Mahajanga" },
    2: { name: "Antananarivo" },
  };

  res.json(data[req.params.id] || { message: "Aucun rapport trouvé" });
});

// =========================
// PROJETS
// =========================
app.get("/api/lumen/projets", async (req, res) => {
  try {
    const projets = await db.Projet.findAll();
    res.json(projets);
  } catch (err) {
    res.status(500).json({
      message: "Erreur récupération projets",
      error: err.message,
    });
  }
});

// =========================
// CONNECT DEVICE
// =========================
app.post("/api/lumen/connect-device", async (req, res) => {
  const { serialNumber } = req.body;

  if (!serialNumber) {
    return res.status(400).json({ message: "serialNumber requis" });
  }

  res.json({
    success: true,
    deviceId: serialNumber,
  });
});

// =========================
// ⚡ SOLARMAN MOCK API (AJOUTÉ)
// =========================

// 🔌 Inverter data
app.get("/api/solarman/inverter/data", (req, res) => {
  res.json({
    success: true,
    data: {
      deviceId: "SIM-INV-001",
      power: Math.floor(900 + Math.random() * 900),
      energyToday: Number((Math.random() * 10).toFixed(2)),
      totalEnergy: Number((1500 + Math.random() * 50).toFixed(2)),
      voltage: 230,
      current: 5.2,
      status: "online",
      timestamp: new Date()
    }
  });
});

// 🔌 Devices
app.get("/api/solarman/devices", (req, res) => {
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

// =========================
// START SERVER
// =========================
sequelize.sync().then(() => {
  console.log("DB OK");
  app.listen(PORT, () => {
    console.log("🚀 Server running on port", PORT);
  });
});