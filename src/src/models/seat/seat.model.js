// DB Connections
const { dbConnectionOptions } = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const SeatSchema = dbConnectionOptions.define(
    "seat",
    {
        row: {
            type: DataTypes.TINYINT.UNSIGNED,
            field: "row",
            allowNull: false
        },
        column: {
            type: DataTypes.TINYINT.UNSIGNED,
            field: "column",
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(8,2),
            field: "price",
            allowNull: false
        }
    },
    {
        tableName: "seat",
        indexes: [
            {
                unique: true,
                fields: ["date", "time", "idDriverVehicle"]
            }
        ]
    }
);

module.exports = SeatSchema;