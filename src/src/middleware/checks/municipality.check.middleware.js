// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const { sharedValidators } = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateMunicipality: () => {
        return [
            check('name')
                .isString().withMessage(new ErrorModel(errorsConst.municipalityErrors.nameRequired)).bail()
                .isLength({ min: 1, max: 50 }).withMessage(new ErrorModel(errorsConst.municipalityErrors.lengthName)),
            sharedValidators.validateError,
        ]
    },

    checkUpdateMunicipality: () => {
        return [
            check('name').optional({ checkFalsy: false })
                .isString().withMessage(new ErrorModel(errorsConst.municipalityErrors.nameInvalid)).bail()
                .isLength({ min: 1, max: 50 }).withMessage(new ErrorModel(errorsConst.municipalityErrors.lengthName)),
            sharedValidators.validateError,
        ]
    },
}