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
        .isString().withMessage(new ErrorModel(errorsConst.adminErrors.nickNameRequired)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.adminErrors.nickNameSize)),
      sharedValidators.validateError,
      check("email")
        .isString().withMessage(new ErrorModel(errorsConst.adminErrors.emailRequired)).bail()
        .isEmail().withMessage(new ErrorModel(errorsConst.adminErrors.emailInvalid)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.adminErrors.emailSize)),
      sharedValidators.validateError,
      check("password")
        .isString().withMessage(new ErrorModel(errorsConst.adminErrors.passwordRequired)).bail()
        .isLength({ min: 6, max: 10 }).withMessage(new ErrorModel(errorsConst.adminErrors.passwordSize)),
      sharedValidators.validateError,
      ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
      sharedValidators.validateError,
    ];
  },

  checkUpdateAdmin: () => {
    return [
      check("nickName").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.adminErrors.nickNameRequired)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.adminErrors.nickNameSize)),
      sharedValidators.validateError,
      check("email").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.adminErrors.emailRequired)).bail()
        .isEmail().withMessage(new ErrorModel(errorsConst.adminErrors.emailInvalid)).bail()
        .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.adminErrors.emailSize)),
      sharedValidators.validateError,
      check("password").optional({ checkFalsy: false })
        .isString().withMessage(new ErrorModel(errorsConst.adminErrors.passwordRequired)).bail()
        .isLength({ min: 6, max: 10 }).withMessage(new ErrorModel(errorsConst.adminErrors.passwordSize)),
      sharedValidators.validateError,
      ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
      sharedValidators.validateError,
    ];
  },
};
