// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Validators - middleware
const { sharedValidators, roleValidators } = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {

    checkCreateRole: () => [
        check('type')
            .isInt({ min: 0, max: 255 }).withMessage(new ErrorModel(errorsConst.roleErrors.roleTypeInvalid)).bail()
            .custom((type, { req }) => roleValidators.validateRoleType({ type }, req)),
        sharedValidators.validateError,
        check('role', new ErrorModel(errorsConst.roleErrors.roleTypeAlreadyExists)).custom((value) => !value),
        sharedValidators.validateError,
    ],
}