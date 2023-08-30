// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Country } = require('../index.models');

module.exports = {

    findCountryQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await Country.findAll({
                where,
                raw: true
            }).then(Country => Country.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.CountryErrors.queryErrors.findAllError
        }
    }
}