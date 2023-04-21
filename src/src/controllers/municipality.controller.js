// Helpers
const { responseHelpers, sharedHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { municipalityQuery } = require('../models/index.queries');


module.exports = {
    createMunicipality: async (req, res) => {
        try {
            const { name, idDepartment } = req.body;
            municipalityQuery.createMunicipalityQuery({name, idDepartment: sharedHelpers.decryptIdDataBase(idDepartment)})
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllMunicipality: async (req, res) => {
        try {
            const resp = await municipalityQuery.findMunicipalityQuery()
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    
    updateMunicipality: async (req, res) => {
        const { decryptId , name } = req.body;
        try {
            await municipalityQuery.updateMunicipalityQuery(
                { id: decryptId },
                { name }
            )
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    deleteMunicipality: async (req, res) => {
        const { decryptId } = req.body;
        try {
            await municipalityQuery.deleteMunicipalityQuery({ id: decryptId });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}