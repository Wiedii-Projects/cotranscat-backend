// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - middleware
const { sharedValidators } = require('../index.validators.middleware');
const countryValidatorMiddleware = require('../validators/country.validator.middleware');
const sharedHelpers = require('../../helpers/shared.helpers');

module.exports = {
    checkCreateDepartment: () => {
        return [
            check('name')
                .isString().withMessage(new ErrorModel(errorsConst.departmentErrors.nameRequired)).bail()
                .isLength({ min: 1, max: 30 }).withMessage(new ErrorModel(errorsConst.departmentErrors.nameSize)),
            sharedValidators.validateError,
        ]
    },

    checkFindAllDepartment: () => {
        return [
            check('country',new ErrorModel(errorsConst.departmentErrors.countryRequired)).bail()
                .custom(async(value, { req }) => await countryValidatorMiddleware.validateDepartment(req, {where:{id: sharedHelpers.decryptIdDataBase(value)}}))
                .custom((_, { req }) => !!req.body.idCountry).withMessage(new ErrorModel(errorsConst.departmentErrors.countryDoesNotExist)).bail()
                .optional({ checkFalsy: false }),
            sharedValidators.validateError
        ]
    },

    checkUpdateDepartment: () => {
        return [
            check('name').optional({checkFalsy: false})
                .isString().withMessage(new ErrorModel(errorsConst.departmentErrors.nameRequired)).bail()
                .isLength({ min: 1, max: 30 }).withMessage(new ErrorModel(errorsConst.departmentErrors.nameSize)),
            sharedValidators.validateError,
        ]
    }
}