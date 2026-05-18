const Sequelize = require("sequelize");
const sequelize = require("../db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ❌ NE PAS APPELER COMME UNE FONCTION
db.Client = require("./Client");
db.Projet = require("./Projets");
db.Administrateur = require("./Administrateur");
db.Demande = require("./Demande");
db.User = require("./User");

module.exports = db;