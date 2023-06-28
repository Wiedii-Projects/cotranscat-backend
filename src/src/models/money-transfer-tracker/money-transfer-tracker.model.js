// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const MoneyTransferTrackerSchema = dbConnectionOptions.define(
    "MoneyTransferTracker",
    {
        date: {
            type: DataTypes.DATEONLY,
            field: "date",
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            field: "time",
            allowNull: false,
        },
    },
    {
        tableName: "moneyTransferTracker",
    },
);

module.exports = MoneyTransferTrackerSchema;