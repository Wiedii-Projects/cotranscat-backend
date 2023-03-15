// Models - Queries
const { roleQuery } = require('./../../models/index.queries')

module.exports = {
    validateRole: async (role, req) => {
        try {
            req.body.validRole = await roleQuery.isValidRoleQuery(role) ? true : false;
        } catch {
            req.body.validRole = false
        }
    }
}