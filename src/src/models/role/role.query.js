// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Role } = require('./../index.models');

// Helper
const { encryptIdDataBase } = require('../../helpers/shared.helpers');

module.exports = {

    createRoleTypeQuery: async (where) => {
        try {
            return await Role.findOrCreate({ where })
        } catch {
            throw errorsConst.roleErrors.queryErrors.createError;
        }
    },

    findRoleTypeQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await Role.findAll({
                where,
                raw: true
            }).then(type => type.map(({ id, type }) => ({
                id: encryptIdDataBase(id),
                type
            })));
        } catch {
            throw errorsConst.roleErrors.queryErrors.findAllError;
        }
    }
}