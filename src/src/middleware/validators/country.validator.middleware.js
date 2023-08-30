// Queries
const { sharedHelpers } = require('../../helpers/index.helpers');

// Helpers
const { countryQuery } = require('../../models/index.queries')

module.exports = {
    validateDepartment: async (req, query) => {
        try {
            const [country] = await countryQuery.findCountryQuery(query);
            req.body.idCountry = country
                ? sharedHelpers.decryptIdDataBase(country.id)
                : false
        } catch {
            req.body.idDepartment = false;
        }
    }
}