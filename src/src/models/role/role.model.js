// DB Connections
const { dbConnectionOptions } = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require('sequelize');

const RoleSchema = dbConnectionOptions.define('Role', {
    role: {
        type: DataTypes.STRING,
        field: 'role',
        required: [true, 'The role is obligatory']
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    test: {
        type: DataTypes.STRING, 
    }
},{
    tableName: 'role'
});

module.exports = RoleSchema;