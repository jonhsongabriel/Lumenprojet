const Sequelize = require("sequelize");
const sequelize = require("../db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// IMPORTANT
db.Projet = require("./Projets")(sequelize, Sequelize.DataTypes);

module.exports = db;