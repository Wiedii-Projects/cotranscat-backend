// Configuration environment
const { mongoConnection } = require('../config');

// Constants
const constants = require('./../constants/index')

// Libraries
const mongoose = require('mongoose');

module.exports = {
    dbConnection: async () => {
        try {
            await mongoose.connect(mongoConnection)
            console.log(constants.appConst.CONNECTION_BD_SUCCESS)
        } catch (error) {
            throw new Error(constants.appConst.CONNECTION_BD_ERROR);
        }
    }
}