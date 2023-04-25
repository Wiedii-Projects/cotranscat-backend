// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Driver } = require('../index.models');

module.exports = {
    createDriver: async (where, transaction) => {
        try {
            return await Driver.findOrCreate({where, transaction})
        } catch {
            throw errorsConst.driver.queryErrors.create;
        }
    }
}