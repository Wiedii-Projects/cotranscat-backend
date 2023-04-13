// Helpers
const { responseHelpers } = require('../helpers/index.helpers');
const sharedHelpers = require('../helpers/shared.helpers');

// Models - Queries
const { indicativeNumberQuery } = require('../models/index.queries');


module.exports = {
    createIndicativeNumber: async (req, res) => {
        try {
            const { number, country } = req.body;
            indicativeNumberQuery.createIndicativeNumberQuery({number: `+${number}`, country})
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllIndicativeNumber: async (req, res) => {
        try {
            const resp = await indicativeNumberQuery.findIndicativeNumberQuery()
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    
    updateIndicativeNumber: async (req, res) => {
        const [{ id }, { number , country }] = [req.params, req.body];
        try {
            await indicativeNumberQuery.updateIndicativeNumberQuery(
                { id: sharedHelpers.decryptIdDataBase(id) },
                { number: `+${number}`, country }
            )
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    deleteIndicativeNumber: async (req, res) => {
        const { id } = req.params;
        try {
            await indicativeNumberQuery.deleteIndicativeNumberQuery({ id: sharedHelpers.decryptIdDataBase(id) });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}