// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const CoordinatorSchema = dbConnectionOptions.define(
    "coordinator",
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
      tableName: "coordinator",
    }
  );

  CoordinatorSchema.removeAttribute('id');
  
  module.exports = CoordinatorSchema;