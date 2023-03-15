// DB Connections
const { dbConnectionOptions } = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require('sequelize');

const UserGoogleSchema = dbConnectionOptions.define('UserGoogle', {
    name: {
        type: DataTypes.STRING,
        required: [true, 'The name is required']
    },
    lastName: {
        type: DataTypes.STRING,
        required: [true, 'The last name is required']
    },
    email: {
        type: DataTypes.STRING,
        required: [true, 'Mail is required'],
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        required: [true, 'The phoneNumber is required']
    },
    img: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.BOOLEAN,
        default: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    role: {
        type: DataTypes.STRING,
        required: true,
        // emun: ['ADMIN_ROLE', 'USER_ROLE']
    }
},{
    tableName: 'user_google'
});

module.exports = UserGoogleSchema;