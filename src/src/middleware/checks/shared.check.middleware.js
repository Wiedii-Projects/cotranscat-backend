// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - Middleware
const { authValidators, sharedValidators } = require('../index.validators.middleware')

// Helpers
const { sharedHelpers } = require('../../helpers/index.helpers');

module.exports = {
    checkJwt: () => {
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
    },
    checkId: () => {
        return [
            check('id', new ErrorModel(errorsConst.userErrors.idRequired))
                .custom((value, { req }) => req.body.decryptId = sharedHelpers.decryptIdDataBase(value))
                .custom((_, { req }) => req.body.decryptId ? true : false),
        ];
    }
}