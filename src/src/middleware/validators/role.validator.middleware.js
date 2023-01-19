// Constants
const errorsConst = require('./../../constants/index');

// Helpers
const responseHelpers = require('./../../helpers/response.helpers')

// Models - Queries
const { roleQuery } = require('./../../models/index.queries')

module.exports = {
    validateRole: async (role, req) => {
        req.body.validRole = await roleQuery.isValidRoleQuery(role) ? true : false;
    }
}