// DB Connections
const { dbConnectionOptions } = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const ObservationSchema = dbConnectionOptions.define(
  "Observation",
  {
    description: {
      type: DataTypes.TEXT,
      field: "description",
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      field: "date",
      allowNull: false,
    },
  },
  {
    tableName: "observation"
  }
);

module.exports = ObservationSchema;
