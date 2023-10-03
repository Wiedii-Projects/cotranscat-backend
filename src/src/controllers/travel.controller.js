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
const { travelQuery, seatQuery, userQuery, vehicleQuery, seatRulerQuery } = require('../models/index.queries');

module.exports = {
    createTravel: async (req, res) => {
        const { driverVehicle: { id: idDriverVehicle, idVehicle }, date, time, idRoute } = req.body;
        let transaction

        
        try {
            transaction = await dbConnectionOptions.transaction();
            
            const [travel, isCreated] = await travelQuery.createTravel({
                idDriverVehicle, date, time, idRoute
            }, transaction);

            if (!isCreated) {
                const { idTemplateVehicle, price } = await vehicleQuery.findOneVehicleQuery({ where: { id: idVehicle }})
                const seatRules = await seatRulerQuery.getSeatRulers({ where: { idTemplateVehicle } })
                for (let indexSeatRule = 0; indexSeatRule < seatRules.length; indexSeatRule++) {
                    const seatRule = seatRules[indexSeatRule];
                    await seatQuery.createSeat({
                        idTravel: travel.id,
                        column: seatRule.column,
                        row: seatRule.row,
                        price: price,
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

            const travelFoundDataCleaned = travelFound.map(({ id, TravelDriverVehicle: { VehicleDriverVehicle: { VehicleTemplateVehicle, ...VehicleDriverVehicle } }, ...travel }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                ...travel,
                vehicle: {
                    ...VehicleDriverVehicle,
                    width: VehicleTemplateVehicle.width,
                    height: VehicleTemplateVehicle.height,
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
                    [Op.and]: [
                        { manifestNumber: "" },
                        { date: { [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`] } }
                    ]
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
    },
    countGetAllManifestTravels: async (req, res) => {
        const { valueFilter = "" } = req.query;
        try {
            const filterTravelByValue = [];
            filterTravelByValue.push(...[ { manifestNumber: { [Op.like]: `%${valueFilter}%` }, },  { '$TravelDriverVehicle.VehicleDriverVehicle.plate$': { [Op.like]: `%${valueFilter}%` } } ]);
            if(valueFilter instanceof Date) filterTravelByValue.push({ date: { [Op.like]: `%${valueFilter}%` } })
            const travelsFound = await travelQuery.findManifestTravelsPaginator({ where: { [Op.or]:  filterTravelByValue }});
            return responseHelpers.responseSuccess(res, travelsFound.length );
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getAllManifestTravels: async (req, res) => {
        const { offset: pagination = 0, valueFilter = "" } = req.query;
        try {
            const offset = pagination * 5;
            const filterTravelByValue = [];
            filterTravelByValue.push(...[{ manifestNumber: { [Op.like]: `%${valueFilter}%` }, }, { '$TravelDriverVehicle.VehicleDriverVehicle.plate$': { [Op.like]: `%${valueFilter}%` } }]);
            const date = new Date(valueFilter)
            if (!isNaN(date) && date instanceof Date) filterTravelByValue.push({ date: date })
            const travelsFound = await travelQuery.findManifestTravelsPaginator({
                offset, where: {
                    [Op.and]: [
                        { manifestNumber: { [Op.not]: "" } },
                        { [Op.or]: filterTravelByValue }
                    ]
                }, limit: 5
            });
            const manifestTravels = travelsFound.map(
                ({
                    id, date, time, manifestNumber,
                    TravelDriverVehicle: { VehicleDriverVehicle, DriverDriverVehicle },
                    TravelRoute: { id: idRoute, MunicipalityDepart: { name: nameMunicipalityDepart }, MunicipalityArrive: { name: nameMunicipalityArrive } }
                }) => ({
                    travel: { id: sharedHelpers.encryptIdDataBase(id), date, time, manifestNumber },
                    driver: { id: sharedHelpers.encryptIdDataBase(DriverDriverVehicle.id), name: DriverDriverVehicle.UserDriver.name, lastName: DriverDriverVehicle.UserDriver.lastName },
                    vehicle: { id: sharedHelpers.encryptIdDataBase(VehicleDriverVehicle.id), internalNumber: VehicleDriverVehicle.internalNumber, plate: VehicleDriverVehicle.plate },
                    route: { id: sharedHelpers.encryptIdDataBase(idRoute), name: `${nameMunicipalityDepart} - ${nameMunicipalityArrive}` }
                }))

            return responseHelpers.responseSuccess(res, manifestTravels);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}