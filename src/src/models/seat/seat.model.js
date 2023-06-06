// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const SeatSchema = dbConnectionOptions.define(
  "seat",
  {
    row: {
      type: DataTypes.TINYINT.UNSIGNED,
      field: "row",
      allowNull: false,
    },
    column: {
      type: DataTypes.TINYINT.UNSIGNED,
      field: "column",
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(8, 2),
      field: "price",
      allowNull: false,
    },
    state: {
      type: DataTypes.TINYINT.UNSIGNED,
      field: "state",
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(6),
      field: "name",
      allowNull: false
  }
  },
  {
    tableName: "seat"
  }
);

module.exports = SeatSchema;
