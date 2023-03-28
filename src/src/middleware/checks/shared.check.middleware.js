// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - Middleware
const { authValidators, sharedValidators } = require('../index.validators.middleware')

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
    }
}