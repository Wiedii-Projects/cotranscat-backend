// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const SellerSchema = dbConnectionOptions.define(
    "seller",
    {
      nickName: {
        type: DataTypes.STRING(100),
        field: "nickName",
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        field: "email",
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(75),
        field: "password",
        allowNull: false
      }
    },
    {
      tableName: "seller",
      primaryKey: false
    }
  );

  SellerSchema.removeAttribute('id');

  module.exports = SellerSchema;