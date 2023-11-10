// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Vehicle, DriverVehicle, TemplateVehicle, SeatRuler, StateVehicle, Travel } = require('./../index.models');

// Helpers
const { encryptIdDataBase } = require('../../helpers/shared.helpers');
const { Op } = require('sequelize');

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
                attributes = ['id', 'plate', 'mark', 'model', 'price']
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
        try {
        return await Vehicle.findOne({ where, raw: true, nest: true })
        } catch (error) {
            throw errorsConst.vehicleErrors.queryErrors.findOneVehicleQuery
        }
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
                        as: 'VehicleDriverVehicle',
                        required: true, 
                        include: [
                            {
                                model: StateVehicle,
                                as: 'DriverVehicleStateVehicle',
                                where : {
                                    type: 0
                                }
                            }
                        ]
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
    },
    getSeatRulesByVehicle: async (query) => {
        try {
            const {
                where,
                include = [
                    {
                        model: TemplateVehicle,
                        as: 'VehicleTemplateVehicle',
                        include: [
                            {
                                model: SeatRuler,
                                as: 'SeatRulerTemplateVehicle'
                            }
                        ]
                    }
                ]
            } = query;
            return await Vehicle.findOne({
                where,
                include,
                nest: true
            })
        } catch {
            throw errorsConst.vehicleErrors.queryErrors.findSeatRulesByVehicleError
        }
    },
    findAllAvailableVehiclesAndDriverVehicleQuery: async (query, whereTravel) => {
        const {
            where
        } = query;
        
        try {
            return await Vehicle.findAll({
                include: [
                    {
                        model: DriverVehicle,
                        as: "VehicleDriverVehicle",
                        required: true,
                        include: [
                            {
                                model: StateVehicle,
                                as: "DriverVehicleStateVehicle",
                                where: {
                                    type: 0
                                },
                            },
                            {
                                model: Travel,
                                as: "TravelDriverVehicle",
                                required: true,
                                where: whereTravel
                            }
                        ],
                    }
                ],
                where,
                raw: true,
                nest: true
            })
        } catch {
            throw errorsConst.vehicleErrors.queryErrors.findAllAvailableVehiclesAndDriverVehicleError
        }
    },
    findAllAvailableVehiclesAndDriverVehicleWithSeatQuery: async (query) => {
        const {
            where
        } = query;
        
        try {
            return await Vehicle.findAll({
                include: [
                    {
                        model: DriverVehicle,
                        as: "VehicleDriverVehicle",
                        required: false,
                        include: [
                            {
                                model: StateVehicle,
                                as: "DriverVehicleStateVehicle",
                                where: {
                                    [Op.or]: [
                                        { type: 0 },
                                        { type: 2 }
                                    ]
                                },
                            }
                        ]
                    },
                    {
                        model: TemplateVehicle,
                        as: "VehicleTemplateVehicle",
                        include: [
                            {
                                model: SeatRuler,
                                as: "SeatRulerTemplateVehicle"
                            }
                        ]
                    }
                ],
                where,
                nest: true
            })
        } catch {
            throw errorsConst.vehicleErrors.queryErrors.findAllAvailableVehiclesAndDriverVehicleWithSeatError
        }
    },
    findAllAvailableVehiclesByDateCurrentQuery: async (query, whereTravel) => {
        const {
            where
        } = query;
        
        try {
            return await Vehicle.findAll({
                include: [
                    {
                        model: DriverVehicle,
                        as: "VehicleDriverVehicle",
                        required: false,
                        include: [
                            {
                                model: StateVehicle,
                                as: "DriverVehicleStateVehicle",
                                where: {
                                    type: 0
                                },
                            },
                            {
                                model: Travel,
                                as: "TravelDriverVehicle",
                                required: false,
                                where: whereTravel
                            }
                        ],
                    }
                ],
                where,
                raw: true,
                nest: true
            })
        } catch {
            throw errorsConst.vehicleErrors.queryErrors.findAllAvailableVehiclesByDateCurrentError
        }
    }
}