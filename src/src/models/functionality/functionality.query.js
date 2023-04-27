// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Functionality } = require('../index.models');

// Helper
const { encryptIdDataBase } = require('../../helpers/shared.helpers');

module.exports = {
    createFunctionalityQuery: async (where) => {
        try {
            return await Functionality.findOrCreate({ where })
        } catch {
            throw errorsConst.functionalityErrors.queryErrors.createError;
        }
    },

    findFunctionalitiesQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await Functionality.findAll({
                where,
                raw: true
            }).then(functionality => functionality.map(({ id, name }) => ({
                id: encryptIdDataBase(id),
                name
            })))
        } catch (error) {
            throw errorsConst.functionalityErrors.queryErrors.findAllError
        }
    },

    updateFunctionalityQuery: async (where, update) => {
        try {
            return await Functionality.update(update, { where });
        } catch {
            throw errorsConst.functionalityErrors.queryErrors.updateError
        }
    },

    deleteFunctionalityQuery: async (where) => {
        try {
            return await Functionality.destroy({ where });
        } catch {
            throw errorsConst.functionalityErrors.queryErrors.deleteError
        }
    },
}