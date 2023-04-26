// DB Connections
const { dbConnectionOptions } = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const FunctionalitySchema = dbConnectionOptions.define(
    "functionality",
    {
        name: {
            type: DataTypes.STRING(10),
            field: "name",
            allowNull: false
        },
    },
    {
        tableName: "functionality",
    }
);

module.exports = FunctionalitySchema;