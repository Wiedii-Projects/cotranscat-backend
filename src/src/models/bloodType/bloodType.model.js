// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const BloodTypeSchema = dbConnectionOptions.define(
  "bloodTypeSchema",
  {
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      required: [true, "The name bloodType is required"],
    },
  },
  {
    tableName: "bloodType",
  }
);

module.exports = BloodTypeSchema;
