// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateDocumentType: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.documentType.nameRequired)).isString(),
            check('name', new ErrorModel(errorsConst.documentType.lengthName)).isLength({ min: 2 }),
        ]
    }
}