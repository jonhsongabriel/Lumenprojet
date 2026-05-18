const Sequelize = require("sequelize");
const sequelize = require("../db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ BON NOM (IMPORTANT)
db.Projet = require("./Projets");
db.Administrateur = require("./Administrateur");
//db.Client = require("./Client");
db.Demande = require("./Demande");
db.User = require("./User");

module.exports = db;