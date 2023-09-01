// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const StateVehicleSchema = dbConnectionOptions.define(
  "stateVehicle",
  {
    type: {
      type: DataTypes.STRING(50),
      field: "type",
      required: [true, "The type stateVehicle is required"],
    },
  },
  {
    tableName: "stateVehicle",
  }
);

module.exports = StateVehicleSchema;
