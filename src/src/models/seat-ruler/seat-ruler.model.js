// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const SeatRulerSchema = dbConnectionOptions.define(
    "SeatRuler",
    {
        name: {
            type: DataTypes.STRING(6),
            field: "name",
            allowNull: false
        },
        row: {
            type: DataTypes.TINYINT.UNSIGNED,
            field: "row",
            allowNull: false
        },
        column: {
            type: DataTypes.TINYINT.UNSIGNED,
            field: "column",
            allowNull: false
        }
    },
    {
        tableName: "seatRuler",
        indexes: [
            {
                unique: true,
                fields: ["row", "column", "idTemplateVehicle"]
            }
        ]
    }
);

module.exports = SeatRulerSchema;