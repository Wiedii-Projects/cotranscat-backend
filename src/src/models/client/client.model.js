// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const ClientSchema = dbConnectionOptions.define(
    "client",
    {
      numberPhoneWhatsapp: {
        type: DataTypes.STRING(12),
        field: "numberPhoneWhatsapp",
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        field: "email",
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(100),
        field: "address",
        allowNull: true
      }
    },
    {
      tableName: "client",
    }
  );
  
  module.exports = ClientSchema;