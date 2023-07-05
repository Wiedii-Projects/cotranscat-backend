// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const ResolutionSchema = dbConnectionOptions.define(
    "resolution",
    {
        number: {
            type: DataTypes.STRING(15),
            allowNull: false,
            field: "number",
        },
        DIANPrefix: {
            type: DataTypes.STRING(5),
            allowNull: false,
            field: "DIANPrefix",
        },
        dateOfIssuance: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "dateOfIssuance",
        },
        initialRange: {
            type: DataTypes.INTEGER,
            field: "initialRange",
            allowNull: false
        },
        finalRange: {
            type: DataTypes.INTEGER,
            field: "finalRange",
            allowNull: false
        }
    },
    {
        tableName: "resolution"
    }
);

module.exports = ResolutionSchema;