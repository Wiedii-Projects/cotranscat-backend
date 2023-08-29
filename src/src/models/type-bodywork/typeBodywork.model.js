// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const TypeBodyworkSchema = dbConnectionOptions.define(
  "typeBodywork",
  {
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      required: [true, "The name typeBodywork is required"],
    },
  },
  {
    tableName: "typeBodywork",
  }
);

module.exports = TypeBodyworkSchema;
