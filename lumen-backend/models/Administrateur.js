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
    validate: {
      notEmpty: true, // ne permet pas un nom vide
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // vérifie que c’est bien un email
    },
  },
  role: {
    type: DataTypes.ENUM("admin", "superadmin"), // plus sécurisé que string libre
    allowNull: false,
    defaultValue: "admin",
  },
  motdepasse: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100], // longueur minimale sécurisée pour mot de passe
    },
  },
}, {
  tableName: "administrateurs", // nom explicite de la table
  timestamps: true, // créé createdAt et updatedAt
});

module.exports = Administrateur;