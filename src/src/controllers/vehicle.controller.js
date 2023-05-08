// Constants
const { errorsConst } = require("../constants/index.constants");

// DB Connections
const { dbConnectionOptions } = require("../constants/core/core-configurations.const");

// Helpers
const { responseHelpers } = require('../helpers/index.helpers');
const { decryptIdDataBase } = require("../helpers/shared.helpers");

// Models - Queries
const { vehicleQuery, seatRulerQuery } = require('../models/index.queries');

module.exports = {
    createVehicle: async (req, res) => {
        const { vehicle, municipality, seatingMatrix, ...newVehicle } = req.body;
        let transaction;
        try {
            transaction = await dbConnectionOptions.transaction();

            const vehicle = await vehicleQuery.createVehicle({
                width: seatingMatrix[0].length,
                height: seatingMatrix.length,
                ...newVehicle
            }, { transaction });

            for (let row = 0; row < seatingMatrix.length; row++) {
                for (let column = 0; column < seatingMatrix[row].length; column++) {
                    if (seatingMatrix[row][column]) {
                        await seatRulerQuery.createSeatRuler({
                            idVehicle: vehicle.id,
                            name: `${row}${column}`,//TODO: implement naming algorithm
                            row,
                            column
                        }, { transaction });
                    }
                }
            }
            await transaction.commit();
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getVehicle: async (req, res) => {
        const [{ id }, { vehicle }] = [req.params, req.body]
        try {
            const vehicleSeatRules = await seatRulerQuery.getSeatRulers({ where: { idVehicle: decryptIdDataBase(id) } });
            
            if (vehicleSeatRules.length === 0) throw errorsConst.seatRuler.vehicleHasNoAssignedSeats

            const { width, height, price,...vehicleData } = vehicle
            const seatMap = new Array(height);
            for (let i = 0; i < height; i++) {
                seatMap[i] = new Array(width).fill(null);
            }

            for (const { row, column, ...seat } of vehicleSeatRules) {
                seatMap[row][column] = { ...seat, price };
            }
            return responseHelpers.responseSuccess(res, { ...vehicleData, seatMap });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}