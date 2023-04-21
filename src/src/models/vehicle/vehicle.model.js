// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const VehicleSchema = dbConnectionOptions.define(
    "Vehicle",
    {
        plate: {
            type: DataTypes.STRING(10),
            unique: true,
            field: "plate",
            allowNull: false
        },
        mark: {
            type: DataTypes.STRING(100),
            field: "mark",
            allowNull: false
        },
        model: {
            type: DataTypes.STRING(50),
            field: "model",
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(8,2),
            field: "price",
            allowNull: false
        },
        width: {
            type: DataTypes.TINYINT.UNSIGNED,
            field: "width",
            allowNull: false
        },
        height: {
            type: DataTypes.TINYINT.UNSIGNED,
            field: "height",
            allowNull: false
        }
    },
    {
        tableName: "vehicle",
    }
);

module.exports = VehicleSchema;