// Constants
const { errorsConst } = require("../../../constants/index.constants");

// Libraries
const { check } = require("express-validator");

// Models
const { ErrorModel } = require("../../../models/index.models");

// Validator
const { sharedValidators } = require("../../index.validators.middleware");

module.exports = {
  checkCreateSeller: () => {
    return [
      check("nickName")
        .isString()
        .withMessage(new ErrorModel(errorsConst.sellerErrors.nickNameRequired))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.sellerErrors.lengthNickName)),
      sharedValidators.validateError,
      check("email")
        .isString()
        .withMessage(new ErrorModel(errorsConst.sellerErrors.emailRequired))
        .bail()
        .isEmail()
        .withMessage(new ErrorModel(errorsConst.sellerErrors.emailInvalid))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.sellerErrors.lengthEmail)),
      sharedValidators.validateError,
      check("password")
        .isString()
        .withMessage(new ErrorModel(errorsConst.sellerErrors.passwordRequired))
        .bail()
        .isLength({ min: 6, max: 10 })
        .withMessage(new ErrorModel(errorsConst.sellerErrors.lengthPassword)),
      sharedValidators.validateError,
    ];
  },

  checkUpdateSeller: () => {
    return [
      check("nickName")
        .optional({ checkFalsy: false })
        .isString()
        .withMessage(new ErrorModel(errorsConst.sellerErrors.nickNameRequired))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.sellerErrors.lengthNickName)),
      sharedValidators.validateError,
      check("email")
        .optional({ checkFalsy: false })
        .isString()
        .withMessage(new ErrorModel(errorsConst.sellerErrors.emailRequired))
        .bail()
        .isEmail()
        .withMessage(new ErrorModel(errorsConst.sellerErrors.emailInvalid))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.sellerErrors.lengthEmail)),
      sharedValidators.validateError,
      check("password")
        .optional({ checkFalsy: false })
        .isString()
        .withMessage(new ErrorModel(errorsConst.sellerErrors.passwordRequired))
        .bail()
        .isLength({ min: 6, max: 10 })
        .withMessage(new ErrorModel(errorsConst.sellerErrors.lengthPassword)),
      sharedValidators.validateError,
    ];
  },
};
