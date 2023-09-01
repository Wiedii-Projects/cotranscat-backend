// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const TemplateVehicleSchema = dbConnectionOptions.define(
  "templateVehicle",
  {
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      required: [true, "The name templateVehicle is required"],
    },
  },
  {
    tableName: "templateVehicle",
  }
);

module.exports = TemplateVehicleSchema;
