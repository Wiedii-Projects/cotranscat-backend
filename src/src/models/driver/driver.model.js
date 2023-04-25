// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const DriverSchema = dbConnectionOptions.define(
    "driver",
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
      tableName: "driver",
    }
  );
  
  DriverSchema.removeAttribute('id');

  module.exports = DriverSchema;