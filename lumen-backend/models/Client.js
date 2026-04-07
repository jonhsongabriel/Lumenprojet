const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomclient: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // interdit nom vide
      },
    },
    prenomclient: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // interdit prénom vide
      },
    },
    adresseclient: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    contactclient: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 15], // longueur plausible pour un numéro de contact
      },
    },
    emailclient: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // doit être un email valide
      },
    },
  },
  {
    tableName: "clients", // nom explicite de la table
    timestamps: true, // createdAt et updatedAt
  }
);

module.exports = Client;