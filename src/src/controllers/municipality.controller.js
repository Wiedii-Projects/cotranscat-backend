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

    getMunicipality: async (req, res) => {
        const { idDepartment } = req.body;
        const where = idDepartment ? { idDepartment } : undefined
        try {
            const resp = await municipalityQuery.findMunicipalityQuery({where})
            return responseHelpers.responseSuccess(res, resp);
        } catch {
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