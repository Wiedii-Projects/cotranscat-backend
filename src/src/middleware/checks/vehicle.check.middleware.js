// Constants
const { errorsConst } = require('../../constants/index.constants');

// Middleware
//TODO: implement validation of the coordinator role
// const sharedMiddleware = require('./shared.check.middleware') 

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - middleware
const { municipalityValidators, vehicleValidator } = require('../index.validators.middleware');

//Helpers
const { sharedHelpers } = require('../../helpers/index.helpers');

module.exports = {
    checkCreateVehicle: () => ([
        //TODO: implement validation of the coordinator role
        check('plate')
            .isString().notEmpty().withMessage(new ErrorModel(errorsConst.vehicle.plateRequired))
            .isLength({ min: 4, max: 6 }).withMessage(new ErrorModel(errorsConst.vehicle.plateInvalid))
            .custom(async (value, { req }) => await vehicleValidator.validateVehicle(req, { where: { plate: value } })),
        check('vehicle', new ErrorModel(errorsConst.vehicle.plateAlreadyExists))
            .custom((value) => !value),
        check('municipality')
            .exists().isString().notEmpty()
            .withMessage(new ErrorModel(errorsConst.vehicle.municipalityRequired))
            .custom(async (value, { req }) => await municipalityValidators.validateMunicipality(req, { where: { id: sharedHelpers.decryptIdDataBase(value) } })),
        check('idMunicipality', new ErrorModel(errorsConst.vehicle.municipalityDoesNotExist))
            .custom((value) => !!value),
        check('mark', new ErrorModel(errorsConst.vehicle.markRequired)).exists().isString().notEmpty(),
        check('model', new ErrorModel(errorsConst.vehicle.modelRequired)).exists().isString().notEmpty(),
        check('price')
            .exists().notEmpty().withMessage(new ErrorModel(errorsConst.vehicle.priceRequired))
            .isDecimal({ decimal_digits: '0,2' }).withMessage(new ErrorModel(errorsConst.vehicle.priceInvalid)),
        check('seatingMatrix')
            .isArray().withMessage(new ErrorModel(errorsConst.vehicle.seatingMatrixRequired))
            .custom((value) => value?.length > 3).withMessage(new ErrorModel(errorsConst.vehicle.heightInvalid))
            .custom(([value]) => value?.length > 2).withMessage(new ErrorModel(errorsConst.vehicle.widthInvalid))
    ]),
    checkGetVehicle: () => ([
        //TODO: implement validation of the seller role
        check('id').custom(async (value, { req }) => await vehicleValidator.validateVehicle(req, { where: { id:  sharedHelpers.decryptIdDataBase(value) } })),
        check('vehicle', new ErrorModel(errorsConst.vehicle.vehicleDoesNotExist)).custom((value) => value)
    ])
}