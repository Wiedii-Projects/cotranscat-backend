// Constants
const { errorsConst } = require('../constants/index.constants');

// DB Connections
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');

// Helpers
const { responseHelpers, sharedHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { travelQuery, driverVehicleQuery, seatRulerQuery, seatQuery, userQuery } = require('../models/index.queries');

module.exports = {
    createTravel: async (req, res) => {
        const { idDriver, idVehicle, date, time, idRoute, vehicle } = req.body;
        let transaction;
        try {
            transaction = await dbConnectionOptions.transaction();
            const [driverVehicle] = await driverVehicleQuery.createDriverVehicle({ idDriver, idVehicle }, transaction)
            
            const [travel] = await travelQuery.createTravel({
                idDriverVehicle: driverVehicle.id, date, time, idRoute
            }, transaction);

            const vehicleSeatRules = await seatRulerQuery.getSeatRulers({ where: { idVehicle: idVehicle } });

            if (vehicleSeatRules.length === 0) throw errorsConst.seatRuler.vehicleHasNoAssignedSeats

            for (let indexSeatRule = 0; indexSeatRule < vehicleSeatRules.length; indexSeatRule++) {
                const seatRule = vehicleSeatRules[indexSeatRule];
                await seatQuery.createSeat({
                    idTravel: travel.id,
                    column: seatRule.column,
                    row: seatRule.row,
                    price: vehicle.price,
                    state: 0,
                    name: seatRule.name
                }, transaction)
            }

            await transaction.commit();
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getAllTravels: async(req, res) => {
        try {
            const travels = await travelQuery.findTravels();
            const travel = travels.map(({ id, TravelDriverVehicle: { Vehicle, Driver }, ...travel }) => ({
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
            return responseHelpers.responseSuccess(res, travel);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getDriverVehicleTravel: async(req, res) => {
    
        const { travelExist: { driver: { id }, vehicle: { VehicleMunicipality, plate }}, } = req.body;

        try {
            const [{ name, lastName}] = await userQuery.findUserQuery({ where: { id } });
            return responseHelpers.responseSuccess(res, {
                driver: {
                    name: name,
                    lastName: lastName
                },
                vehicle: {
                    plate: plate,
                    municipality: VehicleMunicipality.name
                }
            });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getTravel: async(req, res) => {
        const { travel } = req.body;
        try {
            return responseHelpers.responseSuccess(res, travel);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    updateTravel: async(req, res) => {
        const { decryptId: id, date, time, idDriver, idVehicle, idRoute} = req.body;
        try {
            await travelQuery.updateTravel({date, time, idDriver, idVehicle, idRoute}, {id});
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    deleteTravel: async(req, res) => {
        const { decryptId: id } = req.body;
        try {
            await travelQuery.deleteTravel({id});
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getVehiclesAvailableToTravel: async (req, res) => {
        const { date, time } = req.query
        const { route } = req.body
        
        try {

            let vehiclesAvailable = []
            const travelFound = await travelQuery.findTravels({ where: { date, time, idRoute: sharedHelpers.decryptIdDataBase(route.id) } });

            const travelFoundDataCleaned = travelFound.map(({ id, TravelDriverVehicle: { Vehicle }, ...travel }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                ...travel,
                vehicle: {
                    ...Vehicle,
                    id: sharedHelpers.encryptIdDataBase(Vehicle.id)
                }
            }))

            for (let indexTravelFound = 0; indexTravelFound < travelFoundDataCleaned.length; indexTravelFound++) {
                const travel = travelFoundDataCleaned[indexTravelFound];

                const responseSeat = await seatQuery.findSeat({
                    where: { idTravel: sharedHelpers.decryptIdDataBase(travel.id), state: 0 },
                    include: []
                })

                const { vehicle } = travel

                vehiclesAvailable.push(
                    {
                        vehicle: {
                            id: vehicle.id,
                            plate: vehicle.plate,
                            mark: vehicle.mark,
                            model: vehicle.model,
                            width: vehicle.width,
                            height: vehicle.height
                        },
                        totalSeatsAvailable: responseSeat.length,
                        travel: travel.id
                    })
                return responseHelpers.responseSuccess(res, vehiclesAvailable);
            }
            return responseHelpers.responseSuccess(res, []);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}