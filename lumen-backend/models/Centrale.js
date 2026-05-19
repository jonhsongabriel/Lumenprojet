module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Centrale", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    port: {
      type: DataTypes.INTEGER,
      defaultValue: 80,
    },

    type: {
      type: DataTypes.STRING, // ex: inverter, hybrid, etc
      defaultValue: "inverter",
    },

    status: {
      type: DataTypes.STRING, // ONLINE / OFFLINE
      defaultValue: "UNKNOWN",
    },

    lastSeen: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: "centrales",
    timestamps: true,
  });
};