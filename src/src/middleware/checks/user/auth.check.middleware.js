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
  sharedValidators,
  authValidators,
} = require("../../index.validators.middleware");

module.exports = {
  checkLogin: () => {
    return [
      check("email")
        .isEmail()
        .withMessage(new ErrorModel(errorsConst.authErrors.emailRequired))
        .optional({ checkFalsy: false }),
      sharedValidators.validateError,
      check("nickName")
        .isString()
        .withMessage(new ErrorModel(errorsConst.authErrors.nickNameRequired))
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage(new ErrorModel(errorsConst.authErrors.nickNameSize))
        .optional({ checkFalsy: false }),
      sharedValidators.validateError,
      check("password")
        .isString()
        .withMessage(new ErrorModel(errorsConst.authErrors.passwordRequired))
        .isLength({ min: 1, max: 30 })
        .withMessage(new ErrorModel(errorsConst.authErrors.passwordCharacter)),
      sharedValidators.validateError,
      check("email")
        .custom((value, { req }) => (value || req.body.nickName ? true : false))
        .withMessage(
          new ErrorModel(errorsConst.authErrors.emailOrNickNameRequired)
        ),
      sharedValidators.validateError,
      ...sharedMiddleware.checkUserLogin(),
      check("user")
        .custom((value, { req }) =>
          authValidators.validatePassword(
            req.body.password,
            value.password,
            req
          )
        )
        .custom((_, { req }) => req.body.passwordCompare)
        .withMessage(new ErrorModel(errorsConst.authErrors.passwordIncorrect)),
      sharedValidators.validateError,
    ];
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
  },
};
