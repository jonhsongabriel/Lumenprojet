// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const sequelize = require("./db");

// Models
const Administrateur = require("./models/Administrateur");
const Client = require("./models/Client");
const Demande = require("./models/Demande");

const app = express();
const PORT = process.env.PORT || 5000;

// ========================
// Middleware
// ========================
app.use(cors({ origin: "*" }));
app.use(express.json());

// ========================
// Servir React build
// ========================
// Assure-toi que ton build React est bien dans ../gestionenergie/build
app.use(express.static(path.join(__dirname, "../gestionenergie/build")));
app.use("/images", express.static(path.join(__dirname, "../gestionenergie/public/images")));

// ========================
// Multer config (upload images)
// ========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../gestionenergie/public/images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ========================
// ROUTES DEMANDES
// ========================
app.get("/api/lumen/demande", async (req, res) => {
  try {
    const demandes = await Demande.findAll({ order: [["tempdemader", "DESC"]] });
    res.json(demandes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur demandes", error: err.message });
  }
});

app.post("/api/lumen/demande", async (req, res) => {
  try {
    const { nomdemader, emaildemander, messagedemander } = req.body;
    if (!nomdemader || !emaildemander || !messagedemander)
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });

    const newDemande = await Demande.create({
      nomdemader,
      emaildemander,
      messagedemander,
      tempdemader: new Date()
    });

    res.status(201).json(newDemande);
  } catch (err) {
    console.error("Erreur création demande :", err);
    res.status(500).json({ message: "Erreur serveur ajout demande", error: err.message });
  }
});

// ========================
// ROUTES PROJETS (exemple)
// ========================
if (!global.projets) global.projets = [];

app.post("/api/lumen/projets", upload.single("image"), async (req, res) => {
  const { nom, description, centrale, onduleur, batterie, datalog } = req.body;
  if (!nom || !description) return res.status(400).json({ message: "Nom et description obligatoires" });

  const projet = {
    nom,
    description,
    centrale,
    onduleur,
    batterie,
    datalog,
    image: req.file ? `/images/${req.file.filename}` : ""
  };

  global.projets.push(projet);
  res.status(201).json({ message: "Projet ajouté", projet });
});

app.get("/api/lumen/projets", (req, res) => res.json(global.projets));

// ========================
// INITIALISATION DB
// ========================
sequelize.sync({ alter: true }).then(async () => {
  console.log("✅ DB synchronisée !");

  // Création initiale Admin/Client/Demande si absent
  if (!(await Administrateur.findOne({ where: { email: "admin@lumen.com" } })))
    await Administrateur.create({ nom: "Administrateur Principal", email: "admin@lumen.com", motdepasse: "123456", role: "SuperAdmin" });

  if (!(await Client.findOne({ where: { emailclient: "admin@lumen.com" } })))
    await Client.create({ nomclient: "Administrateur", prenomclient: "Principal", adresseclient: "Mahajanga", contactclient: "0340000000", emailclient: "admin@lumen.com" });

  if (!(await Demande.findOne({ where: { emaildemander: "admin@lumen.com" } })))
    await Demande.create({ nomdemader: "Administrateur", emaildemander: "admin@lumen.com", messagedemander: "Bonjour", tempdemader: new Date() });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Serveur backend démarré sur le port ${PORT}`);
  });
}).catch(err => console.error("Erreur DB :", err));

// ========================
// ROUTE REACT (toujours dernière)
// ========================
// Pour que React serve toutes les routes côté client
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../gestionenergie/build/index.html"));
});