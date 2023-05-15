// Constants
const { errorsConst } = require("../../../constants/index.constants");

// Libraries
const { check } = require("express-validator");

// Check - middleware
const sharedCheckMiddleware = require("../shared.check.middleware");

// Validators - middleware
const {
  sharedValidators,
  driverValidator,
} = require("../../index.validators.middleware");

// Models
const { ErrorModel } = require("../../../models/index.models");

module.exports = {
  checkCreateDriver: () => [
    ...sharedCheckMiddleware.checkCreateUser(),
    check("nickName")
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.nickNameRequired)).bail()
      .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.driverErrors.lengthNickName)),
    sharedValidators.validateError,
    check("email")
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.emailRequired)).bail()
      .isEmail().withMessage(new ErrorModel(errorsConst.driverErrors.emailInvalid)),
    sharedValidators.validateError,
    check("password")
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.passwordRequired)).bail()
      .isLength({ min: 6, max: 10 }).withMessage(new ErrorModel(errorsConst.driverErrors.lengthPassword)),
    sharedValidators.validateError,
    ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
    sharedValidators.validateError,
  ],
  checkDriverExist: () => [
    ...sharedCheckMiddleware.checkId(),
    check("decryptId", new ErrorModel(errorsConst.driverErrors.driverNotExist)).bail()
      .custom((id, { req }) => driverValidator.validateDriver(req, id)).bail()
      .custom((_, { req }) => !!req.body.driver),
    sharedValidators.validateError,
  ],
  checkUpdateDriver: () => [
    ...sharedCheckMiddleware.checkId(),
    check("nickName").optional({ checkFalsy: false })
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.nickNameRequired)).bail()
      .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.driverErrors.lengthNickName)),
    sharedValidators.validateError,
    check("email").optional({ checkFalsy: false })
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.emailRequired)).bail()
      .isEmail().withMessage(new ErrorModel(errorsConst.driverErrors.emailInvalid)),
    sharedValidators.validateError,
    check("password").optional({ checkFalsy: false })
      .isString().withMessage(new ErrorModel(errorsConst.driverErrors.passwordRequired)).bail()
      .isLength({ min: 6, max: 10 }).withMessage(new ErrorModel(errorsConst.driverErrors.lengthPassword)),
    sharedValidators.validateError,
    ...sharedCheckMiddleware.checkEmailOrNickNameExist(),
    sharedValidators.validateError,
  ],
};
