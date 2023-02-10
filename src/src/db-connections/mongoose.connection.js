// Constants
const { appConst, coreConfigurationsConst } = require('../constants/index.constants')

// Libraries
const mongoose = require('mongoose');

module.exports = {
    dbConnection: async () => {
        try {
            console.log(coreConfigurationsConst.mongoConnection)
            mongoose.set("strictQuery", false);
            await mongoose.connect(coreConfigurationsConst.mongoConnection)
            console.log(appConst.CONNECTION_BD_SUCCESS)
        } catch (error) {
            throw new Error(appConst.CONNECTION_BD_ERROR);
        }
    }
}