// Constants
const { errorsConst } = require('../constants/index.constants');

// DB Connections
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');

// Helpers
const { responseHelpers, sharedHelpers } = require('../helpers/index.helpers');

// Libraries
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
require('dayjs/locale/es');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const localeData = require('dayjs/plugin/localeData');
dayjs.locale('es');

// Models - Queries
const { travelQuery, seatQuery, userQuery, vehicleQuery, invoiceQuery } = require('../models/index.queries');

module.exports = {
    createTravel: async (req, res) => {
        const { price, driverVehicle: { id: idDriverVehicle, idVehicle }, date, time, idRoute } = req.body;
        let transaction

        
        try {
            const vehicle = await vehicleQuery.findOneVehicleQuery({ where: { id: idVehicle } });
            transaction = await dbConnectionOptions.transaction();
            
            const [travel, isCreated] = await travelQuery.createTravel({
                idDriverVehicle, date, time, idRoute
            }, transaction);

            if (isCreated) {
                const vehicleSeatRules = await vehicleQuery.getSeatRulesByVehicle({ where: { id: idVehicle } });

                const seatRules = vehicleSeatRules?.VehicleTemplateVehicle?.SeatRulerTemplateVehicle

                if (!seatRules || seatRules.length === 0) throw errorsConst.seatRuler.vehicleHasNoAssignedSeats

                for (let indexSeatRule = 0; indexSeatRule < seatRules.length; indexSeatRule++) {
                    const seatRule = seatRules[indexSeatRule];
                    await seatQuery.createSeat({
                        idTravel: travel.id,
                        column: seatRule.column,
                        row: seatRule.row,
                        price: vehicle.price,
                        state: 0,
                        name: seatRule.name
                    }, transaction)
                }
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
            const [{ name, lastName}] = await userQuery.findUserQuery({ where: { id: sharedHelpers.decryptIdDataBase(id) } });
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
        const { decryptId: id, date, time, idDriverVehicleToCreate: idDriverVehicle, idRoute} = req.body;
        try {
            await travelQuery.updateTravel({date, time, idDriverVehicle, idRoute}, {id});
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

            const travelFoundDataCleaned = travelFound.map(({ id, TravelDriverVehicle: { VehicleDriverVehicle }, ...travel }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                ...travel,
                vehicle: {
                    ...VehicleDriverVehicle,
                    id: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.id)
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
    },
    getAllTravelsByRangeDate: async (req, res) => {
        try {
            const travels = await travelQuery.findTravels({
                where: {
                    date: {
                        [Op.between]: [req.query.initialDate, req.query.finalDate]
                    }
                }
            });
            const travelsFormatted = travels.map(({ id, date, time, TravelDriverVehicle: { VehicleDriverVehicle, DriverDriverVehicle } }) => ({
                travel: {
                    id: sharedHelpers.encryptIdDataBase(id),
                    date,
                    time
                },
                driver: {
                    id: sharedHelpers.encryptIdDataBase(DriverDriverVehicle.id),
                    name: DriverDriverVehicle.UserDriver.name,
                    lastName: DriverDriverVehicle.UserDriver.lastName
                },
                vehicle: {
                    id: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.id),
                    internalNumber: VehicleDriverVehicle.internalNumber,
                    plate: VehicleDriverVehicle.plate
                }
            }))
            
            dayjs.extend(localizedFormat);
            dayjs.extend(localeData);

            const hours = Array.from({ length: 16 }, (_, i) => i + 4);
            const days = dayjs.weekdays().map(day => day.charAt(0).toUpperCase() + day.slice(1));
        
            const transformedData = hours.map(hour => ({
                id: dayjs().hour(hour).minute(0).format('h:mm A'),
                nestedDroppables: days.map((day, index) => {
                    const travelData = travelsFormatted.find(item => {
                        const travelDate = dayjs(`${item.travel.date} ${item.travel.time}`);
                        return travelDate.day() === index && travelDate.hour() === hour;
                    });
        
                    return {
                        id: `${day} ${dayjs().hour(hour).minute(0).format('h:mm A')}`,
                        day,
                        items: travelData ? [
                            {
                                id: uuidv4(),
                                content: `${travelData.vehicle.internalNumber} - ${travelData.vehicle.plate}`,
                                name: `${travelData.driver.name} ${travelData.driver.lastName}`,
                                idTravel: travelData.travel.id,
                            },
                        ] : [],
                    };
                }),
            }));
        
            return responseHelpers.responseSuccess(res, transformedData);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getManifestTravelsByDate: async (req, res) => {
        const { date } = req.query
        
        try {
            const travelsFound = await travelQuery.findManifestTravels({
                where: {
                    date: {
                        [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`]
                    }
                }
            })

            const manifestTravels = travelsFound.map(
                ({
                    id, date, time, TravelSeat, TravelShipping,
                    TravelDriverVehicle: { VehicleDriverVehicle, DriverDriverVehicle }
                }) => ({
                    travel: {
                        id: sharedHelpers.encryptIdDataBase(id),
                        date,
                        time,
                        ticketsSales: TravelSeat.filter(({ TicketSeat }) => TicketSeat !== null).length,
                        totalSeat: TravelSeat.length,
                        totalShipping: TravelShipping.length
                    },
                    driver: {
                        id: sharedHelpers.encryptIdDataBase(DriverDriverVehicle.id),
                        name: DriverDriverVehicle.UserDriver.name,
                        lastName: DriverDriverVehicle.UserDriver.lastName
                    },
                    vehicle: {
                        id: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.id),
                        internalNumber: VehicleDriverVehicle.internalNumber,
                        plate: VehicleDriverVehicle.plate
                    }
                }))

            return responseHelpers.responseSuccess(res, manifestTravels);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}