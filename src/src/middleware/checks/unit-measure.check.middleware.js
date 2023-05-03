// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const { sharedValidators } = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateUnitMeasure: () => {
        return [
            check('name')
                .isString().withMessage(new ErrorModel(errorsConst.unitMeasureErrors.nameRequired)).bail()
                .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.unitMeasureErrors.lengthName)),
            sharedValidators.validateError,
        ]
    },
    checkUpdateUnitMeasure: () => {
        return [
            check('name').optional({ checkFalsy: false })
                .isString().withMessage(new ErrorModel(errorsConst.unitMeasureErrors.nameInvalid)).bail()
                .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.unitMeasureErrors.lengthName)),
            sharedValidators.validateError,
        ]
    },
}