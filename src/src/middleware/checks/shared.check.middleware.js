// Constants
const { errorsConst, roleConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - Middleware
const { authValidators, sharedValidators } = require('../index.validators.middleware')

// Helpers
const { sharedHelpers } = require('../../helpers/index.helpers');

const checkJwt = () => {
    return [
        check('x-token')
            .bail().isString().withMessage(new ErrorModel(errorsConst.userErrors.noToken))
            .bail().custom((value, { req }) => authValidators.validateJWT(value, req)),
        sharedValidators.validateError,
        check('isValidToken')
            .bail().custom((value) => value ? true : false).withMessage(new ErrorModel(errorsConst.authErrors.tokenInvalid)),
        sharedValidators.validateError,
        check('user')
            .bail().custom((value) => value.state ? true : false).withMessage( new ErrorModel(errorsConst.userErrors.userNotExist)),
        sharedValidators.validateError
    ];
}

module.exports = {
    checkJwt,
    checkId: () => {
        return [
            check('id')
                .bail().custom((value, { req }) => req.body.decryptId = sharedHelpers.decryptIdDataBase(value)).withMessage(new ErrorModel(errorsConst.userErrors.idRequired))
                .bail().custom((_, { req }) => req.body.decryptId ? true : false).withMessage(new ErrorModel(errorsConst.userErrors.idRequired)),
            sharedValidators.validateError
        ];
    },
    checkAdminRole: () => {
        return [
            ...checkJwt(),
            check('user')
                .bail().custom((value) => value.role.role === roleConst.ADMIN_ROLE).withMessage(new ErrorModel(errorsConst.userErrors.adminRole)),
            sharedValidators.validateError
        ]
    },
    //TODO: create validation of the coordinator role
    //TODO: create validation of the seller role
}