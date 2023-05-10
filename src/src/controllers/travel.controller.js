// Constants
const { errorsConst } = require('../constants/index.constants');

// DB Connections
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');

// Helpers
const { responseHelpers, sharedHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { travelQuery, driverVehicleQuery, seatRulerQuery, seatQuery } = require('../models/index.queries');


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
                    state: 0
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
            const travels = await travelQuery.findTravels()
            return responseHelpers.responseSuccess(res, travels);
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
        const { date, time } = req.body;
        try {

            let vehiclesAvailable = []
            const travelFound = await travelQuery.findTravels({ date, time, idRoute: 1 });

            for (let indexTravelFound = 0; indexTravelFound < travelFound.length; indexTravelFound++) {
                const travel = travelFound[indexTravelFound];

                const responseSeat = await seatQuery.findSeat({
                    where: { idTravel: sharedHelpers.decryptIdDataBase(travel.id), state: 0 },
                    include: []
                })

                const cleanSeatAvailableDataResponse = responseSeat.map(({ id, ...seat }) => ({
                    id: sharedHelpers.encryptIdDataBase(id),
                    ...seat
                }))
                const { vehicle } = travel

                vehiclesAvailable.push(
                    {
                        vehicle: {
                            id: vehicle.id,
                            plate: vehicle.plate,
                            mark: vehicle.mark,
                            model: vehicle.model
                        },
                        totalSeatsAvailable: cleanSeatAvailableDataResponse.length,
                        travel: travel.id
                    })
                return responseHelpers.responseSuccess(res, vehiclesAvailable);
            }
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}