module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Projet", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    client: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    devicePassword: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    tableName: "projets",
    timestamps: true,
  });
};