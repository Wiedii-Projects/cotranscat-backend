// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { DriverVehicle } = require("../index.models");

module.exports = {
    createDriverVehicle: async (where, transaction) => {
        try {
            return await DriverVehicle.findOrCreate({where, transaction,})
        } catch {
            throw errorsConst.driverVehicleErrors.queryErrors.createError
        }
    },
};