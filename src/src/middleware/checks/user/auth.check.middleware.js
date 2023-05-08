// Constants
const { errorsConst } = require("../../../constants/index.constants");

// Middleware
const sharedMiddleware = require("../shared.check.middleware");

// Libraries
const { check } = require("express-validator");

// Models
const { ErrorModel } = require("../../../models/index.models");

// Validators - middleware
const {
  userValidators,
  authValidators,
  sharedValidators,
  codeValidators,
} = require("../../index.validators.middleware");

module.exports = {
  checkLogin: () => {
    return [];
  },
  checkValidateEmail: () => {
    return [
      check(
        "email",
        new ErrorModel(errorsConst.authErrors.emailRequired)
      ).isEmail(),
      check("email").custom((value, { req }) =>
        userValidators.validateGetUser(
          { where: { email: value, state: true } },
          req
        )
      ),
    ];
  },
  checkChangePassword: () => {
    return [
      ...sharedMiddleware.checkJwt(),
      check(
        "password",
        new ErrorModel(errorsConst.authErrors.passwordRequired)
      ).isString(),
      check(
        "passwordConfirm",
        new ErrorModel(errorsConst.authErrors.passwordConfirmRequired)
      ).isString(),
      check(
        "password",
        new ErrorModel(errorsConst.authErrors.passwordNotMatch)
      ).custom((value, { req }) => value === req.body.passwordConfirm),
      check("password").custom((value, { req }) =>
        userValidators.validatePasswordRules(value, req)
      ),
      check(
        "isValidPassword",
        new ErrorModel(errorsConst.authErrors.validatePassword)
      ).custom((value) => (value ? true : false)),
    ];
  }
};
