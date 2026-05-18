const Sequelize = require("sequelize");
const sequelize = require("../db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Client = require("./Client")(sequelize, Sequelize.DataTypes);
db.Projet = require("./Projet")(sequelize, Sequelize.DataTypes);

module.exports = db;