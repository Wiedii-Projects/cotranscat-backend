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
        check('x-token', new ErrorModel(errorsConst.userErrors.noToken)).isString(),
        check('x-token')
            .custom((value, { req }) => authValidators.validateJWT(value, req)),
        check('isValidToken', new ErrorModel(errorsConst.authErrors.tokenInvalid))
            .custom((value) => value ? true : false),
        check('user', new ErrorModel(errorsConst.userErrors.userNotExist))
            .custom((value) => value.state ? true : false),
        sharedValidators.validateErrorFields
    ];
}

module.exports = {
    checkJwt,
    checkId: () => {
        return [
            check('id', new ErrorModel(errorsConst.userErrors.idRequired))
                .custom((value, { req }) => req.body.decryptId = sharedHelpers.decryptIdDataBase(value))
                .custom((_, { req }) => req.body.decryptId ? true : false),
        ];
    },
    checkAdminRole: () => {
        return [
            ...checkJwt(),
            check('user', new ErrorModel(errorsConst.userErrors.adminRole))
                .custom((value) => value.role.role === roleConst.ADMIN_ROLE)
        ]
    },
    //TODO: create validation of the coordinator role
}