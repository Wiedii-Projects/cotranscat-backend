// DB Connections
const { dbConnectionOptions } = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require('sequelize');
const RoleSchema = require("../role/role.model");

const UserSchema = dbConnectionOptions.define('User', {
    name: {
        type: DataTypes.STRING,
        field: 'name',
        required: [true, 'The name is required']
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'lastName',
        required: [true, 'The last name is required']
    },
    email: {
        type: DataTypes.STRING,
        field: 'email',
        required: [true, 'Mail is required'],
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        field: 'phoneNumber',
        required: [true, 'The phoneNumber is required']
    },
    password: {
        type: DataTypes.STRING,
        field: 'password',
        required: [true, 'Password is required']
    },
    img: {
        type: DataTypes.STRING,
        field: 'img',
        default: 'No image'
    },
    state: {
        type: DataTypes.BOOLEAN,
        field: 'state',
        default: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        field: 'google',
        default: false
    }
}, {
    tableName: 'user'
});

UserSchema.belongsTo(RoleSchema, { foreignKey: {
    name: 'role',
    allowNull: false
} });

module.exports = UserSchema;