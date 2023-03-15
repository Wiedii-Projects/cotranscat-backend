// DB Connections
const { dbConnectionOptions } = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require('sequelize');

const CodeSmsSchema = dbConnectionOptions.define('CodeSms', {
    code: {
        type: DataTypes.STRING,
        required: [true, 'The role is obligatory']
    },
    userCode: {
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true,
    tableName: 'code_sms',
    underscored: true
});

module.exports = CodeSmsSchema