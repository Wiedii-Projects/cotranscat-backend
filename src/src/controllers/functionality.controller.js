// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { functionalityQuery } = require('../models/index.queries');


module.exports = {
    createFunctionality: async (req, res) => {
        const { name } = req.body;
        try {
            functionalityQuery.createFunctionalityQuery({ name });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllFunctionality: async (req, res) => {
        try {
            const resp = await functionalityQuery.findFunctionalitiesQuery();
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    updateFunctionality: async (req, res) => {
        const { name, decryptId: id } = req.body;
        try {
            await functionalityQuery.updateFunctionalityQuery(
                { id },
                { name }
            );
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    deleteFunctionality: async (req, res) => {
        const { name, decryptId: id } = req.body;
        try {
            await functionalityQuery.deleteFunctionalityQuery(
                { id },
                { name }
            );
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}