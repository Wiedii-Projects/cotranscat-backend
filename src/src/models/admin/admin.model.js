// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const AdminSchema = dbConnectionOptions.define(
    "admin",
    {
      nickName: {
        type: DataTypes.STRING(100),
        field: "nickName",
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(100),
        field: "email",
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(75),
        field: "password",
        allowNull: false
      }
    },
    {
      tableName: "admin",
    }
  );

  AdminSchema.removeAttribute('id');
  
  module.exports = AdminSchema;