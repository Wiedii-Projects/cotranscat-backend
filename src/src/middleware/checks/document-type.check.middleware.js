// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedMiddleware = require('./shared.check.middleware')

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateDocumentType: () => {
        return [
            ...sharedMiddleware.checkJwt(),
            ...sharedMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.documentType.nameRequired)).isString(),
            check('name', new ErrorModel(errorsConst.documentType.lengthName)).isLength({ min: 2 }),
        ]
    },
    checkAdministratorCredentials: () => {
        return [
            ...sharedMiddleware.checkJwt(),
            ...sharedMiddleware.checkAdminRole()
        ]
    }
}