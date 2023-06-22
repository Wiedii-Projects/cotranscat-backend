// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const ServiceTypeSchema = dbConnectionOptions.define(
  "serviceType",
  {
    type: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      unique: true,
      field: "type",
    },
    code: {
      type: DataTypes.STRING(25),
      field: "code",
      allowNull: false
    }
  },
  {
    tableName: "serviceType"
  }
);

module.exports = ServiceTypeSchema;
