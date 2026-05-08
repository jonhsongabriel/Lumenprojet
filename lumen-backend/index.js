require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ IMPORT DB
const db = require("./models");

// ✅ SYNCHRONISATION TABLES
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Tables synchronisées");
  })
  .catch((err) => {
    console.error("❌ Erreur sync :", err);
  });
//changement actuel 
// routes
const lumenRoutes = require("./routes/lumen.routes");

app.use("/api/lumen", lumenRoutes);

app.get("/", (req, res) => {
  res.json({ status: "API Lumen running" });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});