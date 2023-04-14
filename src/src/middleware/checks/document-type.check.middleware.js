// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const { sharedMiddleware } = require('../index.checks.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateDocumentType: () => {
        return [
            ...sharedMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.documentType.nameRequired)).isString(),
            check('name', new ErrorModel(errorsConst.documentType.lengthName)).isLength({ min: 2 }),
        ]
    }
}