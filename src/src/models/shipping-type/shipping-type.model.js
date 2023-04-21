// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const ShippingTypeSchema = dbConnectionOptions.define(
    "shippingType",
    {
      name: {
        type: DataTypes.STRING(100),
        field: "name",
        required: [true, "The name shipping type is required"],
      },
    },
    {
      tableName: "shippingType",
    }
  );
  
  module.exports = ShippingTypeSchema;