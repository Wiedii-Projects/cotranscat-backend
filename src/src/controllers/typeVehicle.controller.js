// Helpers
const { responseHelpers } = require('../helpers/index.helpers');


// Models - Queries
const { typeVehicleQuery } = require('../models/index.queries');


module.exports = {
    getAllTypeVehicle: async (req, res) => {
        try {
            const typeVehicle = await typeVehicleQuery.findTypeVehicleQuery();
            return responseHelpers.responseSuccess(res, typeVehicle);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}