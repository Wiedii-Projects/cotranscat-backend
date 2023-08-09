// Helpers
const { responseHelpers } = require('../helpers/index.helpers');


// Models - Queries
const { bloodTypeQuery } = require('../models/index.queries');


module.exports = {
    getAllBloodType: async (req, res) => {
        try {
            const bloodType = await bloodTypeQuery.findBloodTypeQuery();
            return responseHelpers.responseSuccess(res, bloodType);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}