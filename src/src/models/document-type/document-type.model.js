// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const DocumentTypeSchema = dbConnectionOptions.define(
  "DocumentType",
  {
    document: {
      type: DataTypes.STRING,
      field: "document",
      required: [true, "The name document type is required"],
    },
  },
  {
    tableName: "documentType",
  }
);

module.exports = DocumentTypeSchema;
