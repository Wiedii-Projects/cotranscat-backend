// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

// Helpers
const { userValidators, sharedValidators } = require('../index.validators.middleware');

module.exports = {
    checkCreateClient: () => {
        return [
            ...sharedCheckMiddleware.checkCreateUser(),
            check('indicativeNumberWhatsapp')
                .isString().withMessage(new ErrorModel(errorsConst.client.idIndicativePhoneWhatsAppRequired)).bail()
                .custom((value, {req}) => userValidators.decryptId(value, "idIndicativePhoneWhatsApp", req))
                .custom((_, { req }) => req.body.idIndicativePhoneWhatsApp ? true : false).withMessage(new ErrorModel(errorsConst.client.idIndicativePhoneWhatsAppRequired)).bail()
                .custom(async(_, {req}) => await userValidators.validateIdIndicativeNumber({ where: { id: req.body.idIndicativePhoneWhatsApp }}, req))
                .custom((_, { req }) => req.body.isValid  ? true: false).withMessage(new ErrorModel(errorsConst.client.idIndicativePhoneWhatsAppInvalid)).bail(),
            sharedValidators.validateError,
            check('numberPhoneWhatsapp', new ErrorModel(errorsConst.client.numberPhoneWhatsappRequired)).isString().isLength({min: 1, max: 12}),
            check('email', new ErrorModel(errorsConst.client.emailRequired)).isEmail().isLength({min: 1, max: 100}).optional({checkFalsy: false}),
            check('address', new ErrorModel(errorsConst.client.addressRequired)).isString().isLength({min: 1, max: 100}).optional({checkFalsy: false}),
            check('municipality')
                .isString().withMessage(new ErrorModel(errorsConst.client.idMunicipalityRequired)).bail()
                .custom((value, {req}) => userValidators.decryptId(value, "idMunicipality", req))
                .custom((_, { req }) => req.body.idMunicipality ? true : false).withMessage(new ErrorModel(errorsConst.client.idMunicipalityRequired)).bail()
                .custom(async(_, {req}) => await userValidators.validateIdIndicativeNumber({ where: { id: req.body.idMunicipality }}, req))
                .custom((_, { req }) => req.body.isValid  ? true: false).withMessage(new ErrorModel(errorsConst.userErrors.idMunicipalityInvalid)).bail()
                .optional({checkFalsy: false}),
        ]
    },

    checkUpdateClient: () => {
        return [
            ...sharedCheckMiddleware.checkUpdateUser(),
            check('indicativeNumberWhatsapp')
                .isString().withMessage(new ErrorModel(errorsConst.client.idIndicativePhoneWhatsAppRequired)).bail()
                .custom((value, {req}) => userValidators.decryptId(value, "idIndicativePhoneWhatsApp", req))
                .custom((_, { req }) => req.body.idIndicativePhoneWhatsApp ? true : false).withMessage(new ErrorModel(errorsConst.client.idIndicativePhoneWhatsAppRequired)).bail()
                .custom(async(_, {req}) => await userValidators.validateIdIndicativeNumber({ where: { id: req.body.idIndicativePhoneWhatsApp }}, req))
                .custom((_, { req }) => req.body.isValid  ? true: false).withMessage(new ErrorModel(errorsConst.client.idIndicativePhoneWhatsAppInvalid)).bail()
                .optional({checkFalsy: false}),
            sharedValidators.validateError,
            check('numberPhoneWhatsapp', new ErrorModel(errorsConst.client.numberPhoneWhatsappRequired)).isString().isLength({min: 1, max: 12})
                .optional({checkFalsy: false}),
            check('email', new ErrorModel(errorsConst.client.emailRequired)).isEmail().isLength({min: 1, max: 100}).optional({checkFalsy: false})
                .optional({checkFalsy: false}),
            check('address', new ErrorModel(errorsConst.client.addressRequired)).isString().isLength({min: 1, max: 100}).optional({checkFalsy: false})
                .optional({checkFalsy: false}),
            check('municipality')
                .isString().withMessage(new ErrorModel(errorsConst.client.idMunicipalityRequired)).bail()
                .custom((value, {req}) => userValidators.decryptId(value, "idMunicipality", req))
                .custom((_, { req }) => req.body.idMunicipality ? true : false).withMessage(new ErrorModel(errorsConst.client.idMunicipalityRequired)).bail()
                .custom(async(_, {req}) => await userValidators.validateIdIndicativeNumber({ where: { id: req.body.idMunicipality }}, req))
                .custom((_, { req }) => req.body.isValid  ? true: false).withMessage(new ErrorModel(errorsConst.userErrors.idMunicipalityInvalid)).bail()
                .optional({checkFalsy: false}),
        ]
    }
}