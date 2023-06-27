// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");


const MoneyTransferSchema = dbConnectionOptions.define(
    "MoneyTransfer",
    {
        amountMoney: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'amountMoney',
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'cost',
            allowNull: false
        },
        iva: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'iva',
            allowNull: false
        },
    },
    {
        tableName: "moneyTransfer"
    }
);

module.exports = MoneyTransferSchema;