// Constants
const { errorsConst } = require('./../../constants/index');

// Helpers
const userHelpers = require('./../../helpers/user.helpers')

// Libraries
const { check } = require('express-validator');

// Validator - middleware
const userValidators = require('./../validators/user.validator.middleware')
const authValidators = require('./../validators/auth.validator.middleware')
const sharedValidators = require('./../validators/shared.validator.middleware')
const codeValidators = require('./../validators/code.validator.middleware')

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkLogin: () => {
        return [
            check('email', new ErrorModel(errorsConst.authErrors.emailRequired)).isEmail(),
            check('password', new ErrorModel(errorsConst.authErrors.passwordRequired)).not().isEmpty(),
            check('password', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req))
                .custom((value, { req }) => req.body.validPasswordRules),
            sharedValidators.validateErrorFields,
            check('email', new ErrorModel(errorsConst.authErrors.incorrectCredentials))
                .custom((value, { req }) => userValidators.validateUserByEmail(value, req))
                .custom((value, { req }) => req.body.user ? true : false),
            check('user', new ErrorModel(errorsConst.userErrors.userNotExist))
                .custom((value) => value.state),
            check('password', new ErrorModel(errorsConst.authErrors.incorrectCredentials))
                .custom((value, { req }) => authValidators.validatePassword(value, req.body.user.password, req))
                .custom((value, { req }) => req.body.validPassword),
        ]
    },
    checkValidateEmail: () => {
        return [
            check('email', new ErrorModel(errorsConst.authErrors.emailRequired)).isEmail(),
            check('email').custom((value, { req }) => userValidators.validateUserGoogleByEmail(value, req)),
            check('email').custom((value, { req }) => userValidators.validateUserByEmail(value, req)),
            check('user', new ErrorModel(errorsConst.authErrors.emailExist))
                .custom((value, { req }) => value === null && req.body.userGoogle === null ? false : true),
            check('user', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value, { req }) => value?.state === false || req.body.userGoogle?.state === false ? false : true),
        ]
    },
    checkChangePassword: () => {
        return [
            check('password', new ErrorModel(errorsConst.authErrors.passwordRequired)).not().isEmpty(),
            check('password', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req))
                .custom((value, { req }) => req.body.validPasswordRules),
            check('passwordConfirm', new ErrorModel(errorsConst.authErrors.passwordConfirmRequired)).not().isEmpty(),
            check('passwordConfirm', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req))
                .custom((value, { req }) => req.body.validPasswordRules),
            check('password', new ErrorModel(errorsConst.authErrors.passwordNotMatch))
                .custom((value, { req }) => value === req.body.passwordConfirm)
        ];
    },
    checkGoogleSignIn: () => {
        return [
            check('id_token', new ErrorModel(errorsConst.authErrors.googleToken)).not().isEmpty(),
            check('id_token', new ErrorModel(errorsConst.authErrors.googleToken))
                .custom((value, { req }) => userValidators.validUserGoogle(value, req))
                .custom((value, { req }) => req.body.noVerify),
            check('email', new ErrorModel(errorsConst.authErrors.incorrectCredentials))
                .custom((value, { req }) => userValidators.validateUserGoogleByEmail(value, req))
                .custom((value, { req }) => req.body.userGoogle ? true : userHelpers.createUserGoogleHelper()),
            check('user', new ErrorModel(errorsConst.authErrors.userRemoved))
                .custom((value, { req }) => req.body.user.state),
        ];
    },
    checkCreateCode: () => {
        return [
            check('uid', new ErrorModel(errorsConst.authErrors.uidRequired)).not().isEmpty(),
            check('uid', new ErrorModel(errorsConst.userErrors.idNotExist)).isMongoId(),
            check('uid', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value, { req }) => userValidators.validateUserByID(value, req))
                .custom((value, { req }) => req.body.user),
        ];
    },
    checkValidateCode: () => {
        return [
            check('code', new ErrorModel(errorsConst.authErrors.codeRequired)).not().isEmpty(),
            check('code', new ErrorModel(errorsConst.authErrors.codeNotValid))
                .custom((value, { req }) => codeValidators.validateCode(value, req))
                .custom((value, { req }) => req.body.validCode ? true : false),
        ];
    }
}