// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const { sharedValidators } = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateShippingType: () => {
        return [
            check('name')
                .isString().withMessage(new ErrorModel(errorsConst.shippingTypeErrors.nameRequired)).bail()
                .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.shippingTypeErrors.lengthName)),
            sharedValidators.validateError,
        ]
    },
    checkUpdateShippingType: () => {
        return [
            check('name').optional({ checkFalsy: false })
                .isString().withMessage(new ErrorModel(errorsConst.shippingTypeErrors.nameInvalid)).bail()
                .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.shippingTypeErrors.lengthName)),
            sharedValidators.validateError,
        ]
    },
}