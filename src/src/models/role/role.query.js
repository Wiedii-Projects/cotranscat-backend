// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Role } = require('./../index.models');

module.exports = {
    findRoleQuery: async ( where ) => {
        try {
            return await Role.findAll({ where, raw: true });
        } catch {
            throw new MessageErrors(errorsConst.aggregateErrorsApp.errorGetRoleByName);
        }
    }
}