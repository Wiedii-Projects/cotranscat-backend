// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const LicenseCategorySchema = dbConnectionOptions.define(
  "licenseCategory",
  {
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      required: [true, "The name licenseCategory is required"],
    },
  },
  {
    tableName: "licenseCategory",
  }
);

module.exports = LicenseCategorySchema;
