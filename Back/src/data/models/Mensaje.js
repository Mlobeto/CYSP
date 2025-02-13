const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Mensaje",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sala_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fecha_hora: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Mensaje",
      timestamps: false,
    }
  );
};