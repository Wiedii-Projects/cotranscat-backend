// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const PaymentMethodBankSchema = dbConnectionOptions.define(
    "paymentMethodBank",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        codePaymentMethod: {
          type: DataTypes.STRING(2),
          field: "codePaymentMethod",
          required: [true, "The code payment method is required"],
        },
    },
    {
        tableName: "paymentMethodBank"
    }
);

module.exports = PaymentMethodBankSchema;