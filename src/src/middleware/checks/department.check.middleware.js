// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - middleware
const { sharedValidators } = require('../index.validators.middleware');

module.exports = {
    checkCreateDepartment: () => {
        return [
            check('name')
                .isString().withMessage(new ErrorModel(errorsConst.departmentErrors.nameRequired)).bail()
                .isLength({ min: 1, max: 30 }).withMessage(new ErrorModel(errorsConst.departmentErrors.lengthName)),
            sharedValidators.validateError,
        ]
    },

    checkUpdateDepartment: () => {
        return [
            check('name').optional({checkFalsy: false})
                .isString().withMessage(new ErrorModel(errorsConst.departmentErrors.nameRequired)).bail()
                .isLength({ min: 1, max: 30 }).withMessage(new ErrorModel(errorsConst.departmentErrors.lengthName)),
            sharedValidators.validateError,
        ]
    }
}