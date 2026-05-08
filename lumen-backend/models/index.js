const Sequelize = require("sequelize");
const sequelize = require("../db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ CORRECTION ICI
db.Projet = require("./Projets")(sequelize, Sequelize);

// autres modèles
db.Administrateur = require("./Administrateur")(sequelize, Sequelize);
db.Client = require("./Client")(sequelize, Sequelize);
db.Demande = require("./Demande")(sequelize, Sequelize);
db.User = require("./User")(sequelize, Sequelize);

module.exports = db;