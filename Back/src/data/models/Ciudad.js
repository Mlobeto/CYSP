const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Ciudad",
    {
      ciudad_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
     
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitud: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      longitud: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      geom: {
        type: DataTypes.GEOMETRY('POINT', 4326),
        allowNull: true,
      },
    
    },
    {
      tableName: "Ciudad",
      timestamps: false, // Assuming you don't want timestamps
    }
  );
};