module.exports = (sequelize, DataTypes) => {
  const Projets = sequelize.define("Projets", {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: DataTypes.TEXT,
    client: DataTypes.STRING,
    image: DataTypes.STRING,

    // 🔥 NOUVELLE CONNEXION
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    devicePassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("CONNECTED", "FAILED"),
      defaultValue: "FAILED",
    },

    createdBy: DataTypes.INTEGER,

  }, {
    tableName: "projets",
    timestamps: true,
  });

  return Projets;
};