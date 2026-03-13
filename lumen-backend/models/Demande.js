const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Demande = sequelize.define("Demande", {
  nomdemader: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emaildemander: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  messagedemander: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tempdemader: {
    type: DataTypes.DATE,          // <- Sequelize gère TIMESTAMP
    allowNull: false,
    defaultValue: DataTypes.NOW,   // date automatique
  },
});

module.exports = Demande;