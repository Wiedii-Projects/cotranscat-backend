// DB Connections
const { dbConnectionOptions } = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require('sequelize');

const RoleSchema = dbConnectionOptions.define('Role', {
    role: {
        type: DataTypes.STRING,
        required: [true, 'The role is obligatory']
    }
},{
    tableName: 'role'
});

module.exports = RoleSchema;