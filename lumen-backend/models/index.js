const Sequelize = require("sequelize");
const sequelize = require("../db");

const db = {};
//
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// modèles
db.Projet = require("./Projet")(sequelize, Sequelize.DataTypes);
module.exports = db;