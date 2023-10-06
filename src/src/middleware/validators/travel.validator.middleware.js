// Queries
const { travelQuery } = require('./../../models/index.queries')

// Models
const { DriverVehicle, Driver, Vehicle, Municipality } = require('../../models/index.models');

// Helpers
const { sharedHelpers } = require('../../helpers/index.helpers');

module.exports = {
    validateTravel: async (req, where) => {
        try {
            const [{ id, TravelDriverVehicle: {
                VehicleDriverVehicle: {
                    VehicleTemplateVehicle,
                    ...VehicleDriverVehicle
                },
                DriverDriverVehicle: {
                    UserDriver,
                    ...DriverDriverVehicle
                },
                
            }, TravelRoute: { MunicipalityDepart, MunicipalityArrive }, ...travel }] = await travelQuery.findTravels({ where })
            req.body.travel = {
                id: sharedHelpers.encryptIdDataBase(id),
                ...travel,
                driver: {
                    ...DriverDriverVehicle,
                    id: sharedHelpers.encryptIdDataBase(DriverDriverVehicle.id),
                    UserDriver: {
                        ...UserDriver,
                        id: sharedHelpers.encryptIdDataBase(UserDriver.id),
                        idIndicativePhone: sharedHelpers.encryptIdDataBase(UserDriver.idIndicativePhone),
                        idRole: sharedHelpers.encryptIdDataBase(UserDriver.idRole),
                        idDocumentType: sharedHelpers.encryptIdDataBase(UserDriver.idDocumentType)
                    }
                },
                vehicle: {
                    ...VehicleDriverVehicle,
                    id: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.id),
                    idMunicipality: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.idMunicipality),
                    idTypeVehicle: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.idTypeVehicle),
                    idTypeFuel: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.idTypeFuel),
                    idTypeBodywork: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.idTypeBodywork),
                    idTemplateVehicle: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.idTemplateVehicle),
                    idOwner: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.idOwner),
                    VehicleTemplateVehicle: {
                        ...VehicleTemplateVehicle,
                        id: sharedHelpers.encryptIdDataBase(VehicleTemplateVehicle.id)
                    }
                },
                route: {
                    municipalityDepart: MunicipalityDepart.name, 
                    municipalityArrive: MunicipalityArrive.name
                }
            }
        } catch {
            req.body.travel = false;
        }
    },
    validateTravelId: async (id, req) => {
        try {
            const [{ id: idTravel, TravelDriverVehicle: { VehicleDriverVehicle, DriverDriverVehicle }, ...travel }] = await travelQuery.findTravels({ where: { id } });

            req.body.travelExist = {
                id: sharedHelpers.encryptIdDataBase(idTravel),
                ...travel,
                driver: {
                    id: sharedHelpers.encryptIdDataBase(DriverDriverVehicle.id),
                    ...DriverDriverVehicle,
                },
                vehicle: {
                    id: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.id),
                    ...VehicleDriverVehicle,
                }
            };
            req.body.idTravel = id;
        } catch {
            req.body.travelExist = false;
        }
    },
    validateTravelDriverVehicle: async (id, req) => {
        try {
            const vehiclesFound = await travelQuery.findTravels({
                where: { id },
                include: [
                    {
                        model: DriverVehicle,
                        as: 'TravelDriverVehicle',
                        attributes: [],
                        include: [
                            {
                                model: Vehicle,
                                as: 'VehicleDriverVehicle',
                                include: [
                                    {
                                        model: Municipality,
                                        as: 'VehicleMunicipality'
                                    }
                                ]
                            },
                            {
                                model: Driver,
                                as: 'DriverDriverVehicle',
                            },
                        ]
                    },
                ],
            });


            const {
                id: idTravel,
                TravelDriverVehicle: {
                    VehicleDriverVehicle: { id: idVehicle, ...vehicle },
                    DriverDriverVehicle: { id: idDriver, ...driver },
                },
                ...travel
            } = vehiclesFound[0];

            req.body.travelExist = {
                id: sharedHelpers.encryptIdDataBase(idTravel),
                ...travel,
                driver: {
                    id: sharedHelpers.encryptIdDataBase(idDriver),
                    ...driver,
                },
                vehicle: {
                    id: sharedHelpers.encryptIdDataBase(idVehicle),
                    ...vehicle,
                }
            };
            req.body.idTravel = id;
        } catch {
            req.body.travelExist = false;
        }
    },
    validateTravelExist: async(req, where, travel = 'travel') => {
        try {
            req.body[travel] = await travelQuery.findOneTravel({where});
        } catch {
            req.body[travel] = false;
        }
    }
}