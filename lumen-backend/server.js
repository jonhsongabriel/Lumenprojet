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
const Demande = require("./models/Demande");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "lumen_secret_2026";

// =========================
// LOGS
// =========================
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// =========================
// BODY PARSER
// =========================
app.use(express.json());

// =========================
// CORS
// =========================
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// =========================
// CSP FIX
// =========================
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "connect-src 'self' http://localhost:3000 http://localhost:5000 http://lumen-backend:5000; " +
    "img-src 'self' data: blob:; " +
    "media-src 'self' data: blob:; " +
    "style-src 'self' 'unsafe-inline'; " +
    "script-src 'self' 'unsafe-inline';"
  );
  next();
});

// =========================
// STATIC
// =========================
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

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

// =========================
// REGISTER
// =========================
app.post("/api/lumen/register", async (req, res) => {
  try {
    const { nom, email, motdepasse, role } = req.body;

    const exist = await Administrateur.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const hashed = await bcrypt.hash(motdepasse, 10);

    const user = await Administrateur.create({
      nom,
      email,
      role: role || "client",
      motdepasse: hashed,
    });

    res.status(201).json({ message: "Compte créé", user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur register" });
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

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role, nom: user.nom });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur login" });
  }
});

// =========================
// DEMANDES
// =========================
app.get("/api/lumen/demande", verifyToken, async (req, res) => {
  const data = await Demande.findAll();
  res.json(data);
});

app.post("/api/lumen/demande", verifyToken, async (req, res) => {
  const data = await Demande.create(req.body);
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
// PROJETS
// =========================
app.get("/api/lumen/projets", (req, res) => {
  res.json([]);
});

// =========================
// RAPPORTS
// =========================
app.get("/api/lumen/rapports/:id", (req, res) => {
  const data = {
    1: { name: "Mahajanga", production: [300,320], consumption: [280,290], battery: [70,72] },
    2: { name: "Antananarivo", production: [400,420], consumption: [380,390], battery: [60,62] },
  };

  const result = data[req.params.id];

  if (!result) {
    return res.status(404).json({ message: "Aucun rapport trouvé" });
  }

  res.json(result);
});

// =========================
// CONNECT DEVICE (FIX FINAL)
// =========================
app.post("/api/lumen/connect-device", async (req, res) => {
  try {
    const { serialNumber, devicePassword } = req.body;

    console.log("🔌 DEVICE REQUEST:", serialNumber);

    if (!serialNumber) {
      return res.status(400).json({
        success: false,
        message: "serialNumber requis",
      });
    }

    // 👉 SIMULATION (pas de Solarman pour éviter crash)
    const response = {
      deviceId: serialNumber,
      status: "connected",
      timestamp: new Date()
    };

    return res.json({
      success: true,
      deviceId: serialNumber,
      data: response
    });

  } catch (error) {
    console.error("❌ connect-device error:", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur connect-device",
    });
  }
});

// =========================
// ERROR HANDLER
// =========================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erreur serveur" });
});

// =========================
// START SERVER
// =========================
sequelize.sync().then(() => {
  console.log("DB OK");
  app.listen(PORT, () => console.log("Server " + PORT));
});