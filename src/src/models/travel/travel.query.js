// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Travel, DriverVehicle } = require('../index.models');

module.exports = {
    createTravel: async (where, transaction) => {
        try {
            return await Travel.findOrCreate({where, transaction })
        } catch {
            throw errorsConst.travelErrors.queryErrors.create;
        }
    },
    findTravels: async (where, attributes = ['id', 'time', 'date']) => {
        try {
            return await Travel.findAll({
                where,
                attributes,
                include: [
                    { model: DriverVehicle, as: 'TravelDriverVehicle'},
                ],
                raw: true,
                nest: true
            })
        } catch {
            throw errorsConst.travelErrors.queryErrors.findError;
        }
    },
    updateTravel: async (values, where) => {
        try {
            return await Travel.update(values, {where});
        } catch {
            throw errorsConst.travelErrors.queryErrors.updateError;
        }
    },
    deleteTravel: async ( where ) => {
        try {
            return await Travel.destroy({where});
        } catch {
            throw errorsConst.travelErrors.queryErrors.deleteError;
        }
    }
}