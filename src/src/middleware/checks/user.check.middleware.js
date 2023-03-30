// Constants
const { errorsConst, roleConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - Middleware
const { userValidators } = require('../index.validators.middleware');

module.exports = {
    checkAllGetUser: () => {
        return [
            ...sharedMiddleware.checkJwt()
        ];
    },
    checkGetUser: () => {
        return [
            ...sharedMiddleware.checkJwt(),
            ...sharedMiddleware.checkId(),
            check('decryptId')
                .custom((value, { req }) => userValidators.validateGetUser({ where: { id: value } }, req)),
            check('user', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value) => value ? true : false)
        ];
    },
    checkCreateUser: () => {
        return [
            check('name', new ErrorModel(errorsConst.userErrors.nameRequired)).isString(),
            check('lastName', new ErrorModel(errorsConst.userErrors.lastNameRequired)).isString(),
            check('password', new ErrorModel(errorsConst.authErrors.passwordRequired)).isString(),
            check('email', new ErrorModel(errorsConst.userErrors.emailInvalid)).isEmail(),
            check('phoneNumber', new ErrorModel(errorsConst.userErrors.phoneNumberRequired)).isString(),
            check('password')
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req)),
            check('isValidPassword', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value) => value ? true : false),
            check('email')
                .custom((value, { req }) => userValidators.validateGetUser({ where: { email: value } }, req)),
            check('user', new ErrorModel(errorsConst.userErrors.emailInUse))
                .custom((value) => value ? false: true),
        ];
    },
    checkCreateAdminUser: () => {
        return [
            ...sharedMiddleware.checkJwt(),
            check('user', new ErrorModel(errorsConst.userErrors.adminRole))
                .custom((value) => value.role.role === roleConst.ADMIN_ROLE ? true : false),
            check('name', new ErrorModel(errorsConst.userErrors.nameRequired)).isString(),
            check('lastName', new ErrorModel(errorsConst.userErrors.lastNameRequired)).isString(),
            check('password', new ErrorModel(errorsConst.authErrors.passwordRequired)).isString(),
            check('email', new ErrorModel(errorsConst.userErrors.emailInvalid)).isEmail(),
            check('phoneNumber', new ErrorModel(errorsConst.userErrors.phoneNumberRequired)).isString(),
            check('password')
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req)),
            check('isValidPassword', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value) => value ? true : false),
            check('email')
                .custom((value, { req }) => userValidators.validateGetUser({ where: { email: value } }, req)),
            check('user', new ErrorModel(errorsConst.userErrors.emailInUse))
                .custom((value) => value ? false: true),
        ];
    },
    checkUpdateUser: () => {
        return [
            ...sharedMiddleware.checkJwt()
        ];
    },
    checkDeleteUser: () => {
        return [
            ...sharedMiddleware.checkJwt(),
            check('user', new ErrorModel(errorsConst.userErrors.adminRole))
                .custom((value) => value.role.role === roleConst.ADMIN_ROLE ? true : false),
            ...sharedMiddleware.checkId(),
            check('decryptId', new ErrorModel(errorsConst.userErrors.idRequired)).isInt(),
            check('decryptId')
                .custom((value, { req }) => userValidators.validateGetUser({ where: { id: value } }, req)),
            check('user', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value) => value ? true : false)
        ]
    }
};