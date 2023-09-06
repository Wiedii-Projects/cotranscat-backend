// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');
const dayjs = require('dayjs');

// Check - middleware

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Validators - middleware
const { 
    sharedValidators, driverValidator, vehicleValidator, travelValidator, routeValidator, 
    driverVehicleValidators
} = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateTravel: () => [
        check('idDriverVehicle')
            .isString()
            .withMessage(new ErrorModel(errorsConst.travelErrors.idDriverVehicleRequired))
            .bail()
            .custom((id, { req }) => req.body.idDriverVehicleToCreate = sharedHelpers.decryptIdDataBase(id))
            .withMessage(new ErrorModel(errorsConst.travelErrors.idDriverVehicleInvalid)),
            sharedValidators.validateError,
        check('idDriverVehicleToCreate', new ErrorModel(errorsConst.travelErrors.driverVehicleNotExist))
            .custom((id, { req }) => driverVehicleValidators.validateDriverVehicle(req, { id }))
            .custom((_, { req }) => req.body.driverVehicle ? true : false ),
        sharedValidators.validateError,
        check('route')
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idRouteRequired)).bail()
            .custom((id, { req }) => req.body.idRoute = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idRouteInvalid)),
        sharedValidators.validateError,
        check('idRoute', new ErrorModel(errorsConst.travelErrors.routeDoesNotExist))
            .custom((id, { req }) => routeValidator.validateRoute(req, { where: { id } })),
        sharedValidators.validateError,
        check('route', new ErrorModel(errorsConst.travelErrors.routeDoesNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('date', new ErrorModel(errorsConst.travelErrors.invalidDate))
            .isDate(),
        sharedValidators.validateError,
        check('time', new ErrorModel(errorsConst.travelErrors.invalidTime))
            .isTime({
                hourFormat: 'hour24',
                mode: 'withSeconds'
            }),
        sharedValidators.validateError,
    ],

    checkGetDriverVehicleTravel: () => [
        check('travel')
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idTravelInvalid)).bail()
            .custom((value, {req}) => travelValidator.validateTravelDriverVehicle(sharedHelpers.decryptIdDataBase(value), req))
            .custom((_, {req}) => !!req.body.travelExist).withMessage(new ErrorModel(errorsConst.travelErrors.travelDoesNotExist)),
        sharedValidators.validateError,
    ],

    checkTravelExist: () => [
        // TODO: validate role,
        check('decryptId', new ErrorModel(errorsConst.travelErrors.idTravelInvalid))
            .custom((id, { req }) => travelValidator.validateTravel(req, { id })),
        sharedValidators.validateError,
        check('travel', new ErrorModel(errorsConst.travelErrors.travelDoesNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
    ],

    checkUpdateTravel: () => [
        // TODO: validate role,
        check('idDriverVehicle')
            .optional({ checkFalsy: false })
            .isString()
            .withMessage(new ErrorModel(errorsConst.travelErrors.idDriverVehicleRequired))
            .bail()
            .custom((id, { req }) => req.body.idDriverVehicleToCreate = sharedHelpers.decryptIdDataBase(id))
            .withMessage(new ErrorModel(errorsConst.travelErrors.idDriverVehicleInvalid)),
        sharedValidators.validateError,
        check('idDriverVehicleToCreate', new ErrorModel(errorsConst.travelErrors.driverVehicleNotExist))
            .optional({ checkFalsy: false })
            .custom((id, { req }) => driverVehicleValidators.validateDriverVehicle(req, { id }))
            .custom((_, { req }) => req.body.driverVehicle ? true : false),
        sharedValidators.validateError,
        check('route').optional({ checkFalsy: false })
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idRouteRequired)).bail()
            .custom((id, { req }) => req.body.idRoute = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idRouteInvalid)),
        sharedValidators.validateError,
        check('idRoute', new ErrorModel(errorsConst.travelErrors.routeDoesNotExist)).optional({ checkFalsy: false })
            .custom((id, { req }) => routeValidator.validateRoute(req, { where: { id } })),
        sharedValidators.validateError,
        check('route', new ErrorModel(errorsConst.travelErrors.routeDoesNotExist)).optional({ checkFalsy: false })
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('date', new ErrorModel(errorsConst.travelErrors.invalidDate)).optional({ checkFalsy: false })
            .isDate(),
        sharedValidators.validateError,
        check('time', new ErrorModel(errorsConst.travelErrors.invalidTime)).optional({ checkFalsy: false })
            .isTime({
                hourFormat: 'hour24',
                mode: 'withSeconds'
            }),
        sharedValidators.validateError,
    ],
    checkVehiclesAvailableToTravel: () => [
        check('route')
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idRouteRequired)).bail()
            .custom((id, { req }) => req.body.idRoute = sharedHelpers.decryptIdDataBase(id))
            .withMessage(new ErrorModel(errorsConst.travelErrors.idRouteInvalid)),
        sharedValidators.validateError,
        check('idRoute', new ErrorModel(errorsConst.travelErrors.routeDoesNotExist))
            .custom((id, { req }) => routeValidator.validateRoute(req, { where: { id } })),
        sharedValidators.validateError,
        check('route', new ErrorModel(errorsConst.travelErrors.routeDoesNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('date')
            .notEmpty()
            .withMessage(new ErrorModel(errorsConst.travelErrors.dateRequired))
            .bail(),
        sharedValidators.validateError,
        check('date')
            .isDate()
            .withMessage(new ErrorModel(errorsConst.travelErrors.invalidDate)),
        check('time')
            .notEmpty()
            .withMessage(new ErrorModel(errorsConst.travelErrors.hourRequired))
            .bail(),
        sharedValidators.validateError,
        check('time')
            .matches(/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
            .withMessage(new ErrorModel(errorsConst.travelErrors.invalidTime))
            .bail(),
        sharedValidators.validateError
    ],
    checkRangeDate: () => [
        // TODO: validate role,
            check('initialDate')
            .custom((value) => {
                if (typeof value !== 'string')
                    throw new ErrorModel(errorsConst.travelErrors.initialDateTravelRequired)
                return true;
            })
            .bail()
            .isDate()
            .withMessage(new ErrorModel(errorsConst.travelErrors.initialDateTravelInvalid))
            .bail(),
        sharedValidators.validateError,
        check('finalDate')
        .custom((value) => {
            if (typeof value !== 'string')
                throw new ErrorModel(errorsConst.travelErrors.finalDateTravelRequired)
            return true;
        })
        .bail()
        .isDate()
        .withMessage(new ErrorModel(errorsConst.travelErrors.finalDateTravelInvalid))
        .bail()
        .custom((value, { req }) => {
            if (dayjs(req.query.initialDate).isAfter(value)) 
                throw new ErrorModel(errorsConst.travelErrors.rangeTravelInvalid)
            return true;
        })
        .bail(),
    sharedValidators.validateError
    ],
    checkTravelByDate: () => [
        // TODO: validate role,
        check('date')
            .custom((value) => {
                if (typeof value !== 'string')
                    throw new ErrorModel(errorsConst.travelErrors.dateTravelRequired)
                return true;
            })
            .bail()
            .isDate()
            .withMessage(new ErrorModel(errorsConst.travelErrors.dateTravelInvalid))
            .bail(),
        sharedValidators.validateError
    ]
}