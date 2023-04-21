// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const MunicipalitySchema = dbConnectionOptions.define(
  "municipality",
  {
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      required: [true, "The name municipality is required"],
    },
  },
  {
    tableName: "municipality",
  }
);

module.exports = MunicipalitySchema;
