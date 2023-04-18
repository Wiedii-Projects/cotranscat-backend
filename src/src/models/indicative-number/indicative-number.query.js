// Constants
const { errorsConst } = require('../../constants/index.constants');

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { IndicativeNumber } = require('../index.models');

module.exports = {
    createIndicativeNumberQuery: async(where) => {
        try {
            await IndicativeNumber.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateIndicativeNumber
        }
    },
    findIndicativeNumberQuery: async(query = {}) => {
        try {
            const { where } = query;
            return await IndicativeNumber.findAll({
                where,
                raw: true
            }).then(indicativeNumber => indicativeNumber.map(({id,number,country}) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                number,
                country
            })))
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetIndicativeNumber
        }
    },
    updateIndicativeNumberQuery: async (where, update) => {
        try {
            return await IndicativeNumber.update(update, { where });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateIndicativeNumber
        }
    },
    deleteIndicativeNumberQuery: async (where) => {
        try {
            return await IndicativeNumber.destroy({ where })
        } catch {
            throw errorsConst.aggregateErrorsApp.errorDeleteIndicativeNumber
        }
    }
}