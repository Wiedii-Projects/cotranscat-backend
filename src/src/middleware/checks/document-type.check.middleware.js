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
            check('name')
            .isString().withMessage(new ErrorModel(errorsConst.documentType.nameRequired))
            .isLength({min: 2}).withMessage(new ErrorModel(errorsConst.documentType.lengthName))
        ]
    }
}