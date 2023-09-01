// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { StateVehicle } = require('../index.models');

module.exports = {
    createStateVehicleQuery: async (where) => {
        try {
            return await StateVehicle.findOrCreate({
                where
            });
        } catch {
            throw errorsConst.stateVehicleErrors.queryErrors.createError
        }
    },

    findStateVehicleQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await StateVehicle.findAll({
                where,
                raw: true
            }).then(stateVehicle => stateVehicle.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.stateVehicleErrors.queryErrors.findAllError
        }
    },

    updateStateVehicleQuery: async (where, update) => {
        try {
            return await StateVehicle.update(update, { where });
        } catch {
            throw errorsConst.stateVehicleErrors.queryErrors.updateError
        }
    },

    deleteStateVehicleQuery: async (where) => {
        try {
            return await StateVehicle.destroy({ where })
        } catch {
            throw errorsConst.stateVehicleErrors.queryErrors.deleteError
        }
    }
}