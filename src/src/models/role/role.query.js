// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Role } = require('./../index.models');

module.exports = {
    isValidRoleQuery: async (role = '') => {
        try {
            const roleExists = await Role.findOne({ where: { role } });
            if (!roleExists) throw new MessageErrors(errorsConst.roleErrors.unregisteredRoleDB);
            return roleExists
        } catch {
            throw new MessageErrors(errorsConst.aggregateErrorsApp.errorGetRoleByName);
        }
    },
}