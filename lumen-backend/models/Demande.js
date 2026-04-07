const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Demande = sequelize.define(
  "Demande",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomdemader: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // nom obligatoire
      },
    },
    emaildemander: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true, // doit être un email valide
      },
    },
    messagedemander: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true, // message obligatoire
      },
    },
    tempdemader: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // timestamp automatique
    },
  },
  {
    tableName: "demandes",
    timestamps: true, // createdAt et updatedAt gérés par Sequelize
  }
);

module.exports = Demande;