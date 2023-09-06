// Constants
const { errorsConst } = require('../../constants/index.constants');
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Travel, DriverVehicle, Driver, Vehicle, Route, Municipality, User, Seat, Shipping, Ticket } = require('../index.models');

module.exports = {
    createTravel: async (where, transaction) => {
        try {
            const [travel, isCreated] = await Travel.findOrCreate({ where, transaction })
            return [travel.get(), isCreated]
        } catch {
            throw errorsConst.travelErrors.queryErrors.createError;
        }
    },
    findRouteToTravel: async(where) => {
        try {
            return await Travel.findOne({
                raw: true,
                nest: true,
                where,
                attributes: ['idRoute'],
                include: [
                    {
                        model: Route,
                        as: 'TravelRoute',
                        attributes: ['idMunicipalityDepart', 'idMunicipalityArrive'],
                        include: [
                            {
                                model: Municipality,
                                as: 'MunicipalityDepart',
                                attributes: ['name'],
                            },
                            {
                                model: Municipality,
                                as: 'MunicipalityArrive',
                                attributes: ['name'],
                            }
                        ]
                    }
                ]
            })
            .then((result) => ({
                municipalityDepart: result.TravelRoute.MunicipalityDepart.name,
                municipalityArrive: result.TravelRoute.MunicipalityArrive.name
            }));
        } catch {
            throw errorsConst.travelErrors.queryErrors.findError;
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
                                as: 'VehicleDriverVehicle'
                                
                            },
                            { 
                                model: Driver, 
                                as: 'DriverDriverVehicle', 
                                attributes: ['id', 'nickName', 'email'],
                                include: [
                                    {
                                        model: User, 
                                        as: 'UserDriver'
                                    }
                                ]
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
    },
    findManifestTravels: async (query = {}) => {
        try {
            const {
                where,
                attributes = ['id', 'time', 'date'],
                include = [
                    {
                        model: DriverVehicle,
                        as: 'TravelDriverVehicle',
                        include: [
                            { 
                                model: Vehicle, 
                                as: 'VehicleDriverVehicle'
                                
                            },
                            { 
                                model: Driver, 
                                as: 'DriverDriverVehicle', 
                                include: [
                                    {
                                        model: User, 
                                        as: 'UserDriver'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        model: Seat,
                        as: 'TravelSeat',
                        include: [
                            {
                                model: Ticket,
                                as: 'TicketSeat',
                            }
                        ]
                    },
                    {
                        model: Shipping,
                        as: 'TravelShipping',
                    }
                ],
            } = query;
            return await Travel.findAll({
                nest: true,
                where,
                attributes,
                include
            });
        } catch {
            throw errorsConst.travelErrors.queryErrors.findError;
        }
    }
}