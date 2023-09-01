// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Vehicle, DriverVehicle } = require('./../index.models');

// Helpers
const { encryptIdDataBase } = require('../../helpers/shared.helpers');

module.exports = {
    createVehicle: async (values, options = {}) => {
        try {
            return await Vehicle.create(values, options)
        } catch {
            throw errorsConst.vehicleErrors.queryErrors.createdError;
        }
    },
    findVehicles: async (query = {}) => {
        try {
            const { 
                where,
                attributes = ['id', 'plate', 'mark', 'model', 'price', 'width', 'height']
            } = query;
            return await Vehicle.findAll({
                where,
                attributes,
                raw: true,
            }).then(vehicles => vehicles.map(({ id, ...vehicle }) => ({
                id: encryptIdDataBase(id),
                ...vehicle
            })))
        } catch {
            throw errorsConst.vehicleErrors.queryErrors.findError
        }
    },
    findOneVehicleQuery: async (query) => {
        const { where } = query;
        return await Vehicle.findOne({ where, raw: true, nest: true })
      },
    deleteVehicle: async (where) => {
        try {
            return await Vehicle.destroy({ where })
        } catch {
            throw errorsConst.vehicleErrors.queryErrors.deleteError
        }
    },
    findVehiclesByStateTravel: async (query = {}) => {
        try {
            const { 
                where,
                attributes = ['id', 'internalNumber', 'plate', 'mark'],
                include = [
                    { 
                        model: DriverVehicle, 
                        as: 'VehicleDriverVehicle'
                        // TODO:  Implement condition for state vehicle on travel
                    }
                ]
            } = query;
            const vehiclesAvailable = await Vehicle.findAll({
                where,
                attributes,
                include,
                raw: true,
                nest: true
            })

            const vehicles = vehiclesAvailable.map(({ id, internalNumber, plate, mark, VehicleDriverVehicle: { id: idDriverVehicle } }) => ({
                id: encryptIdDataBase(id),
                internalNumber,
                plate,
                mark,
                idDriverVehicle: encryptIdDataBase(idDriverVehicle)
            }))

            return vehicles
        } catch {
            throw errorsConst.vehicleErrors.queryErrors.findError
        }
    }
}