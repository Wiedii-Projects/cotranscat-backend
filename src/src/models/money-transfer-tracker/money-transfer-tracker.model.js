// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

// Helpers
const { formateDateTime } = require("../../helpers/invoice.helpers");

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

MoneyTransferTrackerSchema.beforeValidate(async(register) => {
     [register.date, register.time] = formateDateTime();
  });

module.exports = MoneyTransferTrackerSchema;