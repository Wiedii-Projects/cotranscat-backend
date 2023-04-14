// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const { sharedMiddleware } = require('../index.checks.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateIndicativeNumber: () => {
        return [
            ...sharedMiddleware.checkAdminRole(),
            check('number', new ErrorModel(errorsConst.indicativeNumber.numberRequired)).isString().isLength({ min:1, max: 10 }),
            check('country', new ErrorModel(errorsConst.indicativeNumber.countryRequired)).isString().isLength({ min:1, max: 50 }),
        ]
    },
}