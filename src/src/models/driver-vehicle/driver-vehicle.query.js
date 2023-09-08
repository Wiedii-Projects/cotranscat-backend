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
    findOneDriverVehicleQuery: async (query) => {
        const { where } = query;
        return await DriverVehicle.findOne({ where, raw: true, nest: true })
    }
};