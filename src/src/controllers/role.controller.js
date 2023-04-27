// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { roleQuery } = require('../models/index.queries');


module.exports = {

    createRole: async (req, res) => {
        const { type } = req.body;
        try {
            roleQuery.createRoleTypeQuery({ type });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllRoles: async (req, res) => {
        try {
            const resp = await roleQuery.findRoleTypeQuery();
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
}