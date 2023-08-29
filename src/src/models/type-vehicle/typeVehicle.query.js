// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { TypeVehicle } = require('../index.models');

module.exports = {
    createTypeVehicleQuery: async (where) => {
        try {
            return await TypeVehicle.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.typeVehicleErrors.queryErrors.createError
        }
    },

    findTypeVehicleQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await TypeVehicle.findAll({
                where,
                raw: true
            }).then(typeVehicle => typeVehicle.map(({ id, name, idDepartment }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.typeVehicleErrors.queryErrors.findAllError
        }
    },

    updateTypeVehicleQuery: async (where, update) => {
        try {
            return await TypeVehicle.update(update, { where });
        } catch {
            throw errorsConst.typeVehicleErrors.queryErrors.updateError
        }
    },

    deleteTypeVehicleQuery: async (where) => {
        try {
            return await TypeVehicle.destroy({ where })
        } catch {
            throw errorsConst.typeVehicleErrors.queryErrors.deleteError
        }
    }
}