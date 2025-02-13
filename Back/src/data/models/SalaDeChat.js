const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "SalaDeChat",
    {
      sala_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ciudad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rango_km: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "SalaDeChat",
      timestamps: false,
    }
  );
};