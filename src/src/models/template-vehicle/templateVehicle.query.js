// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { TemplateVehicle } = require('../index.models');

module.exports = {
    createTemplateVehicleQuery: async (where) => {
        try {
            return await TemplateVehicle.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.templateVehicleErrors.queryErrors.createError
        }
    },

    findTemplateVehicleQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await TemplateVehicle.findAll({
                where,
                raw: true
            }).then(templateVehicle => templateVehicle.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.templateVehicleErrors.queryErrors.findAllError
        }
    },

    updateTemplateVehicleQuery: async (where, update) => {
        try {
            return await TemplateVehicle.update(update, { where });
        } catch {
            throw errorsConst.templateVehicleErrors.queryErrors.updateError
        }
    },

    deleteTemplateVehicleQuery: async (where) => {
        try {
            return await TemplateVehicle.destroy({ where })
        } catch {
            throw errorsConst.templateVehicleErrors.queryErrors.deleteError
        }
    }
}