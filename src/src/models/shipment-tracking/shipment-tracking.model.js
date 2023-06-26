// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const ShipmentTrackingSchema = dbConnectionOptions.define(
    "ShipmentTracking",
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
        tableName: "shipmentTracking",
    },
);

module.exports = ShipmentTrackingSchema;