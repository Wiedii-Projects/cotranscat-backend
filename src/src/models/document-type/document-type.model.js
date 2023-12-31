// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const DocumentTypeSchema = dbConnectionOptions.define(
  "DocumentType",
  {
    name: {
      type: DataTypes.STRING,
      field: "name",
      required: [true, "The name document type is required"],
    },
    code: {
      type: DataTypes.STRING(1),
      field: "code",
      required: [true, "The code document type is required"],
    },
  },
  {
    tableName: "documentType",
  }
);

module.exports = DocumentTypeSchema;
