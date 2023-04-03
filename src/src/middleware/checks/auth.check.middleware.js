// Constants
const { errorsConst } = require('../../constants/index.constants');

// Middleware
const sharedMiddleware = require('./shared.check.middleware')

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
                .custom((value, { req }) => 
                    userValidators.validateGetUser({ 
                        where: { email: value, state: true }, 
                        attributes: [  'id', 'name', 'lastName', 'email', 'phoneNumber', 'state', 'img', 'google', 'password' ] 
                    }, req)),
            check('user', new ErrorModel(errorsConst.userErrors.userNotExist))
                .custom((value) => value? true : false),
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
                .custom((value, { req }) => userValidators.validateGetUser({ where: { email: value, state: true }}, req))
        ]
    },
    checkChangePassword: () => {
        return [
            ...sharedMiddleware.checkJwt(),
            check('password', new ErrorModel(errorsConst.authErrors.passwordRequired)).isString(),
            check('passwordConfirm', new ErrorModel(errorsConst.authErrors.passwordConfirmRequired)).isString(),
            check('password', new ErrorModel(errorsConst.authErrors.passwordNotMatch))
                .custom((value, { req }) => value === req.body.passwordConfirm),
            check('password')
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req)),
            check('isValidPassword', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value) => value ? true : false)
            
        ];
    },
    checkCreateCode: () => {
        return [
            check('email', new ErrorModel(errorsConst.authErrors.emailRequired)).isEmail(),
            check('email')
                .custom((value, { req }) => userValidators.validateGetUser({ where: { email: value, state: true }}, req)),
            check('user', new ErrorModel(errorsConst.userErrors.userNotExist))
                .custom((value) => value? true : false),
        ];
    },
    checkValidateCode: () => {
        return [
            check('code', new ErrorModel(errorsConst.authErrors.codeRequired)).isInt(),
            ...sharedMiddleware.checkId(),
            check('decryptId', new ErrorModel(errorsConst.userErrors.idRequired)).isInt(),
            check('code')
                .custom((value, { req }) => codeValidators.validateCode({ code: value, userCode: req.body.decryptId }, req)),
            check('validCode', new ErrorModel(errorsConst.authErrors.codeNotValid))
                .custom((value) => value ? true : false)
        ];
    }
}