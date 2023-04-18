// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateMunicipality: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.municipality.nameRequired)).isString().isLength({ min:1, max: 50 }),
        ]
    },
    checkUpdateMunicipality: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name', new ErrorModel(errorsConst.municipality.nameRequired)).isString().isLength({ min:1, max: 50 }),
        ]
    },
}