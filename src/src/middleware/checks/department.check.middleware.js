// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateDepartment: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name')
            .isString().withMessage(new ErrorModel(errorsConst.department.nameRequired))
            .isLength({min: 1, max: 30}).withMessage(new ErrorModel(errorsConst.department.lengthName)),
        ]
    },

    checkUpdateDepartment: () => {
        return [
            ...sharedCheckMiddleware.checkAdminRole(),
            check('name')
            .isString().withMessage(new ErrorModel(errorsConst.department.nameRequired))
            .isLength({min: 1, max: 30}).withMessage(new ErrorModel(errorsConst.department.lengthName)),
        ]
    }
}