// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { Op } = require('sequelize');

// Models
const { DriverVehicle, StateVehicle, Driver } = require("../index.models");

module.exports = {
    createDriverVehicle: async (where, transaction) => {
        try {
            return await DriverVehicle.findOrCreate({where, transaction,})
        } catch {
            throw errorsConst.driverVehicleErrors.queryErrors.createError
        }
    },
    findOneDriverVehicleQuery: async (query) => {
        const { where } = query;
        return await DriverVehicle.findOne({ where, raw: true, nest: true })
    },
    findOneDriverVehicleByStateQuery: async (query, state) => {
        try {
            const { where } = query;
            return await DriverVehicle.findOne({ 
                where, 
                include: [
                    {
                        model: StateVehicle,
                        as: "DriverVehicleStateVehicle",
                        where: {
                            [Op.or]: [
                                ...state
                            ]
                        },
                    }
                ],
                raw: true, 
                nest: true 
            })
        } catch (error) {
            throw errorsConst.driverVehicleErrors.queryErrors.findOneDriverVehicleByStateQuery
        }
    },
    findDefaultDriverQuery: async (query) => {
        try {
            const { where } = query;
            return await DriverVehicle.findOne({
                where,
                raw: true,
                nest: true,
                include: [
                    {
                        model: Driver,
                        as: "DriverDriverVehicle",
                        where: {
                            isDriverDefault: true
                        }
                    }
                ]
            })
        } catch {
            throw errorsConst.driverVehicleErrors.queryErrors.findDefaultDriverQuery
        }
    }
}