// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const DriverVehicleSchema = dbConnectionOptions.define(
    "driverVehicle",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    },
    {
        tableName: "driverVehicle"
    }
);

module.exports = DriverVehicleSchema;