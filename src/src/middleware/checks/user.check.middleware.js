// Constants
const constants = require('./../../constants/index')
const errorsConst = require('./../../constants/index');

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
                .custom((value, { req }) => userValidators.validPasswordRules(value, req))
                .custom((value, { req }) => req.body.validPasswordRules),
            check('email', new ErrorModel(errorsConst.userErrors.emailInvalid)).isEmail(),
            check('email', new ErrorModel(errorsConst.userErrors.emailInUse))
                .custom((value, { req }) => userValidators.validEmailExists(value, req))
                .custom((value, { req }) => req.body.validUser ? false : true),
            check('role', new ErrorModel(errorsConst.userErrors.unregisteredRoleDB))
                .custom((value, { req }) => roleValidators.validRole(value, req))
                .custom((value, { req }) => req.body.validRole),
            check('phoneNumber', new ErrorModel(errorsConst.userErrors.phoneNumber)).not().isEmpty()
        ];
    },
    checkUpdateUser: () => {
        return [
            check('uid', new ErrorModel(errorsConst.userErrors.invalidId)).isMongoId(),
            check('uid').custom((value, { req }) => userValidators.showUserID(value, req)),
            check('uid', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value, { req }) => userValidators.showUserGoogleID(value, req))
                .custom((value, { req }) => req.body.user),
            check('role', new ErrorModel(errorsConst.userErrors.unregisteredRoleDB))
                .custom((value, { req }) => roleValidators.validRole(value, req))
                .custom((value, { req }) => req.body.validRole)
                .custom((value, { req }) => userValidators.extractUserData(req))
        ];
    },
    checkDeleteUser: () => {
        return [
            authValidators.validateJWT,
            check('user', new ErrorModel(errorsConst.userErrors.adminRole))
                .custom((value, { req }) => req.user.role == constants.roleConst.ADMIN_ROLE),
            check('uid', new ErrorModel(errorsConst.userErrors.invalidId)).isMongoId(),
            check('uid').custom((value, { req }) => userValidators.showUserID(value, req)),
            check('uid', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value, { req }) => userValidators.showUserGoogleID(value, req))
                .custom((value, { req }) => req.body.user)
        ]
    },
    checkGetUser: () => {
        return [
            check('uid', new ErrorModel(errorsConst.userErrors.idNotExist)).isMongoId(),
            check('uid').custom((value, { req }) => userValidators.showUserIdState(value, req)),
            check('uid', new ErrorModel(errorsConst.authErrors.userNotExist))
                .custom((value, { req }) => userValidators.showUserGoogleIdState(value, req))
                .custom((value, { req }) => req.body.user),
        ];
    }

};