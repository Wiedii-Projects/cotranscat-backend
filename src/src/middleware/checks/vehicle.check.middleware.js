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
const { municipalityValidators, vehicleValidator, sharedValidators } = require('../index.validators.middleware');

//Helpers
const { sharedHelpers } = require('../../helpers/index.helpers');

module.exports = {
    checkCreateVehicle: () => ([
        check('plate')
            .isString().withMessage(new ErrorModel(errorsConst.vehicleErrors.plateRequired)).bail()
            .isLength({ min: 4, max: 6 }).withMessage(new ErrorModel(errorsConst.vehicleErrors.plateSize)).bail()
            .custom(async (value, { req }) => await vehicleValidator.validateVehicle(req, { where: { plate: value } })),
        sharedValidators.validateError,
        check('vehicle', new ErrorModel(errorsConst.vehicleErrors.plateAlreadyExists))
            .custom((value) => !value),
        sharedValidators.validateError,
        check('municipality')
            .isString().withMessage(new ErrorModel(errorsConst.vehicleErrors.municipalityRequired)).bail()
            .custom(async (value, { req }) => await municipalityValidators.validateMunicipality(req, { where: { id: sharedHelpers.decryptIdDataBase(value) } })),
        sharedValidators.validateError,
        check('idMunicipality', new ErrorModel(errorsConst.vehicleErrors.municipalityDoesNotExist))
            .custom((value) => !!value),
        sharedValidators.validateError,
        check('mark', new ErrorModel(errorsConst.vehicleErrors.markRequired)).isString(),
        sharedValidators.validateError,
        check('model', new ErrorModel(errorsConst.vehicleErrors.modelRequired)).isString(),
        sharedValidators.validateError,
        check('price')
            .exists().notEmpty().withMessage(new ErrorModel(errorsConst.vehicleErrors.priceRequired)).bail()
            .isDecimal({ decimal_digits: '0,2' }).withMessage(new ErrorModel(errorsConst.vehicleErrors.priceInvalid)),
        sharedValidators.validateError,
        check('internalNumber', new ErrorModel(errorsConst.vehicleErrors.internalNumberRequired)).notEmpty(),
        check('number', new ErrorModel(errorsConst.vehicleErrors.numberRequired)).notEmpty(),
        check('mileage', new ErrorModel(errorsConst.vehicleErrors.mileageRequired)).notEmpty(),
        check('motorNumber', new ErrorModel(errorsConst.vehicleErrors.motorNumberRequired)).notEmpty(),
        check('chassisNumber', new ErrorModel(errorsConst.vehicleErrors.chassisNumberRequired)).notEmpty(),
        check('serialNumber', new ErrorModel(errorsConst.vehicleErrors.serialNumberRequired)).notEmpty(),
        check('SOATExpiration', new ErrorModel(errorsConst.vehicleErrors.SOATExpirationRequired)).isDate(),
        check('mechanicalTechnicianExpiration', new ErrorModel(errorsConst.vehicleErrors.mechanicalTechnicianExpirationRequired)).isDate(),
        sharedValidators.validateError,
        check('typeVehicle')
            .isString().withMessage(new ErrorModel(errorsConst.vehicleErrors.typeVehicleRequired)).bail()
            .custom(async (value, { req }) => await vehicleValidator.validateTypeVehicle(value, req)),
        sharedValidators.validateError,
        check('idTypeVehicle').custom((value) => !!value).withMessage(new ErrorModel(errorsConst.vehicleErrors.typeVehicleInvalid)).bail(),
        sharedValidators.validateError,
        check('typeFuel')
            .isString().withMessage(new ErrorModel(errorsConst.vehicleErrors.typeFuelRequired)).bail()
            .custom(async (value, { req }) => await vehicleValidator.validateTypeFuel(value, req)),
        sharedValidators.validateError,
        check('idTypeFuel').custom((value) => !!value).withMessage(new ErrorModel(errorsConst.vehicleErrors.typeFuelInvalid)).bail(),
        sharedValidators.validateError,
        check('typeBodywork')
            .isString().withMessage(new ErrorModel(errorsConst.vehicleErrors.typeBodyworkRequired)).bail()
            .custom(async (value, { req }) => await vehicleValidator.validateTypeBodywork(value, req)),
        sharedValidators.validateError,
        check('idTypeBodywork').custom((value) => !!value).withMessage(new ErrorModel(errorsConst.vehicleErrors.typeBodyworkInvalid)).bail(),
        sharedValidators.validateError,
        check('templateVehicle')
            .isString().withMessage(new ErrorModel(errorsConst.vehicleErrors.templateVehicleRequired)).bail()
            .custom(async (value, { req }) => await vehicleValidator.validateTemplateVehicle(value, req)),
        sharedValidators.validateError,
        check('idTemplateVehicle').custom((value, { req }) => !!value).withMessage(new ErrorModel(errorsConst.vehicleErrors.templateVehicleInvalid)).bail(),
        sharedValidators.validateError,
        check('owner')
            .isString().withMessage(new ErrorModel(errorsConst.vehicleErrors.ownerRequired)).bail()
            .custom(async (value, { req }) => await vehicleValidator.validateOwner(value, req)),
        sharedValidators.validateError,
        check('idOwner').custom((value) => !!value).withMessage(new ErrorModel(errorsConst.vehicleErrors.ownerInvalid)).bail(),
        sharedValidators.validateError,
        check('code', new ErrorModel(errorsConst.vehicleErrors.codeRequired)).isString(),
        sharedValidators.validateError,
        check('codeBodyWork', new ErrorModel(errorsConst.vehicleErrors.codeBodyWorkRequired)).isString(),
        sharedValidators.validateError,
    ]),
    checkGetVehicle: () => ([
        check('id').custom(async (value, { req }) => await vehicleValidator.validateVehicle(req, { where: { id: sharedHelpers.decryptIdDataBase(value) } })),
        sharedValidators.validateError,
        check('vehicle', new ErrorModel(errorsConst.vehicleErrors.vehicleDoesNotExist)).custom((value) => value),
        sharedValidators.validateError,
    ]),
    checkGetAllVehiclesAvailableToTravel: () => ([
        check('date')
            .custom((value) => {
                if (typeof value !== 'string')
                    throw new ErrorModel(errorsConst.vehicleErrors.dateRequired)
                return true;
            })
            .bail()
            .isDate()
            .withMessage(new ErrorModel(errorsConst.vehicleErrors.dateInvalid))
            .bail(),
        sharedValidators.validateError,
    ])
}