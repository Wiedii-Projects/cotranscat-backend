// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const { sharedValidators } = require('../index.validators.middleware');
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");


module.exports = {
    checkCreateIndicativeNumber: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('number')
                .bail().isString().withMessage(new ErrorModel(errorsConst.indicativeNumber.numberType))
                .bail().isLength({ min:1, max: 10 }).withMessage(new ErrorModel(errorsConst.indicativeNumber.numberCharacters)),
            sharedValidators.validateError,
            check('country')
                .bail().isString().withMessage(new ErrorModel(errorsConst.indicativeNumber.countryType))
                .bail().isLength({ min:1, max: 50 }).withMessage(new ErrorModel(errorsConst.indicativeNumber.countryCharacters)),
            sharedValidators.validateError,
        ]
    },

    checkUpdateIndicativeNumber: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('number')
                .bail().isString().withMessage(new ErrorModel(errorsConst.indicativeNumber.numberType))
                .bail().isLength({ min:1, max: 10 }).withMessage(new ErrorModel(errorsConst.indicativeNumber.numberCharacters))
                .optional({checkFalsy: false}),
            sharedValidators.validateError,
            check('country')
                .bail().isString().withMessage(new ErrorModel(errorsConst.indicativeNumber.countryType))
                .bail().isLength({ min:1, max: 50 }).withMessage(new ErrorModel(errorsConst.indicativeNumber.countryCharacters))
                .optional({checkFalsy: false}),
            sharedValidators.validateError,
        ]
    }
}