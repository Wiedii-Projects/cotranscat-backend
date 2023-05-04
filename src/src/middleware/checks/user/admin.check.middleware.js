// Constants
const { errorsConst } = require("../../../constants/index.constants");

// Libraries
const { check } = require("express-validator");

// Models
const { ErrorModel } = require("../../../models/index.models");

//Validators
const { sharedValidators } = require("../../index.validators.middleware");

// Middleware
const sharedCheckMiddleware = require("../shared.check.middleware");

module.exports = {
  checkCreateAdmin: () => {
    return [
      ...sharedCheckMiddleware.checkCreateUser(),
      check("nickName")
        .isString()
        .withMessage(new ErrorModel(errorsConst.admin.nickNameRequired))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.admin.lengthNickName))
        .bail(),
      sharedValidators.validateError,
      check("email")
        .isString()
        .withMessage(new ErrorModel(errorsConst.admin.emailRequired))
        .bail()
        .isEmail()
        .withMessage(new ErrorModel(errorsConst.admin.emailInvalid))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.admin.emailInvalid))
        .bail(),
      sharedValidators.validateError,
      check("password")
        .isString()
        .withMessage(new ErrorModel(errorsConst.admin.passwordRequired))
        .bail()
        .isLength({ min: 6, max: 10 })
        .withMessage(new ErrorModel(errorsConst.admin.passwordInvalid))
        .bail(),
      sharedValidators.validateError,
      ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
      sharedValidators.validateError,
    ];
  },

  checkUpdateAdmin: () => {
    return [
      check("nickName")
        .isString()
        .withMessage(new ErrorModel(errorsConst.admin.nickNameRequired))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.admin.lengthNickName))
        .bail()
        .optional({ checkFalsy: false }),
      sharedValidators.validateError,
      check("email")
        .isString()
        .withMessage(new ErrorModel(errorsConst.admin.emailRequired))
        .bail()
        .isEmail()
        .withMessage(new ErrorModel(errorsConst.admin.emailInvalid))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.admin.emailInvalid))
        .bail()
        .optional({ checkFalsy: false }),
      sharedValidators.validateError,
      check("password")
        .isString()
        .withMessage(new ErrorModel(errorsConst.admin.passwordRequired))
        .bail()
        .isLength({ min: 6, max: 10 })
        .withMessage(new ErrorModel(errorsConst.admin.passwordInvalid))
        .bail()
        .optional({ checkFalsy: false }),
      sharedValidators.validateError,
      ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
      sharedValidators.validateError,
    ];
  },
};
