// Constants
const { errorsConst } = require('../../constants/index.constants');
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Travel, DriverVehicle, Driver, Vehicle } = require('../index.models');

module.exports = {
    createTravel: async (where, transaction) => {
        try {
            return await Travel.findOrCreate({ where, transaction })
        } catch {
            throw errorsConst.travelErrors.queryErrors.create;
        }
    },
    findTravels: async (where, attributes = ['id', 'time', 'date']) => {
        try {
            const travels = await Travel.findAll({
                where,
                attributes,
                include: [
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
                raw: true,
                nest: true
            })

            return travels.map(({ id, TravelDriverVehicle: { Vehicle, Driver }, ...travel }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                ...travel,
                driver: {
                    ...Driver,
                    id: sharedHelpers.encryptIdDataBase(Driver.id)
                },
                vehicle: {
                    ...Vehicle,
                    id: sharedHelpers.encryptIdDataBase(Vehicle.id)
                }
            }))
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