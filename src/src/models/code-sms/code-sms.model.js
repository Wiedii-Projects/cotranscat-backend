// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const CodeSmsSchema = dbConnectionOptions.define(
  "CodeSms",
  {
    code: {
      type: DataTypes.STRING,
      field: "code",
      required: [true, "The role is obligatory"],
    },
  },
  {
    tableName: "codeSms",
  }
);

module.exports = CodeSmsSchema;
