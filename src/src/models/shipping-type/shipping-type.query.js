// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { ShippingType } = require('../index.models');

module.exports = {
    createShippingTypeQuery: async (where) => {
        try {
            return await ShippingType.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.shippingTypeErrors.queryErrors.createError
        }
    },

    findShippingTypeQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await ShippingType.findAll({
                where,
                raw: true
            }).then(shippingType => shippingType.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name,
            })))
        } catch {
            throw errorsConst.shippingTypeErrors.queryErrors.findAllError
        }
    },

    updateShippingTypeQuery: async (where, update) => {
        try {
            return await ShippingType.update(update, { where });
        } catch {
            throw errorsConst.shippingTypeErrors.queryErrors.updateError
        }
    },

    deleteShippingTypeQuery: async (where) => {
        try {
            return await ShippingType.destroy({ where })
        } catch {
            throw errorsConst.shippingTypeErrors.queryErrors.errorError
        }
    }
}