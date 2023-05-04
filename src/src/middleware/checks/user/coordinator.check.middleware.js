// Constants
const { errorsConst } = require("../../../constants/index.constants");

// Libraries
const { check } = require("express-validator");

// Models
const { ErrorModel } = require("../../../models/index.models");

// Validator
const { sharedValidators } = require("../../index.validators.middleware");

// Middleware
const sharedCheckMiddleware = require("../shared.check.middleware");

module.exports = {
  checkCreateCoordinator: () => {
    return [
      check("nickName")
        .isString()
        .withMessage(new ErrorModel(errorsConst.coordinator.nickNameRequired))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.coordinator.lengthNickName))
        .bail(),
      sharedValidators.validateError,
      check("email")
        .isString()
        .withMessage(new ErrorModel(errorsConst.coordinator.emailRequired))
        .bail()
        .isEmail()
        .withMessage(new ErrorModel(errorsConst.coordinator.emailInvalid))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.coordinator.emailInvalid))
        .bail(),
      sharedValidators.validateError,
      check("password")
        .isString()
        .withMessage(new ErrorModel(errorsConst.coordinator.passwordRequired))
        .bail()
        .isLength({ min: 6, max: 10 })
        .withMessage(new ErrorModel(errorsConst.coordinator.passwordInvalid))
        .bail(),
      sharedValidators.validateError,
      ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
      sharedValidators.validateError,
    ];
  },

  checkUpdateCoordinator: () => {
    return [
      check("nickName")
        .isString()
        .withMessage(new ErrorModel(errorsConst.coordinator.nickNameRequired))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.coordinator.lengthNickName))
        .bail()
        .optional({ checkFalsy: false }),
      sharedValidators.validateError,
      check("email")
        .isString()
        .withMessage(new ErrorModel(errorsConst.coordinator.emailRequired))
        .bail()
        .isEmail()
        .withMessage(new ErrorModel(errorsConst.coordinator.emailInvalid))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.coordinator.emailInvalid))
        .bail()
        .optional({ checkFalsy: false }),
      sharedValidators.validateError,
      check("password")
        .isString()
        .withMessage(new ErrorModel(errorsConst.coordinator.passwordRequired))
        .bail()
        .isLength({ min: 6, max: 10 })
        .withMessage(new ErrorModel(errorsConst.coordinator.passwordInvalid))
        .bail()
        .optional({ checkFalsy: false }),
      sharedValidators.validateError,
      ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
      sharedValidators.validateError,
    ];
  },
};
