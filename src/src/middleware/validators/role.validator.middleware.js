// Constants
const errorsConst = require('./../../constants/index');

// Helpers
const responseHelpers = require('./../../helpers/response.helpers')

// Models - Queries
const { roleQuery } = require('./../../models/index.queries')

module.exports = {
    isRole: (...roles) => {
        return (req, res, next) => {
            if (!req.user) {
                return responseHelpers.responseError(res, 500, errorsConst.userErrors.verifyRole);
            };

            const messageErr = errorsConst.userErrors.allowedRoles
            messageErr.message += roles.join(', ')

            if (!roles.includes(req.user.role)) {
                return responseHelpers.responseError(res, 401, messageErr);
            };

            next();
        }
    },
    validRole: async (role, req) => {
        req.body.validRole = await roleQuery.isValidRoleQuery(role) ? true : false;
    }
}