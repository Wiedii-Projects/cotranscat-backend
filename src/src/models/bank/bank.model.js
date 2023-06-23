// DB Connections
const {
    dbConnectionOptions
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const BankSchema = dbConnectionOptions.define(
    "bank",
    {
        code: {
            type: DataTypes.STRING(5),
            field: "code",
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(100),
            field: "description",
            allowNull: false
        },
        idHeadquarter: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "headquarter",
            key: "id",
          }
        }
    },
    {
        tableName: "bank",
    }
);

module.exports = BankSchema;