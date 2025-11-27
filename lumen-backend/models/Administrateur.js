const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Administrateur = sequelize.define("Administrateur", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  motdepasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Administrateur;
