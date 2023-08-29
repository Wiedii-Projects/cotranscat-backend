// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const TypeVehicleSchema = dbConnectionOptions.define(
  "typeVehicle",
  {
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      required: [true, "The name typeVehicle is required"],
    },
  },
  {
    tableName: "typeVehicle",
  }
);

module.exports = TypeVehicleSchema;
