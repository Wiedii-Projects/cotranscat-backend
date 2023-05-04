// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - middleware
const { sharedValidators } = require('../index.validators.middleware');

module.exports = {
    checkCreateDocumentType: () => {
        return [
            check('name')
                .isString().withMessage(new ErrorModel(errorsConst.documentTypeErrors.nameRequired)).bail()
                .isLength({ min: 2 }).withMessage(new ErrorModel(errorsConst.documentTypeErrors.nameSize)),
            sharedValidators.validateError,
        ]
    },

    checkUpdateDocumentType: () => {
        return [
            check('name').optional({checkFalsy: false})
                .isString().withMessage(new ErrorModel(errorsConst.documentTypeErrors.nameRequired)).bail()
                .isLength({ min: 2 }).withMessage(new ErrorModel(errorsConst.documentTypeErrors.nameSize)),
            sharedValidators.validateError,
        ]
    }
}