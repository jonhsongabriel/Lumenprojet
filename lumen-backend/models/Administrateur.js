module.exports = (sequelize, DataTypes) => {
  const Administrateur = sequelize.define("Administrateur", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: DataTypes.STRING,
  }, {
    tableName: "administrateurs",
    timestamps: true,
  });

  return Administrateur;
};