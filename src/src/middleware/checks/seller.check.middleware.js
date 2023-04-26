// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validator
const { sharedValidators } = require('../index.validators.middleware');

module.exports = {
    checkCreateSeller: () => {
        return [
            check('nickName')
                .isString().withMessage(new ErrorModel(errorsConst.seller.nickNameRequired)).bail()
                .isLength({ min:1, max: 100 }).withMessage(new ErrorModel(errorsConst.seller.lengthNickName)).bail(),
            sharedValidators.validateError,
            check('email')
                .isString().withMessage(new ErrorModel(errorsConst.seller.emailRequired)).bail()
                .isEmail().withMessage(new ErrorModel(errorsConst.seller.emailInvalid)).bail()
                .isLength({ min:1, max: 100 }).withMessage(new ErrorModel(errorsConst.seller.emailInvalid)).bail(),
            sharedValidators.validateError,
            check('password')
                .isString().withMessage(new ErrorModel(errorsConst.seller.passwordRequired)).bail()
                .isLength({ min:6, max: 10 }).withMessage(new ErrorModel(errorsConst.seller.passwordInvalid)).bail(),
            sharedValidators.validateError,
        ]
    },

    checkUpdateSeller: () => {
        return [
            check('nickName')
                .isString().withMessage(new ErrorModel(errorsConst.seller.nickNameRequired)).bail()
                .isLength({ min:1, max: 100 }).withMessage(new ErrorModel(errorsConst.seller.lengthNickName)).bail()
                .optional({checkFalsy: false}),
            sharedValidators.validateError,
            check('email')
                .isString().withMessage(new ErrorModel(errorsConst.seller.emailRequired)).bail()
                .isEmail().withMessage(new ErrorModel(errorsConst.seller.emailInvalid)).bail()
                .isLength({ min:1, max: 100 }).withMessage(new ErrorModel(errorsConst.seller.emailInvalid)).bail()
                .optional({checkFalsy: false}),
            sharedValidators.validateError,
            check('password')
                .isString().withMessage(new ErrorModel(errorsConst.seller.passwordRequired)).bail()
                .isLength({ min:6, max: 10 }).withMessage(new ErrorModel(errorsConst.seller.passwordInvalid)).bail()
                .optional({checkFalsy: false}),
            sharedValidators.validateError,
        ]
    }
}