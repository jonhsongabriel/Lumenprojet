const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Demande = sequelize.define("Demande", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nomdemader: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emaildemander: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  messagedemander:{
    type:DataTypes.TEXT,
    allowNull:false,
  },
  tempdemader: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Demande;
