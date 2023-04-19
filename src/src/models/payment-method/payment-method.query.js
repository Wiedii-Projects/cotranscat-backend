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
            throw errorsConst.aggregateErrorsApp.errorCreatePaymentMethod
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
            throw errorsConst.aggregateErrorsApp.errorGetPaymentMethod
        }
    },

    updatePaymentMethodQuery: async (where, update) => {
        try {
            return await PaymentMethod.update(update, { where });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdatePaymentMethod
        }
    },

    deletePaymentMethodQuery: async (where) => {
        try {
            return await PaymentMethod.destroy({ where })
        } catch {
            throw errorsConst.aggregateErrorsApp.errorDeletePaymentMethod
        }
    }
}