// Constants
const { errorsConst } = require("../../../constants/index.constants");

// Libraries
const { check } = require("express-validator");

// Middleware
const sharedCheckMiddleware = require("../shared.check.middleware");

// Models
const { ErrorModel } = require("../../../models/index.models");

// Helpers
const { userValidators, sharedValidators } = require("../../index.validators.middleware");

module.exports = {
  checkCreateOwner: () => {
    return [
      ...sharedCheckMiddleware.checkCreateUser(),
      check("indicativeNumberWhatsapp")
        .isString().withMessage(new ErrorModel(errorsConst.ownerErrors.idIndicativePhoneWhatsAppRequired)).bail()
        .custom((value, { req }) => userValidators.decryptId(value, "idIndicativePhoneWhatsApp", req))
        .custom((_, { req }) => req.body.idIndicativePhoneWhatsApp ? true : false).withMessage(new ErrorModel(errorsConst.ownerErrors.idIndicativePhoneWhatsAppRequired)).bail()
        .custom(async (_, { req }) => await userValidators.validateIdIndicativeNumber({ where: { id: req.body.idIndicativePhoneWhatsApp } }, req))
        .custom((_, { req }) => (req.body.isValid ? true : false)).withMessage(new ErrorModel(errorsConst.ownerErrors.idIndicativePhoneWhatsAppInvalid)),
      sharedValidators.validateError,
      check("numberPhoneWhatsapp")
        .isString().withMessage(new ErrorModel(errorsConst.ownerErrors.numberPhoneWhatsappRequired)).bail()
        .isLength({ min: 1, max: 12 }).withMessage(new ErrorModel(errorsConst.ownerErrors.numberPhoneWhatsappRequired)),
      sharedValidators.validateError,
      check("email").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.ownerErrors.emailRequired)).bail()
        .isEmail().withMessage(new ErrorModel(errorsConst.ownerErrors.emailRequired)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.ownerErrors.emailRequired)),
      sharedValidators.validateError,
      check("address").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.ownerErrors.addressRequired)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.ownerErrors.addressRequired)),
      sharedValidators.validateError,
      check("municipality").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.ownerErrors.idMunicipalityRequired)).bail()
        .custom((value, { req }) => userValidators.decryptId(value, "idMunicipalityOfResidence", req))
        .custom((_, { req }) => (req.body.idMunicipalityOfResidence ? true : false)).withMessage(new ErrorModel(errorsConst.ownerErrors.idMunicipalityRequired)).bail()
        .custom(async (_, { req }) => await userValidators.validateIdMunicipality({ where: { id: req.body.idMunicipalityOfResidence } }, req))
        .custom((_, { req }) => (req.body.isValid ? true : false)).withMessage(new ErrorModel(errorsConst.userErrors.idMunicipalityInvalid)).bail(),
      sharedValidators.validateError,
    ];
  },

  checkUpdateOwner: () => {
    return [
      ...sharedCheckMiddleware.checkJwt(),
      ...sharedCheckMiddleware.checkId(),
      ...sharedCheckMiddleware.checkUpdateUser(),
      check("indicativeNumberWhatsapp").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.ownerErrors.idIndicativePhoneWhatsAppRequired)).bail()
        .custom((value, { req }) => userValidators.decryptId(value, "idIndicativePhoneWhatsApp", req))
        .custom((_, { req }) => req.body.idIndicativePhoneWhatsApp ? true : false).withMessage(new ErrorModel(errorsConst.ownerErrors.idIndicativePhoneWhatsAppRequired)).bail()
        .custom(async (_, { req }) => await userValidators.validateIdIndicativeNumber({ where: { id: req.body.idIndicativePhoneWhatsApp } }, req))
        .custom((_, { req }) => (req.body.isValid ? true : false)).withMessage(new ErrorModel(errorsConst.ownerErrors.idIndicativePhoneWhatsAppInvalid)),
      sharedValidators.validateError,
      check("numberPhoneWhatsapp").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.ownerErrors.numberPhoneWhatsappRequired)).bail()
        .isLength({ min: 1, max: 12 }).withMessage(new ErrorModel(errorsConst.ownerErrors.numberPhoneWhatsappRequired)),
      sharedValidators.validateError,
      check("email").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.ownerErrors.emailRequired)).bail()
        .isEmail().withMessage(new ErrorModel(errorsConst.ownerErrors.emailRequired)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.ownerErrors.emailRequired)),
      sharedValidators.validateError,
      check("address").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.ownerErrors.addressRequired)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.ownerErrors.addressRequired)),
      sharedValidators.validateError,
      check("municipality").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.ownerErrors.idMunicipalityRequired)).bail()
        .custom((value, { req }) => userValidators.decryptId(value, "idMunicipalityOfResidence", req))
        .custom((_, { req }) => (req.body.idMunicipalityOfResidence ? true : false)).withMessage(new ErrorModel(errorsConst.ownerErrors.idMunicipalityRequired)).bail()
        .custom(async (_, { req }) => await userValidators.validateIdMunicipality({ where: { id: req.body.idMunicipalityOfResidence } }, req))
        .custom((_, { req }) => (req.body.isValid ? true : false)).withMessage(new ErrorModel(errorsConst.userErrors.idMunicipalityInvalid)),
      sharedValidators.validateError,
    ];
  },
};
