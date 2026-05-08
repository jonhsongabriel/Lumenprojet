const Sequelize = require("sequelize");
const sequelize = require("../db");

const db = {};
//
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//modele actule pour tset
// modèles
db.Projets = require("./Projets")(sequelize, Sequelize.DataTypes);
module.exports = db;