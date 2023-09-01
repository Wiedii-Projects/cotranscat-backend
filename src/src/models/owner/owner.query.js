// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Owner } = require('../index.models');

module.exports = {
    createOwnerQuery: async (where) => {
        try {
            return await Owner.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.ownerErrors.queryErrors.createError
        }
    },

    findOwnerQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await Owner.findAll({
                where,
                raw: true
            }).then(owner => owner.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                numberPhoneWhatsapp,
                address,
                email
            })))
        } catch {
            throw errorsConst.ownerErrors.queryErrors.findAllError
        }
    },

    updateOwnerQuery: async (where, update) => {
        try {
            return await Owner.update(update, { where });
        } catch {
            throw errorsConst.ownerErrors.queryErrors.updateError
        }
    },

    deleteOwnerQuery: async (where) => {
        try {
            return await Owner.destroy({ where })
        } catch {
            throw errorsConst.ownerErrors.queryErrors.deleteError
        }
    }
}