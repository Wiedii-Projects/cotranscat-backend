// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const OwnerSchema = dbConnectionOptions.define(
  "owner",
  {
    numberPhoneWhatsapp: {
      type: DataTypes.STRING(12),
      field: "numberPhoneWhatsapp",
      required: [true, "The number Phone Whatsapp owner is required"],
    },
    address: {
      type: DataTypes.STRING(100),
      field: "address"
    },
    email: {
      type: DataTypes.STRING(100),
      field: "email"
    },
  },
  {
    tableName: "owner",
  }
);

OwnerSchema.removeAttribute("id");

module.exports = OwnerSchema;
