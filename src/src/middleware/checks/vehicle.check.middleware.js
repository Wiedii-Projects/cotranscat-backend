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
            .isString().withMessage(new ErrorModel(errorsConst.vehicleErrors.plateRequired)).bail()
            .isLength({ min: 4, max: 6 }).withMessage(new ErrorModel(errorsConst.vehicleErrors.lengthPlate)).bail()
            .custom(async (value, { req }) => await vehicleValidator.validateVehicle(req, { where: { plate: value } })),
        check('vehicle', new ErrorModel(errorsConst.vehicleErrors.plateAlreadyExists))
            .custom((value) => !value),
        check('municipality')
            .isString().withMessage(new ErrorModel(errorsConst.vehicleErrors.municipalityRequired)).bail()
            .custom(async (value, { req }) => await municipalityValidators.validateMunicipality(req, { where: { id: sharedHelpers.decryptIdDataBase(value) } })),
        check('idMunicipality', new ErrorModel(errorsConst.municipalityErrors.municipalityDoesNotExist))
            .custom((value) => !!value),
        check('mark', new ErrorModel(errorsConst.vehicleErrors.markRequired)).isString(),
        check('model', new ErrorModel(errorsConst.vehicleErrors.modelRequired)).isString(),
        check('price')
            .exists().notEmpty().withMessage(new ErrorModel(errorsConst.vehicleErrors.priceRequired)).bail()
            .isDecimal({ decimal_digits: '0,2' }).withMessage(new ErrorModel(errorsConst.vehicleErrors.priceInvalid)),
        check('seatingMatrix')
            .isArray().withMessage(new ErrorModel(errorsConst.vehicleErrors.seatingMatrixRequired)).bail()
            .custom((value) => value?.length > 3).withMessage(new ErrorModel(errorsConst.vehicleErrors.heightInvalid))
            .custom(([value]) => value?.length > 2).withMessage(new ErrorModel(errorsConst.vehicleErrors.widthInvalid))
    ]),
    checkGetVehicle: () => ([
        //TODO: implement validation of the seller role
        check('id').custom(async (value, { req }) => await vehicleValidator.validateVehicle(req, { where: { id:  sharedHelpers.decryptIdDataBase(value) } })),
        check('vehicle', new ErrorModel(errorsConst.vehicleErrors.vehicleDoesNotExist)).custom((value) => value)
    ])
}