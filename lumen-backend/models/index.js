const Sequelize = require("sequelize");
const sequelize = require("../db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// modèle Projet
db.Projet = require("./Projets")(sequelize, Sequelize);

module.exports = db;