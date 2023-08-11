// Queries
const { sharedHelpers } = require('../../helpers/index.helpers');

// Helpers
const { municipalityQuery } = require('./../../models/index.queries')

module.exports = {
    validateMunicipality: async (req, query) => {
        try {
            const [municipality] = await municipalityQuery.findMunicipalityQuery(query);
            req.body.idMunicipality = municipality
                ? sharedHelpers.decryptIdDataBase(municipality.id)
                : false
        } catch (error) {
            req.body.idMunicipality = false;
        }
    },
    validateIdMunicipality: async (req, id, data) => {
        try {
            const [municipality] = await municipalityQuery.findMunicipalityQuery({ where: { id }});
            req.body[data] = municipality
                ? sharedHelpers.decryptIdDataBase(municipality.id)
                : false
        } catch (error) {
            req.body[data] = false;
        }
    }
}