// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const DepartmentSchema = dbConnectionOptions.define(
  "department",
  {
    name: {
      type: DataTypes.STRING,
      field: "name",
      required: [true, "The name department is required"],
    },
  },
  {
    tableName: "department",
  }
);

module.exports = DepartmentSchema;
