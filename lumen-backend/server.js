// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const sequelize = require("./db");
const Administrateur = require("./models/Administrateur");
const Client = require("./models/Client");
const Demande = require("./models/Demande");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Servir le frontend React ---
app.use(express.static(path.join(__dirname, "../gestionenergie/build")));
app.use("/images", express.static(path.join(__dirname, "../gestionenergie/public/images")));

// --- Config Multer pour upload image ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../gestionenergie/public/images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// --- Routes Administrateurs ---
app.get("/api/administrateurs", async (req, res) => {
  try {
    const admins = await Administrateur.findAll();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/administrateurs", async (req, res) => {
  const { nom, email, role, motdepasse } = req.body;
  if (!nom || !email || !role || !motdepasse) return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  try {
    const newAdmin = await Administrateur.create({ nom, email, role, motdepasse });
    res.status(201).json(newAdmin);
  } catch (err) {
    console.error("Erreur ajout admin :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
app.put("/api/administrateurs/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, email, role } = req.body;
  if (!nom || !email || !role) return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  try {
    const admin = await Administrateur.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Administrateur non trouvé." });
    await admin.update({ nom, email, role });
    res.json(admin);
  } catch (err) {
    console.error("Erreur modification admin :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
app.delete("/api/administrateurs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Administrateur.findByPk(id);
    if (!admin) return res.status(404).json({ message: "Administrateur non trouvé." });
    await admin.destroy();
    res.json({ message: "Administrateur supprimé." });
  } catch (err) {
    console.error("Erreur suppression admin :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// --- Routes Clients ---
app.get("/api/client", async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/client", async (req, res) => {
  const { nomclient, prenomclient, adresseclient, contactclient, emailclient } = req.body;
  if (!nomclient || !prenomclient || !adresseclient || !contactclient || !emailclient) return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  try {
    const newClient = await Client.create({ nomclient, prenomclient, adresseclient, contactclient, emailclient });
    res.status(201).json(newClient);
  } catch (err) {
    console.error("Erreur ajout client :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
app.put("/api/client/:id", async (req, res) => {
  const { id } = req.params;
  const { nomclient, prenomclient, adresseclient, contactclient, emailclient } = req.body;
  if (!nomclient || !prenomclient || !adresseclient || !contactclient || !emailclient) return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  try {
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ message: "Client non trouvé." });
    await client.update({ nomclient, prenomclient, adresseclient, contactclient, emailclient });
    res.json(client);
  } catch (err) {
    console.error("Erreur modification client :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
app.delete("/api/client/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ message: "Client non trouvé." });
    await client.destroy();
    res.json({ message: "Client supprimé." });
  } catch (err) {
    console.error("Erreur suppression client :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// --- Routes DEMANDES (corrigé) ---
app.get("/api/demande", async (req, res) => {
  try {
    const demandes = await Demande.findAll({ order: [["tempdemader", "DESC"]] });
    res.json(demandes);
  } catch (err) {
    console.error("Erreur fetch demandes :", err);
    res.status(500).json({ message: "Erreur serveur", details: err.message });
  }
});

app.post("/api/demande", async (req, res) => {
  const { nomdemader, emaildemander, messagedemander, tempdemader } = req.body;

  if (!nomdemader || !emaildemander || !messagedemander || !tempdemader) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }

  try {
    const dateValid = new Date(tempdemader);
    if (isNaN(dateValid)) {
      return res.status(400).json({ message: "Format de date invalide." });
    }

    console.log("Création demande avec :", { nomdemader, emaildemander, messagedemander, tempdemader: dateValid });

    const newDemande = await Demande.create({
      nomdemader,
      emaildemander,
      messagedemander,
      tempdemader: dateValid,
    });

    res.status(201).json(newDemande);
  } catch (err) {
    console.error("Erreur ajout demande :", err);
    res.status(500).json({ message: "Erreur serveur", details: err.message });
  }
});


// --- Routes PROJETS (upload image) ---
if (!global.projets) global.projets = [];

app.post("/api/projets", upload.single("image"), async (req, res) => {
  try {
    const { nom, description, centrale, onduleur, batterie, datalog } = req.body;
    if (!nom || !description) return res.status(400).json({ message: "Nom et description obligatoires." });

    const projet = {
      nom,
      description,
      centrale,
      onduleur,
      batterie,
      datalog,
      image: req.file ? `/images/${req.file.filename}` : "",
    };

    global.projets.push(projet);
    res.status(201).json({ message: "Projet ajouté avec succès", projet });
  } catch (err) {
    console.error("Erreur ajout projet :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

app.get("/api/projets", (req, res) => {
  res.json(global.projets);
});

// --- Initialisation base + serveur ---
sequelize.sync().then(async () => {
  console.log("✅ Modèles synchronisés avec la base !");

  // Admin par défaut
  const adminExist = await Administrateur.findOne({ where: { email: "admin@lumen.com" } });
  if (!adminExist) await Administrateur.create({ nom: "Administrateur Principal", email: "admin@lumen.com", motdepasse: "123456", role: "SuperAdmin" });

  // Client par défaut
  const clientExist = await Client.findOne({ where: { emailclient: "admin@lumen.com" } });
  if (!clientExist) await Client.create({ nomclient: "Administrateur", prenomclient: "Principal", adresseclient: "Mahajanga", contactclient: "0340000000", emailclient: "admin@lumen.com" });

  // Demande par défaut
  const demandeExist = await Demande.findOne({ where: { emaildemander: "admin@lumen.com" } });
  if (!demandeExist) await Demande.create({ nomdemader: "Administrateur", emaildemander: "admin@lumen.com", messagedemander: "Bonjour", tempdemader: new Date() });

  app.listen(PORT, () => console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`));
}).catch(err => console.error(err));

// --- Routes React (SPA) ---
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../gestionenergie/build", "index.html"));
});
