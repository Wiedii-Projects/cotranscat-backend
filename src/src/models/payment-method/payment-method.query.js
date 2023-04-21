// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { PaymentMethod } = require('../index.models');

module.exports = {
    createPaymentMethodQuery: async (where) => {
        try {
            return await PaymentMethod.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.paymentMethod.queryErrors.createError
        }
    },

    findPaymentMethodQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await PaymentMethod.findAll({
                where,
                raw: true
            }).then(municipality => municipality.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name,
            })))
        } catch {
            throw errorsConst.paymentMethod.queryErrors.findAllError
        }
    },

    updatePaymentMethodQuery: async (where, update) => {
        try {
            return await PaymentMethod.update(update, { where });
        } catch {
            throw errorsConst.paymentMethod.queryErrors.updateError
        }
    },

    deletePaymentMethodQuery: async (where) => {
        try {
            return await PaymentMethod.destroy({ where })
        } catch {
            throw errorsConst.paymentMethod.queryErrors.deleteError
        }
    }
}