// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { observationQuery } = require('../models/index.queries');


module.exports = {
    createObservation: async(req, res) => {
        const { invoice: idInvoice, description } = req.body;
        try {
            await observationQuery.createObservationQuery({ idInvoice, description, date: new Date() });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getObservation: async(req, res) => {
        try {
            const { invoice: idInvoice } = req.body;
            const observation = await observationQuery.findObservationQuery({ where: {idInvoice} });
            return responseHelpers.responseSuccess(res, observation);
        } catch {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}