require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 9000;

// =======================
// MIDDLEWARES
// =======================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// =======================
// MULTER (UPLOAD IMAGE)
// =======================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// =======================
// DB INIT
// =======================
const initDB = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: false });
    console.log("✅ DB READY");
  } catch (err) {
    console.error("❌ DB ERROR:", err.message);
  }
};

initDB();

// =======================
// PROJETS
// =======================

// GET ALL
app.get("/api/lumen/projets", async (req, res) => {
  try {
    const projets = await db.Projet.findAll();
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: "Erreur projets" });
  }
});

// CREATE PROJET + IMAGE
app.post("/api/lumen/projets", upload.single("image"), async (req, res) => {
  try {
    const {
      nom,
      ipAddress,
      port,
      protocol,
      serialNumber,
      devicePassword,
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const projet = await db.Projet.create({
      nom,
      ipAddress,
      port,
      protocol,
      serialNumber,
      devicePassword,
      image,
      status: "active",
    });

    res.json(projet);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
// SIMULATION CENTRALE LIVE (IP FUTURE)
// =======================
app.get("/api/lumen/device/live/:ip", (req, res) => {
  const { ip } = req.params;

  res.json({
    ip,
    voltage: 220 + Math.random() * 10,
    current: 4 + Math.random() * 2,
    power: 900 + Math.random() * 500,
    status: "online",
    time: new Date(),
  });
});

// =======================
// RAPPORT
// =======================
app.get("/api/lumen/rapports/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "Centrale " + req.params.id,
    production: [120, 140, 160, 150, 180],
    consumption: [100, 110, 130, 120, 140],
    battery: [80, 85, 90, 88, 95],
  });
});

// =======================
app.get("/", (req, res) => {
  res.json({ status: "Lumen API OK" });
});

// =======================
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on", PORT);
});



const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/api/lumen/projets", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({ ok: true });
});