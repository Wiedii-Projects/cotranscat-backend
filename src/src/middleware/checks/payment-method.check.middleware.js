// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreatePaymentMethod: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.paymentMethod.nameRequired)).isString().isLength({ min:1, max: 100 }),
        ]
    },
    checkUpdatePaymentMethod: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.paymentMethod.nameRequired)).isString().isLength({ min:1, max: 100 }),
        ]
    },
}