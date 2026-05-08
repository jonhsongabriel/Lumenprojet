const Sequelize = require("sequelize");
const sequelize = require("../db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// modèles
db.Projet = require("./Projet")(sequelize, Sequelize.DataTypes);
db.Administrateur = require("./Administrateur")(sequelize, Sequelize.DataTypes);
db.Client = require("./Client")(sequelize, Sequelize.DataTypes);
db.Demande = require("./Demande")(sequelize, Sequelize.DataTypes);
db.User = require("./User")(sequelize, Sequelize.DataTypes);

module.exports = db;