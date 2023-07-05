// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const HeadquarterSchema = dbConnectionOptions.define(
    "headquarter",
    {
      description: {
        type: DataTypes.STRING(50),
        field: "description",
      }
    },
    {
      tableName: "headquarter"
    }
  );
  
  module.exports = HeadquarterSchema;
  