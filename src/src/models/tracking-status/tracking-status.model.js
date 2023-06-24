// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const TrackingStatusSchema = dbConnectionOptions.define(
    "TrackingStatus",
    {
        chronologicalPosition: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "chronologicalPosition",
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(60),
            field: "name",
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(100),
            field: "description",
            defaultValue: ""
        },
    },
    {
        tableName: "trackingStatus",
    }, {
    indexes: [
        {
            unique: true,
            fields: ['chronologicalPosition', 'name']
        },
    ],
}
);

module.exports = TrackingStatusSchema;
