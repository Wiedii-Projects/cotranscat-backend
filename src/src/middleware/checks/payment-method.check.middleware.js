// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const { sharedValidators } = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreatePaymentMethod: () => {
        return [
            check('name')
                .isString().withMessage(new ErrorModel(errorsConst.paymentMethodErrors.nameRequired)).bail()
                .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.paymentMethodErrors.lengthName)),
            sharedValidators.validateError,
        ]
    },

    checkUpdatePaymentMethod: () => {
        return [
            check('name').optional({ checkFalsy: false })
                .isString().withMessage(new ErrorModel(errorsConst.paymentMethodErrors.nameInvalid)).bail()
                .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.paymentMethodErrors.lengthName)),
            sharedValidators.validateError,
        ]
    },
}