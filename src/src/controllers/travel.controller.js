// Constants
const { errorsConst } = require('../constants/index.constants');

// DB Connections
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');

// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

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
                    price: vehicle.price
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
    }
}