// Helpers
const { responseHelpers } = require('../helpers/index.helpers');


// Models - Queries
const { typeBodyworkQuery } = require('../models/index.queries');


module.exports = {
    getAllTypeBodywork: async (req, res) => {
        try {
            const typeBodywork = await typeBodyworkQuery.findTypeBodyworkQuery();
            return responseHelpers.responseSuccess(res, typeBodywork);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}