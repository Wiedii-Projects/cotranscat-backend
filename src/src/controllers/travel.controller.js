// DB Connections
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');

// Helpers
const { responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { travelQuery, driverVehicleQuery } = require('../models/index.queries');


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
    }
}