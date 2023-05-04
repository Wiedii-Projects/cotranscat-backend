// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Validators - middleware
const { sharedValidators, functionalityValidators } = require('../index.validators.middleware');

// Checks - middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateFunctionality: () => [
        // TODO: validate role,
        check('name')
            .isString().withMessage(new ErrorModel(errorsConst.functionalityErrors.nameRequired)).bail()
            .isLength({ min: 1, max: 10 }).withMessage(new ErrorModel(errorsConst.functionalityErrors.nameSize)).bail()
            .custom((name, { req }) => functionalityValidators.validateFunctionality({ name }, req)),
        sharedValidators.validateError,
        check('functionality', new ErrorModel(errorsConst.functionalityErrors.nameAlreadyExists)).custom((value) => !value),
        sharedValidators.validateError,
    ],

    checkUpdateFunctionality: () => [
        //TODO: role validator functionality.
        ...sharedCheckMiddleware.checkId(),
        check('name').optional({checkFalsy: false})
            .isString().withMessage(new ErrorModel(errorsConst.functionalityErrors.nameRequired)).bail()
            .isLength({ min: 1, max: 10 }).withMessage(new ErrorModel(errorsConst.functionalityErrors.nameSize)).bail()
            .custom((name, { req }) => functionalityValidators.validateFunctionality({ name }, req)),
        sharedValidators.validateError,
        check('functionality', new ErrorModel(errorsConst.functionalityErrors.nameAlreadyExists)).custom((value) => !value),
        sharedValidators.validateError,
    ],
}