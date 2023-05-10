// Constants
const { errorsConst } = require('../../constants/index.constants');
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Travel, DriverVehicle, Driver, Vehicle } = require('../index.models');

module.exports = {
    createTravel: async (where, transaction) => {
        try {
            const [travel, isCreated] = await Travel.findOrCreate({ where, transaction })
            return [travel.get(), isCreated]
        } catch {
            throw errorsConst.travelErrors.queryErrors.createError;
        }
    },
    findTravels: async (query = {}) => {
        try {
            const {
                where,
                attributes = ['id', 'time', 'date'],
                include = [
                    {
                        model: DriverVehicle,
                        as: 'TravelDriverVehicle',
                        attributes: [],
                        include: [
                            { 
                                model: Vehicle, 
                                as: 'Vehicle', 
                                attributes: ['id', 'plate', 'mark', 'model', 'price']
                            },
                            { 
                                model: Driver, 
                                as: 'Driver', 
                                attributes: ['id', 'nickName', 'email']
                            },
                        ]
                    },
                ],
            } = query;
            return await Travel.findAll({
                raw: true,
                nest: true,
                where,
                attributes,
                include
            });
        } catch {
            throw errorsConst.travelErrors.queryErrors.findError;
        }
    },
    updateTravel: async (values, where) => {
        try {
            return await Travel.update(values, { where });
        } catch {
            throw errorsConst.travelErrors.queryErrors.updateError;
        }
    },
    deleteTravel: async (where) => {
        try {
            return await Travel.destroy({ where });
        } catch {
            throw errorsConst.travelErrors.queryErrors.deleteError;
        }
    }
}