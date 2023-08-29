// Helpers
const { responseHelpers } = require('../helpers/index.helpers');


// Models - Queries
const { typeFuelQuery } = require('../models/index.queries');


module.exports = {
    getAllTypeFuel: async (req, res) => {
        try {
            const typeFuel = await typeFuelQuery.findTypeFuelQuery();
            return responseHelpers.responseSuccess(res, typeFuel);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}