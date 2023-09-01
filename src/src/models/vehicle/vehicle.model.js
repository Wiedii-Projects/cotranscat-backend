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
        },
        code: {
            type: DataTypes.STRING(50),
            unique: true,
            field: "code",
            allowNull: false
        },
        internalNumber: {
            type: DataTypes.STRING(50),
            unique: true,
            field: "internalNumber",
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(50),
            field: "code",
            allowNull: false
        },
        mileage: {
            type: DataTypes.STRING(50),
            field: "mileage",
            allowNull: false
        },
        motorNumber: {
            type: DataTypes.STRING(50),
            field: "motorNumber",
            allowNull: false
        },
        rerecordingMotor: {
            type: DataTypes.BOOLEAN,
            field: "rerecordingMotor",
            defaultValue: false
        },
        chassisNumber: {
            type: DataTypes.STRING(50),
            field: "chassisNumber",
            allowNull: false
        },
        rerecordingChassis: {
            type: DataTypes.BOOLEAN,
            field: "rerecordingChassis",
            defaultValue: false
        },
        serialNumber: {
            type: DataTypes.STRING(50),
            field: "serialNumber",
            allowNull: false
        },
        rerecordingSerialNumber: {
            type: DataTypes.BOOLEAN,
            field: "rerecordingSerialNumber",
            defaultValue: false
        },
        SOATExpiration: {
            type: DataTypes.DATE,
            field: "SOATExpiration",
            allowNull: false
        },
        mechanicalTechnicianExpiration: {
            type: DataTypes.DATE,
            field: "mechanicalTechnicianExpiration",
            allowNull: false
        },
        SOATPhoto: {
            type: DataTypes.STRING(100),
            field: "SOATPhoto",
            allowNull: ""
        },
        mechanicalTechnicianPhoto: {
            type: DataTypes.STRING(100),
            field: "mechanicalTechnicianPhoto",
            allowNull: ""
        },
        propertyCardPhoto: {
            type: DataTypes.STRING(100),
            field: "propertyCardPhoto",
            allowNull: ""
        },
    },
    {
        tableName: "vehicle",
    }
);

module.exports = VehicleSchema;