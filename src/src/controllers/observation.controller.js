// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { observationQuery } = require('../models/index.queries');


module.exports = {
    createObservation: async(req, res) => {
        const { invoice: idInvoice, description } = req.body;
        try {
            await observationQuery.createObservationQuery({ idInvoice, description });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}