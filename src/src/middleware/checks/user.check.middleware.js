// Constants
const { errorsConst, roleConst } = require('./../../constants/index');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - Middleware
const authValidators = require('./../validators/auth.validator.middleware')
const userValidators = require('./../validators/user.validator.middleware')
const roleValidators = require('./../validators/role.validator.middleware')

module.exports = {
    checkCreateUser: () => {
        return [
            check('name', new ErrorModel(errorsConst.userErrors.nameRequired)).not().isEmpty(),
            check('lastName', new ErrorModel(errorsConst.userErrors.lastNameRequired)).not().isEmpty(),
            check('password', new ErrorModel(errorsConst.authErrors.validatePassword))
                .custom((value, { req }) => userValidators.validatePasswordRules(value, req))
                .custom((value, { req }) => req.body.validPasswordRules),
            check('email', new ErrorModel(errorsConst.userErrors.emailInvalid)).isEmail(),
            check('email', new ErrorModel(errorsConst.userErrors.emailInUse))
                .custom((value, { req }) => userValidators.validateEmailExists(value, req))
                .custom((value, { req }) => req.body.validUser ? false : true),
            check('role', new ErrorModel(errorsConst.userErrors.unregisteredRoleDB))
                .custom((value, { req }) => roleValidators.validateRole(value, req))
                .custom((value, { req }) => req.body.validRole),
            check('phoneNumber', new ErrorModel(errorsConst.userErrors.phoneNumber)).not().isEmpty()
        ];
    },
    checkUpdateUser: () => {
        return [
            check('uid', new ErrorModel(errorsConst.userErrors.invalidId)).isMongoId(),
            check('uid').custom((value, { req }) => userValidators.validateUserByID(value, req)),
            check('uid', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value, { req }) => userValidators.validateUserGoogleByID(value, req))
                .custom((value, { req }) => req.body.user),
            check('role', new ErrorModel(errorsConst.userErrors.unregisteredRoleDB))
                .custom((value, { req }) => roleValidators.validateRole(value, req))
                .custom((value, { req }) => req.body.validRole)
        ];
    },
    checkDeleteUser: () => {
        return [
            authValidators.validateJWT,
            check('user', new ErrorModel(errorsConst.userErrors.adminRole))
                .custom((value, { req }) => req.user.role == roleConst.ADMIN_ROLE),
            check('uid', new ErrorModel(errorsConst.userErrors.invalidId)).isMongoId(),
            check('uid').custom((value, { req }) => userValidators.validateUserByID(value, req)),
            check('uid', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value, { req }) => userValidators.validateUserGoogleByID(value, req))
                .custom((value, { req }) => req.body.user)
        ]
    },
    checkGetUser: () => {
        return [
            check('uid', new ErrorModel(errorsConst.userErrors.idNotExist)).isMongoId(),
            check('uid').custom((value, { req }) => userValidators.validateUserStateByID(value, req)),
            check('uid', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value, { req }) => userValidators.validateUserGoogleStateByID(value, req))
                .custom((value, { req }) => req.body.user),
        ];
    }

};