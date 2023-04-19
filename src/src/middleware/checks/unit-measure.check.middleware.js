// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateUnitMeasure: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.unitMeasure.nameRequired)).isString().isLength({ min:1, max: 100 }),
        ]
    },
    checkUpdateUnitMeasure: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.unitMeasure.nameRequired)).isString().isLength({ min:1, max: 100 }),
        ]
    },
}