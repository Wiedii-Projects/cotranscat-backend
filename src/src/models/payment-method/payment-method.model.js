// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
  const PaymentMethodSchema = dbConnectionOptions.define(
    "paymentMethod",
    {
      name: {
        type: DataTypes.STRING(100),
        field: "name",
        required: [true, "The name paymentMethod is required"],
      },
    },
    {
      tableName: "paymentMethod",
    }
  );
  
  module.exports = PaymentMethodSchema;