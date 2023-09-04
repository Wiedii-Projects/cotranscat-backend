// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const PhotoVehicleSchema = dbConnectionOptions.define(
  "photoVehicle",
  {
    photo: {
      type: DataTypes.STRING(50),
      field: "photo",
      required: [true, "The photo photoVehicle is required"],
    },
  },
  {
    tableName: "photoVehicle",
  }
);

module.exports = PhotoVehicleSchema;
