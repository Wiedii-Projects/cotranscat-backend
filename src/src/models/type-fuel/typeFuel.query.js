// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { TypeFuel } = require('../index.models');

module.exports = {
    createTypeFuelQuery: async (where) => {
        try {
            return await TypeFuel.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.typeFuelErrors.queryErrors.createError
        }
    },

    findTypeFuelQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await TypeFuel.findAll({
                where,
                raw: true
            }).then(typeFuel => typeFuel.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.typeFuelErrors.queryErrors.findAllError
        }
    },

    updateTypeFuelQuery: async (where, update) => {
        try {
            return await TypeFuel.update(update, { where });
        } catch {
            throw errorsConst.typeFuelErrors.queryErrors.updateError
        }
    },

    deleteTypeFuelQuery: async (where) => {
        try {
            return await TypeFuel.destroy({ where })
        } catch {
            throw errorsConst.typeFuelErrors.queryErrors.deleteError
        }
    }
}