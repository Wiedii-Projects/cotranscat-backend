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
    height: {
      type: DataTypes.INTEGER,
      field: "height",
      defaultValue: 0
    },
    width: {
      type: DataTypes.INTEGER,
      field: "width",
      defaultValue: 0
    }
  },
  {
    tableName: "templateVehicle",
  }
);

module.exports = TemplateVehicleSchema;
