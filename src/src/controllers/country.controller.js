// Helpers
const { responseHelpers } = require('../helpers/index.helpers');


// Models - Queries
const { countryQuery } = require('../models/index.queries');


module.exports = {
    getAllCountry: async (req, res) => {
        try {
            const country = await countryQuery.findCountryQuery();
            return responseHelpers.responseSuccess(res, country);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}