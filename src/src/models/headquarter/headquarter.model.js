// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const HeadquarterSchema = dbConnectionOptions.define(
    "headquarter",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: "name",
      }
    },
    {
      tableName: "headquarter"
    }
  );
  
  module.exports = HeadquarterSchema;
  