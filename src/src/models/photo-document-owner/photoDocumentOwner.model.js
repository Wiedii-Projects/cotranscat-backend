// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const PhotoDocumentOwnerSchema = dbConnectionOptions.define(
  "photoDocumentOwner",
  {
    photo: {
      type: DataTypes.STRING(50),
      field: "photo",
      required: [true, "The photo photoDocumentOwner is required"],
    },
  },
  {
    tableName: "photoDocumentOwner",
  }
);

module.exports = PhotoDocumentOwnerSchema;
