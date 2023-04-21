// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { paymentMethodQuery } = require('../models/index.queries');


module.exports = {
    createPaymentMethod: async (req, res) => {
        try {
            const { name } = req.body;
            paymentMethodQuery.createPaymentMethodQuery({ name })
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllPaymentMethod: async (req, res) => {
        try {
            const resp = await paymentMethodQuery.findPaymentMethodQuery()
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    
    updatePaymentMethod: async (req, res) => {
        const { decryptId , name } = req.body;
        try {
            await paymentMethodQuery.updatePaymentMethodQuery(
                { id: decryptId },
                { name }
            )
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    deletePaymentMethod: async (req, res) => {
        const { decryptId } = req.body;
        try {
            await paymentMethodQuery.deletePaymentMethodQuery({ id: decryptId });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}