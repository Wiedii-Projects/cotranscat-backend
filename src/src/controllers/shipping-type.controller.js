// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { shippingTypeQuery } = require('../models/index.queries');


module.exports = {
    createShippingType: async (req, res) => {
        try {
            const { name } = req.body;
            shippingTypeQuery.createShippingTypeQuery({ name })
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllShippingType: async (req, res) => {
        try {
            const resp = await shippingTypeQuery.findShippingTypeQuery()
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    
    updateShippingType: async (req, res) => {
        const { decryptId , name } = req.body;
        try {
            await shippingTypeQuery.updateShippingTypeQuery(
                { id: decryptId },
                { name }
            )
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    deleteShippingType: async (req, res) => {
        const { decryptId } = req.body;
        try {
            await shippingTypeQuery.deleteShippingTypeQuery({ id: decryptId });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}