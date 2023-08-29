// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const TypeFuelSchema = dbConnectionOptions.define(
  "typeFuel",
  {
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      required: [true, "The name typeFuel is required"],
    },
  },
  {
    tableName: "typeFuel",
  }
);

module.exports = TypeFuelSchema;
