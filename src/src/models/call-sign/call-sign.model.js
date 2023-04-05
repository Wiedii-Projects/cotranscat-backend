// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const CallSignTypeSchema = dbConnectionOptions.define(
  "callSign",
  {
    callSignNumber: {
      type: DataTypes.STRING,
      field: "callSignNumber",
      required: [true, "The call sign number is required"],
    },
  },
  {
    tableName: "callSign",
  }
);

module.exports = CallSignTypeSchema;
