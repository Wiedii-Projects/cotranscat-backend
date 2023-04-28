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
        check('idDriver', new ErrorModel(errorsConst.driver.driverNotExist))
            .custom((id, { req }) => driverValidator.validateDriver(req, { id })),
        sharedValidators.validateError,
        check('driver', new ErrorModel(errorsConst.driver.driverNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('vehicle')
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleRequired)).bail()
            .custom((id, { req }) => req.body.idVehicle = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleInvalid)),
        sharedValidators.validateError,
        check('idVehicle', new ErrorModel(errorsConst.vehicle.vehicleDoesNotExist))
            .custom((id, { req }) => vehicleValidator.validateVehicle(req, { where: { id } })),
        sharedValidators.validateError,
        check('vehicle', new ErrorModel(errorsConst.vehicle.vehicleDoesNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('route')
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleRequired)).bail()
            .custom((id, { req }) => req.body.idRoute = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleInvalid)),
        sharedValidators.validateError,
        check('idRoute', new ErrorModel(errorsConst.vehicle.vehicleDoesNotExist))
            .custom((id, { req }) => routeValidator.validateRoute(req, { where: { id } })),
        sharedValidators.validateError,
        check('route', new ErrorModel(errorsConst.vehicle.vehicleDoesNotExist))
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
        check('driver').optional()
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idDriverRequired)).bail()
            .custom((id, { req }) => req.body.idDriver = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idDriverInvalid)),
        sharedValidators.validateError,
        check('idDriver', new ErrorModel(errorsConst.driver.driverNotExist)).optional()
            .custom((id, { req }) => driverValidator.validateDriver(req, { id })),
        sharedValidators.validateError,
        check('driver', new ErrorModel(errorsConst.driver.driverNotExist)).optional()
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('vehicle').optional()
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleRequired)).bail()
            .custom((id, { req }) => req.body.idVehicle = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleInvalid)),
        sharedValidators.validateError,
        check('idVehicle', new ErrorModel(errorsConst.vehicle.vehicleDoesNotExist)).optional()
            .custom((id, { req }) => vehicleValidator.validateVehicle(req, { where: { id } })),
        sharedValidators.validateError,
        check('vehicle', new ErrorModel(errorsConst.vehicle.vehicleDoesNotExist)).optional()
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('route').optional({checkFalsy:false})
            .isString().withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleRequired)).bail()
            .custom((id, { req }) => req.body.idRoute = sharedHelpers.decryptIdDataBase(id)).withMessage(new ErrorModel(errorsConst.travelErrors.idVehicleInvalid)),
        sharedValidators.validateError,
        check('idRoute', new ErrorModel(errorsConst.vehicle.vehicleDoesNotExist)).optional({checkFalsy:false})
            .custom((id, { req }) => routeValidator.validateRoute(req, { where: { id } })),
        sharedValidators.validateError,
        check('route', new ErrorModel(errorsConst.vehicle.vehicleDoesNotExist)).optional({checkFalsy:false})
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('date', new ErrorModel(errorsConst.travelErrors.invalidDate)).optional()
            .isDate(),
        sharedValidators.validateError,
        check('time', new ErrorModel(errorsConst.travelErrors.invalidTime)).optional()
            .isTime({
                hourFormat: 'hour24',
                mode: 'withSeconds'
            }),
        sharedValidators.validateError,
    ]
}