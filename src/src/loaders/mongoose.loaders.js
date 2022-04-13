const mongoose = require('mongoose');
const { mongoConnection } = require('../config');

const dbConnection = async () => {
    try {
        await mongoose.connect(mongoConnection)
        console.log('Online database')
    } catch (error) {
        console.log(error);
        throw new Error('Error starting the database');
    }
}

module.exports = {
    dbConnection
}