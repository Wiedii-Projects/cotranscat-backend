// Helpers
const indexHelpers = require('../helpers/index.helpers');
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { routeQuery } = require('../models/index.queries');


module.exports = {
    createRoute: async (req, res) => {
        try {
            const { idMunicipalityDepart, idMunicipalityArrive } = req.body;
            await routeQuery.createRouteQuery({ idMunicipalityDepart: indexHelpers.sharedHelpers.decryptIdDataBase(idMunicipalityDepart), idMunicipalityArrive : indexHelpers.sharedHelpers.decryptIdDataBase(idMunicipalityArrive) })
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllRoute: async (req, res) => {
        try {
            const resp = await routeQuery.findRouteQuery()
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

}