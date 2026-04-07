// backend/models/Projet.js

module.exports = (sequelize, DataTypes) => {
  const Projet = sequelize.define("Projet", {
    nom: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    client: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true }, // chemin fichier
    modeConnexion: { type: DataTypes.STRING, allowNull: false }, // IP, QR, Autre
    ip: { type: DataTypes.STRING, allowNull: true },
    qrCode: { type: DataTypes.STRING, allowNull: true },
    latitude: { type: DataTypes.FLOAT, allowNull: true },
    longitude: { type: DataTypes.FLOAT, allowNull: true },
    createdBy: { type: DataTypes.STRING, allowNull: true },
  });
  return Projet;
};