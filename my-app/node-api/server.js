const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l’API Node.js !" });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur Node.js démarré sur le port ${PORT}`);
});
