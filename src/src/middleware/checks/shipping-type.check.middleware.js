// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateShippingType: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.shippingType.nameRequired)).isString().isLength({ min:1, max: 100 }),
        ]
    },
    checkUpdateShippingType: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.shippingType.nameRequired)).isString().isLength({ min:1, max: 100 }),
        ]
    },
}