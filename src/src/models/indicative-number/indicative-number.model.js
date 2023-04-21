// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const IndicativeNumberTypeSchema = dbConnectionOptions.define(
  "indicativeNumber",
  {
    number: {
      type: DataTypes.STRING(10),
      field: "number",
      required: [true, "The number is required"],
    },
    country: {
      type: DataTypes.STRING(50),
      field: "country",
      required: [true, "The country is required"],
    }
  },
  {
    tableName: "indicativeNumber",
  }
);

module.exports = IndicativeNumberTypeSchema;
