// Models - Queries
const { roleQuery } = require('./../../models/index.queries')

module.exports = {

    validateRoleType: async (where, req) => {
        try {
            const [role] = await roleQuery.findRoleTypeQuery({where});
            req.body.role = role
        } catch (error) {
            req.body.role = true;
        }
    }
}