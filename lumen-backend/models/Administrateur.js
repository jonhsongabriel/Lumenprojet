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
      notEmpty: true,
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  role: {
    type: DataTypes.ENUM("admin", "ingenieur", "technicien", "client"),
    allowNull: false,
    defaultValue: "client",
  },

  motdepasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  tableName: "administrateurs",
  timestamps: true,
});

module.exports = Administrateur;