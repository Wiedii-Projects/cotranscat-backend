// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Check - middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Validators - middleware
const { sharedValidators, driverValidator } = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateDriver: () => [
        // TODO: validate role,
        ...sharedCheckMiddleware.checkCreateUser(),
        check('nickName')
            .isString().withMessage(new ErrorModel(errorsConst.driver.nickNameRequired)).bail()
            .isLength({ min: 1, max: 100 }).withMessage(new ErrorModel(errorsConst.driver.nickNameInvalid)),
        sharedValidators.validateError,
        check('email').isString().withMessage(new ErrorModel(errorsConst.driver.emailRequired)).bail()
            .isEmail().withMessage(new ErrorModel(errorsConst.driver.emailInvalid)),
        sharedValidators.validateError,
        check('password')
            .isString().withMessage(new ErrorModel(errorsConst.driver.passwordRequired)).bail()
            .isLength({ min: 6, max: 10 }).withMessage(new ErrorModel(errorsConst.driver.passwordInvalid)),
        sharedValidators.validateError,
    ],
    checkDriverExist: () => [
        ...sharedCheckMiddleware.checkId(),
        check('decryptId', new ErrorModel(errorsConst.driver.driverNotExist))
            .custom((id, { req }) => driverValidator.validateDriver(req, id)).bail()
            .custom((_, { req }) => !!req.body.driver),
        sharedValidators.validateError,
    ],
    checkUpdateDriver: () => [
        // TODO: validate role,
        ...sharedCheckMiddleware.checkId(),
        check('nickName').optional()
            .isString().withMessage(new ErrorModel(errorsConst.driver.nickNameRequired)).bail()
            .isLength({ min: 1, max: 10 }).withMessage(new ErrorModel(errorsConst.driver.nickNameInvalid)),
        sharedValidators.validateError,
        check('email').optional()
            .isString().withMessage(new ErrorModel(errorsConst.driver.emailRequired)).bail()
            .isEmail().withMessage(new ErrorModel(errorsConst.driver.emailInvalid)),
        sharedValidators.validateError,
        check('password').optional()
            .isString().withMessage(new ErrorModel(errorsConst.driver.passwordRequired)).bail()
            .isLength({ min: 6, max: 10 }).withMessage(new ErrorModel(errorsConst.driver.passwordInvalid)),
        sharedValidators.validateError,
    ]
}