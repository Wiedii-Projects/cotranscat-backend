// Constants
const { errorsConst } = require("../constants/index.constants");

// Helpers
const { responseHelpers } = require('../helpers/index.helpers');
const { decryptIdDataBase } = require("../helpers/shared.helpers");

// Models - Queries
const { vehicleQuery, seatRulerQuery } = require('../models/index.queries');
const { Op } = require("sequelize");

module.exports = {
    createVehicle: async (req, res) => {
        const { vehicle, municipality, typeVehicle, typeFuel, typeBodywork, templateVehicle, owner, ...newVehicle } = req.body;
        try {
            await vehicleQuery.createVehicle(newVehicle);
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getVehicle: async (req, res) => {
        const [{ id }, { vehicle }] = [req.params, req.body]
        try {
            const vehicleSeatRules = await seatRulerQuery.getSeatRulers({ where: { idVehicle: decryptIdDataBase(id) } });

            if (vehicleSeatRules.length === 0) throw errorsConst.seatRuler.vehicleHasNoAssignedSeats

            const { width, height, price, ...vehicleData } = vehicle
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
    },
    filterVehicle: async (req, res) => {
        const { value } = req.params;
        try {
            const [vehicle] = await vehicleQuery.findVehicles({
                where: {
                    [Op.or]: [
                        { "code": value },
                        { "plate": value },
                        { "internalNumber": value }
                    ],
                }
            });
            return responseHelpers.responseSuccess(res, vehicle);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    findVehiclesByStateTravel: async (req, res) => {
        const { valueFilter= '' } = req.query;

        try {
            const vehicles = await vehicleQuery.findVehiclesByStateTravel({
                where: {
                    [Op.or]: [
                        { internalNumber: { [Op.like]: `%${valueFilter}%` } },
                        { plate: { [Op.like]: `%${valueFilter}%` } },
                        { code: { [Op.like]: `%${valueFilter}%` } }
                    ]
                },
            });
            return responseHelpers.responseSuccess(res, vehicles);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    findAllVehiclesAvailableToTravel: async (req, res) => {
        const { valueFilter = '' } = req.query;
        try {
            const vehicles = await vehicleQuery.findAllAvailableVehiclesAndDriverVehicleQuery({
                where: {
                    [Op.or]: [
                        {
                            internalNumber: {
                                [Op.like]: `%${valueFilter}%`
                            }
                        },
                        {
                            plate: {
                                [Op.like]: `%${valueFilter}%`
                            }
                        }
                    ],
                    isMaintenance: 0
                }
            });
            return responseHelpers.responseSuccess(res, vehicles);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}