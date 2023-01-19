// Configuration environment
const { mongoConnection } = require('../config');

// Constants
const { appConst } = require('./../constants/index')

// Libraries
const mongoose = require('mongoose');

module.exports = {
    dbConnection: async () => {
        try {
            await mongoose.connect(mongoConnection)
            console.log(appConst.CONNECTION_BD_SUCCESS)
        } catch (error) {
            throw new Error(appConst.CONNECTION_BD_ERROR);
        }
    }
}