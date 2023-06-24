// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");


const ShippingSchema = dbConnectionOptions.define(
    "Shipping",
    {
        dateOfEntry: {
            type: DataTypes.DATE,
            field: "dateOfEntry",
            allowNull: false
        },
        timeOfEntry: {
            type: DataTypes.TIME,
            field: "timeOfEntry",
            allowNull: false
        },
        dateDeparture: {
            type: DataTypes.DATE,
            field: "dateDeparture"
        },
        timeDeparture: {
            type: DataTypes.TIME,
            field: "timeDeparture"
        },
        weight: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "weight",
            allowNull: false
        },
        depth: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "depth",
            allowNull: false
        },
        width: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "width",
            allowNull: false
        },
        high: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "high",
            allowNull: false
        },
        declaredValue: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "declaredValue",
            allowNull: false
        },
        insuranceCost: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "insuranceCost",
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(100),
            field: "content",
            allowNull: false
        },
        isHomeDelivery: {
            type: DataTypes.TINYINT.UNSIGNED,
            field: "isHomeDelivery",
            allowNull: false,
        }
    },
    {
        tableName: "shipping"
    }
);

module.exports = ShippingSchema;