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
      ...sharedCheckMiddleware.checkCreateUser(),
      check("nickName")
        .isString().withMessage(new ErrorModel(errorsConst.coordinatorErrors.nickNameRequired)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.coordinatorErrors.lengthNickName)),
      sharedValidators.validateError,
      check("email")
        .isString().withMessage(new ErrorModel(errorsConst.coordinatorErrors.emailRequired)).bail()
        .isEmail().withMessage(new ErrorModel(errorsConst.coordinatorErrors.emailInvalid)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.coordinatorErrors.emailInvalid)),
      sharedValidators.validateError,
      check("password")
        .isString().withMessage(new ErrorModel(errorsConst.coordinatorErrors.passwordRequired)).bail()
        .isLength({ min: 6, max: 10 }).withMessage(new ErrorModel(errorsConst.coordinatorErrors.passwordInvalid)),
      sharedValidators.validateError,
      ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
      sharedValidators.validateError,
    ];
  },

  checkUpdateCoordinator: () => {
    return [
      ...sharedCheckMiddleware.checkUpdateUser(),
      check("nickName").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.coordinatorErrors.nickNameRequired)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.coordinatorErrors.lengthNickName)),
      sharedValidators.validateError,
      check("email").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.coordinatorErrors.emailRequired)).bail()
        .isEmail().withMessage(new ErrorModel(errorsConst.coordinatorErrors.emailInvalid)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.coordinatorErrors.emailInvalid)),
      sharedValidators.validateError,
      check("password").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.coordinatorErrors.passwordRequired)).bail()
        .isLength({ min: 6, max: 10 }).withMessage(new ErrorModel(errorsConst.coordinatorErrors.passwordInvalid)),
      sharedValidators.validateError,
      ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
      sharedValidators.validateError,
    ];
  },
};
