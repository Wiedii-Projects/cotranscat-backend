// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { UnitMeasure } = require('../index.models');

module.exports = {
    createUnitMeasureQuery: async (where) => {
        try {
            return await UnitMeasure.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateUnitMeasure
        }
    },

    findUnitMeasureQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await UnitMeasure.findAll({
                where,
                raw: true
            }).then(unitMeasure => unitMeasure.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name,
            })))
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetUnitMeasure
        }
    },

    updateUnitMeasureQuery: async (where, update) => {
        try {
            return await UnitMeasure.update(update, { where });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateUnitMeasure
        }
    },

    deleteUnitMeasureQuery: async (where) => {
        try {
            return await UnitMeasure.destroy({ where })
        } catch {
            throw errorsConst.aggregateErrorsApp.errorDeleteUnitMeasure
        }
    }
}