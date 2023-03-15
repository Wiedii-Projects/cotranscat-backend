// Constants
const { errorsConst, roleConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedMiddleware = require('./shared.check.middleware')

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - Middleware
const { userValidators, roleValidators } = require('../index.validators.middleware')

module.exports = {
    checkCreateUser: () => {
        return [
            check('name', new ErrorModel(errorsConst.userErrors.nameRequired)).isString(),
            check('lastName', new ErrorModel(errorsConst.userErrors.lastNameRequired)).isString(),
            check('password', new ErrorModel(errorsConst.authErrors.passwordRequired)).isString(),
            check('email', new ErrorModel(errorsConst.userErrors.emailInvalid)).isEmail(),
            check('phoneNumber', new ErrorModel(errorsConst.userErrors.phoneNumberRequired)).isString(),
            check('role', new ErrorModel(errorsConst.userErrors.roleRequired)).isString(),
            check('password')
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req)),
            check('isValidPassword', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value) => value ? true : false),
            check('email')
                .custom((value, { req }) => userValidators.validateEmailExists(value, req)),
            check('validUser', new ErrorModel(errorsConst.userErrors.emailInUse))
                .custom((value) => value ? true : false),
            check('role')
                .custom((value, { req }) => roleValidators.validateRole(value, req)),
            check('validRole', new ErrorModel(errorsConst.roleErrors.unregisteredRoleDB))
                .custom((value) => value ? true : false)
        ];
    },
    checkUpdateUser: () => {
        return [
            check('role', new ErrorModel(errorsConst.userErrors.roleRequired)).isString(),
            check('id', new ErrorModel(errorsConst.userErrors.idRequired)).isInt(),
            check('role')
                .custom((value, { req }) => roleValidators.validateRole(value, req)),
            check('validRole', new ErrorModel(errorsConst.roleErrors.unregisteredRoleDB))
                .custom((value) => value ? true : false),
            check('id')
                .custom((value, { req }) => userValidators.validateUserByID(value, req)),
            check('id',)
                .custom((value, { req }) => userValidators.validateUserGoogleByID(value, req)),
            check('user', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value) => value ? true : false)
        ];
    },
    checkDeleteUser: () => {
        return [
            ...sharedMiddleware.checkJwt(),
            check('user', new ErrorModel(errorsConst.userErrors.adminRole))
                .custom((value) => value.role == roleConst.ADMIN_ROLE ? true : false),
            check('id', new ErrorModel(errorsConst.userErrors.idRequired)).isInt(),
            check('id')
                .custom((value, { req }) => userValidators.validateUserByID(value, req)),
            check('id')
                .custom((value, { req }) => userValidators.validateUserGoogleByID(value, req)),
            check('user', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value) => value ? true : false)
        ]
    },
    checkGetUser: () => {
        return [
            check('id')
                .custom((value, { req }) => userValidators.validateUserStateByID(value, req)),
            check('id')
                .custom((value, { req }) => userValidators.validateUserGoogleStateByID(value, req)),
            check('user', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value) => value ? true : false)
        ];
    }

};