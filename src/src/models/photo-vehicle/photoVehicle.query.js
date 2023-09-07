// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { PhotoVehicle } = require('../index.models');

module.exports = {
    createPhotoVehicleQuery: async (where) => {
        try {
            return await PhotoVehicle.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.photoVehicleErrors.queryErrors.createError
        }
    },

    findPhotoVehicleQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await PhotoVehicle.findAll({
                where,
                raw: true
            }).then(photoVehicle => photoVehicle.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.photoVehicleErrors.queryErrors.findAllError
        }
    },

    updatePhotoVehicleQuery: async (where, update) => {
        try {
            return await PhotoVehicle.update(update, { where });
        } catch {
            throw errorsConst.photoVehicleErrors.queryErrors.updateError
        }
    },

    deletePhotoVehicleQuery: async (where) => {
        try {
            return await PhotoVehicle.destroy({ where })
        } catch {
            throw errorsConst.photoVehicleErrors.queryErrors.deleteError
        }
    }
}