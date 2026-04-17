module.exports = (sequelize, DataTypes) => {
  const Projet = sequelize.define("Projet", {
    
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

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    client: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    modeConnexion: {
      type: DataTypes.ENUM("IP", "QR", "AUTRE"),
      allowNull: false,
    },

    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    qrCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    createdBy: {
      type: DataTypes.INTEGER, // mieux que STRING
      allowNull: true,
    },

  }, {
    tableName: "projets",
    timestamps: true,
  });

  return Projet;
};