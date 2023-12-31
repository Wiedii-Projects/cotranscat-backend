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
    sharedValidators, travelValidator, routeValidator,
    driverVehicleValidators,
    vehicleValidator
} = require('../index.validators.middleware');
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateTravel: () => [
        ...sharedCheckMiddleware.checkJwt(),
        sharedValidators.validateError,
        check('idDriverVehicle')
            .isString()
            .withMessage(new ErrorModel(errorsConst.travelErrors.idDriverVehicleRequired))
            .bail()
            .custom((id, { req }) => req.body.idDriverVehicleToCreate = sharedHelpers.decryptIdDataBase(id))
            .withMessage(new ErrorModel(errorsConst.travelErrors.idDriverVehicleInvalid)),
        sharedValidators.validateError,
        check('idDriverVehicleToCreate', new ErrorModel(errorsConst.travelErrors.driverVehicleNotExist))
            .custom((id, { req }) => driverVehicleValidators.validateDriverVehicle(req, { id }))
            .custom((_, { req }) => req.body.driverVehicle ? true : false),
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
        sharedValidators.validateError
    ],

    checkGetDriverVehicleTravel: () => [
        check('travel')
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idTravelInvalid)).bail()
            .custom((value, { req }) => travelValidator.validateTravelDriverVehicle(sharedHelpers.decryptIdDataBase(value), req))
            .custom((_, { req }) => !!req.body.travelExist).withMessage(new ErrorModel(errorsConst.travelErrors.travelDoesNotExist)),
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
    ],
    checkCreateManifestNumber: () => [
        // TODO: validate role,
        ...sharedCheckMiddleware.checkJwt(),
        sharedValidators.validateError,
        check('decryptId', new ErrorModel(errorsConst.travelErrors.idTravelInvalid))
            .custom((id, { req }) => travelValidator.validateTravel(req, { id })),
        sharedValidators.validateError,
        check('travel', new ErrorModel(errorsConst.travelErrors.travelDoesNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('idDriverVehicle').custom(async (value, { req }) => await driverVehicleValidators.validateIfItIsADefaultDriver(req, { id: sharedHelpers.decryptIdDataBase(value) })),
        sharedValidators.validateError,
        check('driverVehicle', new ErrorModel(errorsConst.travelErrors.invalidDriverToTheManifest))
            .custom((value) => value ? false : true),
        sharedValidators.validateError
    ],
    checkListVehicleAvailableToTravel: () => [
        // TODO: validate role,
        check('decryptId', new ErrorModel(errorsConst.travelErrors.idTravelInvalid))
            .custom((id, { req }) => travelValidator.validateTravelExist(req, { id })),
        sharedValidators.validateError,
        check('travel', new ErrorModel(errorsConst.travelErrors.travelDoesNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
    ],
    checkAssignTravelAnotherVehicle: () => [
        // TODO: validate role,
        check('decryptId', new ErrorModel(errorsConst.travelErrors.idTravelInvalid))
            .custom((id, { req }) => travelValidator.validateTravelExist(req, { id })),
        sharedValidators.validateError,
        check('travel', new ErrorModel(errorsConst.travelErrors.travelDoesNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('idTravel', new ErrorModel(errorsConst.travelErrors.idTravelInvalid))
            .custom((id, { req }) => travelValidator.validateTravelExist(req, { id: sharedHelpers.decryptIdDataBase(id) }, 'travelAssigned')),
        sharedValidators.validateError,
        check('travelAssigned', new ErrorModel(errorsConst.travelErrors.travelAssignedDoesNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('travelAssigned', new ErrorModel(errorsConst.travelErrors.dateDifferentCurrentTravel))
            .custom((value, {req}) => !(value.date!==req.body.travel.date)),
        sharedValidators.validateError,
        check('travelAssigned', new ErrorModel(errorsConst.travelErrors.timeDifferentCurrentTravel))
            .custom((value, {req}) => !!(value.time>=req.body.travel.time)),
        sharedValidators.validateError,
        check('travelAssigned', new ErrorModel(errorsConst.travelErrors.routeDifferentCurrentTravel))
            .custom((value, {req}) => !!(value.idRoute===req.body.travel.idRoute)),
        sharedValidators.validateError,
        check('observation').optional({ checkFalsy: false })
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.observationRequired)).bail()
            .isLength({ min: 1, max: 255 }).withMessage(new ErrorModel(errorsConst.travelErrors.observationExceededAllowedLimiter)),
        sharedValidators.validateError
    ],
    checkCreateByIdVehicleTravel: () => [
        ...sharedCheckMiddleware.checkJwt(),
        sharedValidators.validateError,
        check('idVehicle').custom(async (value, { req }) => await vehicleValidator.validateVehicle(req, { where: { id: sharedHelpers.decryptIdDataBase(value) } })),
        sharedValidators.validateError,
        check('vehicle', new ErrorModel(errorsConst.vehicleErrors.vehicleDoesNotExist))
            .custom((value) => value),
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
    checkManifestTravelById: () => [
        ...sharedCheckMiddleware.checkJwt(),
        check('id', new ErrorModel(errorsConst.travelErrors.idTravelInvalid))
            .custom((value, { req }) => travelValidator.validateTravelExist(req, { id: sharedHelpers.decryptIdDataBase(value) }))
            .custom((value, { req }) => !!req.body.travel)
            .withMessage(new ErrorModel(errorsConst.travelErrors.travelDoesNotExist)),
        sharedValidators.validateError
    ]
}