// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - middleware
const { userValidators, authValidators, sharedValidators, codeValidators } = require('../index.validators.middleware')

module.exports = {
    checkLogin: () => {
        return [
            check('email', new ErrorModel(errorsConst.authErrors.emailRequired)).isEmail(),
            check('password', new ErrorModel(errorsConst.authErrors.passwordRequired)).isString(),
            check('password')
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req)),
            check('isValidPassword', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value) => value ? true : false),
            sharedValidators.validateErrorFields,
            check('email')
                .custom((value, { req }) => userValidators.validateUserByEmail(value, req)),
            check('user', new ErrorModel(errorsConst.userErrors.userNotExist))
                .custom((value) => value ? true : false),
            check('password')
                .custom((value, { req }) => authValidators.validatePassword(value, req.body.user.password, req)),
            check('validPassword', new ErrorModel(errorsConst.authErrors.incorrectCredentials))
                .custom((value) => value ? true : false),
        ]
    },
    checkValidateEmail: () => {
        return [
            check('email', new ErrorModel(errorsConst.authErrors.emailRequired)).isEmail(),
            check('email')
                .custom((value, { req }) => userValidators.validateUserGoogleByEmail(value, req)),
            check('email')
                .custom((value, { req }) => userValidators.validateUserByEmail(value, req)),
            check('user', new ErrorModel(errorsConst.authErrors.emailExist))
                .custom((value, { req }) => value === null && req.body.userGoogle === null ? false : true),
            check('user', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value, { req }) => value?.state === false || req.body.userGoogle?.state === false ? false : true),
        ]
    },
    checkChangePassword: () => {
        return [
            check('password', new ErrorModel(errorsConst.authErrors.passwordRequired)).isString(),
            check('password')
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req)),
            check('isValidPassword', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value) => value ? true : false),

            check('passwordConfirm', new ErrorModel(errorsConst.authErrors.passwordConfirmRequired)).isString(),
            check('passwordConfirm')
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req)),
            check('isValidPassword', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value) => value ? true : false),
            check('password', new ErrorModel(errorsConst.authErrors.passwordNotMatch))
                .custom((value, { req }) => value === req.body.passwordConfirm)
        ];
    },
    checkGoogleSignIn: () => {
        return [
            check('id_token', new ErrorModel(errorsConst.authErrors.googleToken)).isString(),
            check('id_token')
                .custom((value, { req }) => userValidators.validUserGoogle(value, req)),
            check('noVerify', new ErrorModel(errorsConst.authErrors.googleToken))
                .custom((value) => value ? true : false),
            check('email')
                .custom((value, { req }) => userValidators.validateUserGoogleByEmail(value, req)),
            check('userGoogle', new ErrorModel(errorsConst.authErrors.incorrectCredentials))
                .custom((value, { req }) => value ? true : userValidators.validateProcessCreateUserGoogle(req)),
            check('user', new ErrorModel(errorsConst.authErrors.userRemoved))
                .custom((value) => value ? true : false),
        ];
    },
    checkCreateCode: () => {
        return [
            check('id', new ErrorModel(errorsConst.authErrors.idRequired)).isInt(),
            check('id')
                .custom((value, { req }) => userValidators.validateUserByID(value, req)),
            check('user', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value) => value ? true : false)
        ];
    },
    checkValidateCode: () => {
        return [
            check('code', new ErrorModel(errorsConst.authErrors.codeRequired)).isString(),
            check('id', new ErrorModel(errorsConst.authErrors.idRequired)).isInt(),
            check('id')
                .custom((value, { req }) => userValidators.validateUserByID(value, req)),
            check('user', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value) => value ? true : false),
            check('code')
                .custom((value, { req }) => codeValidators.validateCode(value, req)),
            check('validCode', new ErrorModel(errorsConst.authErrors.codeNotValid))
                .custom((value) => value ? true : false)
        ];
    }
}