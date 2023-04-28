// DB Connections
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');

// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { travelQuery, driverVehicleQuery, driverQuery } = require('../models/index.queries');


module.exports = {
    createTravel: async (req, res) => {
        const { idDriver, idVehicle, date, time } = req.body;
        let transaction;
        try {
            transaction = await dbConnectionOptions.transaction();

            const [driverVehicle] = await driverVehicleQuery.createDriverVehicle({ idDriver, idVehicle }, transaction)
            
            await travelQuery.createTravel({
                idDriverVehicle: driverVehicle.id,
                date,
                time,
                //TODO: route id
            }, transaction);

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
        const { decryptId: id, date, time, idDriver, idVehicle} = req.body;
        try {
            await travelQuery.updateTravel({date, time, idDriver, idVehicle}, {id});
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