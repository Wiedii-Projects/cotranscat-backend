// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const PrefixSchema = dbConnectionOptions.define(
    "prefix",
    {
        code: {
            type: DataTypes.STRING(2),
            allowNull: false,
            unique: true,
            field: "code",
        },
        currentConsecutive: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: "currentConsecutive",
        },
        isElectronic: {
            type: DataTypes.BOOLEAN,
            field: "isElectronic",
            defaultValue: false,
            allowNull: false
        }
    },
    {
        tableName: "prefix"
    }
);

module.exports = PrefixSchema;