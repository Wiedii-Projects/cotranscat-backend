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

MoneyTransferTrackerSchema.beforeValidate(async(register) => {
    let dateOfEntry = new Date().toISOString().split('T')[0];

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSecond = currentDate.getSeconds();

    const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:${currentSecond.toString().padStart(2, '0')}`;

    let timeOfEntry = formattedTime;
    register.date = currentDate;
    register.time = formattedTime;
  });

module.exports = MoneyTransferTrackerSchema;