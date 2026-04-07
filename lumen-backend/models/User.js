// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
});

module.exports = User;