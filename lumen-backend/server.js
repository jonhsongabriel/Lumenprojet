const express = require("express");
const path = require("path");
const cors = require("cors");
const sequelize = require("./db");
const Administrateur = require("./models/Administrateur");
const Client = require("./models/Client");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Servir le frontend React ---
app.use(express.static(path.join(__dirname, "../gestionenergie/build")));

// --- Récupérer la liste des administrateurs ---
app.get("/api/administrateurs", async (req, res) => {
  try {
    const admins = await Administrateur.findAll();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Récupérer la liste des clients ---
app.get("/api/client", async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Ajouter un administrateur ---
app.post("/api/administrateurs", async (req, res) => {
  const { nom, email, role, motdepasse } = req.body;

  if (!nom || !email || !role || !motdepasse) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }

  try {
    const newAdmin = await Administrateur.create({ nom, email, role, motdepasse });
    res.json(newAdmin);
  } catch (err) {
    console.error("Erreur lors de l’ajout :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// --- Ajouter un client ---
app.post("/api/client", async (req, res) => {
  const { nomclient, prenomclient, adresseclient, contactclient, emailclient } = req.body;

  if (!nomclient || !prenomclient || !adresseclient || !contactclient || !emailclient) {
    return res.status(400).json({ message: "Remplissez correctement tous les champs." });
  }

  try {
    const newclient  = await Client.create({
        nomclient,
        prenomclient,
        adresseclient,
        contactclient, // corrigé
        emailclient
      });

    res.json(newclient );
  } catch (err) {
    console.error("Erreur lors de l’ajout du client :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// --- Modifier un administrateur ---
app.put("/api/administrateurs/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, email, role } = req.body;

  if (!nom || !email || !role) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }

  try {
    const admin = await Administrateur.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Administrateur non trouvé." });
    }

    await admin.update({ nom, email, role });
    res.json(admin);
  } catch (err) {
    console.error("Erreur lors de la modification :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// --- Modifier un client ---
app.put("/api/client/:id", async (req, res) => {
  const { id } = req.params;
  const { nomclient, prenomclient, adresseclient, contactclient, emailclient } = req.body;

  if (!nomclient || !prenomclient || !adresseclient || !contactclient || !emailclient) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }

  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    await client.update({ nomclient, prenomclient, adresseclient, contactclient, emailclient });
    res.json(client);
  } catch (err) {
    console.error("Erreur lors de la modification :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// --- Supprimer un administrateur ---
app.delete("/api/administrateurs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Administrateur.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Administrateur non trouvé." });
    }

    await admin.destroy();
    res.json({ message: "Administrateur supprimé." });
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// --- Supprimer un client ---
app.delete("/api/client/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    await client.destroy();
    res.json({ message: "Client supprimé." });
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// --- Routes React (SPA) ---
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../gestionenergie/build", "index.html"));
});

sequelize.sync().then(async () => {
  console.log("Modèles synchronisés avec la base !");

  // Admin principal
  const adminExist = await Administrateur.findOne({ where: { email: "admin@lumen.com" } });
  if (!adminExist) {
    await Administrateur.create({
      nom: "Administrateur Principal",
      email: "admin@lumen.com",
      motdepasse: "123456",
      role: "SuperAdmin"
    });
    console.log("Administrateur principal créé !");
  }

  // Client principal
  const clientExist = await Client.findOne({ where: { emailclient: "admin@lumen.com" } });
  if (!clientExist) {
    await Client.create({
      nomclient: "Administrateur",
      prenomclient: "Principal",
      adresseclient: "Mahajanga",
      contactclient: "0340000000",
      emailclient: "admin@lumen.com"
    });
    console.log("Client principal créé !");
  }

  app.listen(PORT, () => console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`));
}).catch(err => console.error(err));
