// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const { sharedValidators, departmentValidators } = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");
const { sharedHelpers } = require('../../helpers/index.helpers');

module.exports = {
    checkCreateMunicipality: () => {
        return [
            check('name')
                .isString().withMessage(new ErrorModel(errorsConst.municipalityErrors.nameRequired)).bail()
                .isLength({ min: 1, max: 50 }).withMessage(new ErrorModel(errorsConst.municipalityErrors.nameSize)),
            sharedValidators.validateError,
        ]
    },

    checkGetMunicipality: () => {
        return [
            check('department',new ErrorModel(errorsConst.municipalityErrors.departmentRequired)).bail()
                .custom(async(value, { req }) => await departmentValidators.validateDepartment(req, {where:{id: sharedHelpers.decryptIdDataBase(value)}}))
                .custom((_, { req }) => !!req.body.idDepartment).withMessage(new ErrorModel(errorsConst.municipalityErrors.departmentAlreadyExist)).bail()
                .optional({ checkFalsy: false }),
            sharedValidators.validateError
        ]
    },

    checkUpdateMunicipality: () => {
        return [
            check('name').optional({ checkFalsy: false })
                .isString().withMessage(new ErrorModel(errorsConst.municipalityErrors.nameRequired)).bail()
                .isLength({ min: 1, max: 50 }).withMessage(new ErrorModel(errorsConst.municipalityErrors.nameSize)),
            sharedValidators.validateError,
        ]
    },
}