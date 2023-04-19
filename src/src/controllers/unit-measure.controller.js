// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { unitMeasureQuery } = require('../models/index.queries');


module.exports = {
    createUnitMeasure: async (req, res) => {
        try {
            const { name } = req.body;
            unitMeasureQuery.createUnitMeasureQuery({ name })
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllUnitMeasure: async (req, res) => {
        try {
            const resp = await unitMeasureQuery.findUnitMeasureQuery()
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    
    updateUnitMeasure: async (req, res) => {
        const { decryptId , name } = req.body;
        try {
            await unitMeasureQuery.updateUnitMeasureQuery(
                { id: decryptId },
                { name }
            )
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    deleteUnitMeasure: async (req, res) => {
        const { decryptId } = req.body;
        try {
            await unitMeasureQuery.deleteUnitMeasureQuery({ id: decryptId });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}