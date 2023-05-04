// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const { sharedValidators } = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");


module.exports = {
    checkCreateIndicativeNumber: () => {
        return [
            check('number')
                .isString().withMessage(new ErrorModel(errorsConst.indicativeNumberErrors.numberRequired)).bail()
                .isLength({ min: 1, max: 10 }).withMessage(new ErrorModel(errorsConst.indicativeNumberErrors.numberSize)),
            sharedValidators.validateError,
            check('country')
                .isString().withMessage(new ErrorModel(errorsConst.indicativeNumberErrors.countryRequired)).bail()
                .isLength({ min: 1, max: 50 }).withMessage(new ErrorModel(errorsConst.indicativeNumberErrors.countrySize)),
            sharedValidators.validateError,
        ]
    },

    checkUpdateIndicativeNumber: () => {
        return [
            check('number').optional({ checkFalsy: false })
                .isString().withMessage(new ErrorModel(errorsConst.indicativeNumberErrors.numberRequired)).bail()
                .isLength({ min: 1, max: 10 }).withMessage(new ErrorModel(errorsConst.indicativeNumberErrors.numberSize)),
            sharedValidators.validateError,
            check('country').optional({ checkFalsy: false })
                .isString().withMessage(new ErrorModel(errorsConst.indicativeNumberErrors.countryRequired)).bail()
                .isLength({ min: 1, max: 50 }).withMessage(new ErrorModel(errorsConst.indicativeNumberErrors.countrySize)),
            sharedValidators.validateError,
        ]
    }
}