// DB Connections
const { dbConnectionOptions } = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const RoleSchema = dbConnectionOptions.define(
  "Role",
  {
    type: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      unique: true,
      field: "type",
    },
  },
  {
    tableName: "role"
  }
);

module.exports = RoleSchema;
