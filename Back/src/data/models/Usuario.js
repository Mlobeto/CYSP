const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Usuario",
    {
      IdUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false, // Email should be required
        validate: {
          isEmail: true,
        },
      },
      password: {
        // Added password field
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobilePhone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\d{10}$/,
        },
      },
      ciudad_id: {
        // Foreign key for city
        type: DataTypes.INTEGER,
        allowNull: true, // Allow null for now, adjust as needed
      },
      profilePicture: {
        // Nueva columna para la URL de la foto de perfil
        type: DataTypes.STRING,
        allowNull: true, // Permite valores nulos (el usuario podría no tener foto)
      },
      passwordResetRequired: {
  type: DataTypes.BOOLEAN,
  defaultValue: true,
  allowNull: false,
},
      role: {
        type: DataTypes.ENUM("usuario", "administrador"), // Define los roles posibles
        defaultValue: "usuario", // Rol por defecto para usuarios nuevos
        allowNull: false,
      },
    },
    {
      paranoid: true,
      tableName: "Usuario",
    }
  );
};
