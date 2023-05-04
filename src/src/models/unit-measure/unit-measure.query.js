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
            throw errorsConst.unitMeasureErrors.queryErrors.createError;
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
            throw errorsConst.unitMeasureErrors.queryErrors.finAllError
        }
    },

    updateUnitMeasureQuery: async (where, update) => {
        try {
            return await UnitMeasure.update(update, { where });
        } catch {
            throw errorsConst.unitMeasureErrors.queryErrors.updateError;
        }
    },

    deleteUnitMeasureQuery: async (where) => {
        try {
            return await UnitMeasure.destroy({ where })
        } catch {
            throw errorsConst.unitMeasureErrors.queryErrors.deleteError
        }
    }
}