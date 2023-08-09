// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const CountrySchema = dbConnectionOptions.define(
  "country",
  {
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      required: [true, "The name country is required"],
    },
  },
  {
    tableName: "country",
  }
);

module.exports = CountrySchema;
