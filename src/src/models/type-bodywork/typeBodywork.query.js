// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { TypeBodywork } = require('../index.models');

module.exports = {
    createTypeBodyworkQuery: async (where) => {
        try {
            return await TypeBodywork.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.typeBodyworkErrors.queryErrors.createError
        }
    },

    findTypeBodyworkQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await TypeBodywork.findAll({
                where,
                raw: true
            }).then(typeBodywork => typeBodywork.map(({ id, name, idDepartment }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.typeBodyworkErrors.queryErrors.findAllError
        }
    },

    updateTypeBodyworkQuery: async (where, update) => {
        try {
            return await TypeBodywork.update(update, { where });
        } catch {
            throw errorsConst.typeBodyworkErrors.queryErrors.updateError
        }
    },

    deleteTypeBodyworkQuery: async (where) => {
        try {
            return await TypeBodywork.destroy({ where })
        } catch {
            throw errorsConst.typeBodyworkErrors.queryErrors.deleteError
        }
    }
}