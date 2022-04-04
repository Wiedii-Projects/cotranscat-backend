const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION1)
        console.log('Online database')
    } catch (error) {
        console.log(error);
        throw new Error('Error starting the database');
    }
}

module.exports = {
    dbConnection
}