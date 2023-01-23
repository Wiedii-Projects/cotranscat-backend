// Models
const { Role } = require('./../index.models');

module.exports = {
    isValidRoleQuery: async (role = '') => {
        return await Role.findOne({ role });
    }
}