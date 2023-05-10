// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Check - middleware

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Validators - middleware
const { sharedValidators, driverValidator, vehicleValidator, travelValidator, routeValidator } = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateTravel: () => [
        check('driver')
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idDriverRequired)).bail()
            .custom((id, { req }) => req.body.idDriver = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idDriverInvalid)),
        sharedValidators.validateError,
        check('idDriver', new ErrorModel(errorsConst.travelErrors.driverNotExist))
            .custom((id, { req }) => driverValidator.validateDriver(req, { id })),
        sharedValidators.validateError,
        check('driver', new ErrorModel(errorsConst.travelErrors.driverNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('vehicle')
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleRequired)).bail()
            .custom((id, { req }) => req.body.idVehicle = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleInvalid)),
        sharedValidators.validateError,
        check('idVehicle', new ErrorModel(errorsConst.travelErrors.vehicleDoesNotExist))
            .custom((id, { req }) => vehicleValidator.validateVehicle(req, { where: { id } })),
        sharedValidators.validateError,
        check('vehicle', new ErrorModel(errorsConst.travelErrors.vehicleDoesNotExist))
            .custom((value) => !!value),
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
        check('driver').optional({ checkFalsy: false })
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idDriverRequired)).bail()
            .custom((id, { req }) => req.body.idDriver = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idDriverInvalid)),
        sharedValidators.validateError,
        check('idDriver', new ErrorModel(errorsConst.travelErrors.driverNotExist)).optional({ checkFalsy: false })
            .custom((id, { req }) => driverValidator.validateDriver(req, { id })),
        sharedValidators.validateError,
        check('driver', new ErrorModel(errorsConst.travelErrors.driverNotExist)).optional({ checkFalsy: false })
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('vehicle').optional({ checkFalsy: false })
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleRequired)).bail()
            .custom((id, { req }) => req.body.idVehicle = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleInvalid)),
        sharedValidators.validateError,
        check('idVehicle', new ErrorModel(errorsConst.travelErrors.vehicleDoesNotExist)).optional({ checkFalsy: false })
            .custom((id, { req }) => vehicleValidator.validateVehicle(req, { where: { id } })),
        sharedValidators.validateError,
        check('vehicle', new ErrorModel(errorsConst.travelErrors.vehicleDoesNotExist)).optional({ checkFalsy: false })
            .custom((value) => !!value),
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
            .custom((id, { req }) => req.body.idRoute = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idRouteInvalid)),
        sharedValidators.validateError,
        check('idRoute', new ErrorModel(errorsConst.travelErrors.routeDoesNotExist))
            .custom((id, { req }) => routeValidator.validateRoute(req, { where: { id } })),
        sharedValidators.validateError,
        check('route', new ErrorModel(errorsConst.travelErrors.routeDoesNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('date')
            .notEmpty().withMessage(new ErrorModel(errorsConst.travelErrors.dateRequired)).bail(),
        sharedValidators.validateError,
        check('date')
            .isDate().withMessage(new ErrorModel(errorsConst.travelErrors.invalidDate)),
        check('time')
            .notEmpty().withMessage(new ErrorModel(errorsConst.travelErrors.hourRequired)).bail(),
        sharedValidators.validateError,
        check('time')
            .matches(/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).withMessage(new ErrorModel(errorsConst.travelErrors.invalidTime)),
        sharedValidators.validateError
    ]
}