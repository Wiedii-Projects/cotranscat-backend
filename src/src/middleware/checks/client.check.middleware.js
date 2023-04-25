// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Middleware
const sharedCheckMiddleware = require('./shared.check.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");

module.exports = {
    checkCreateClient: () => {
        return [
            ...sharedCheckMiddleware.checkCreateUser(),
            check('numberPhoneWhatsapp', new ErrorModel(errorsConst.client.numberPhoneWhatsappRequired)).isString().isLength({min: 1, max: 12}),
            check('email', new ErrorModel(errorsConst.client.emailRequired)).isEmail().isLength({min: 1, max: 100}),
            check('address', new ErrorModel(errorsConst.client.addressRequired)).isString().isLength({min: 1, max: 100}),
        ]
    },

    checkUpdateClient: () => {
        return [
            check('nickName', new ErrorModel(errorsConst.admin.nickNameRequired)).isString().isLength({min: 1, max: 100}),
            check('email', new ErrorModel(errorsConst.admin.emailRequired)).isString().isLength({min: 1, max: 100}),
            check('password', new ErrorModel(errorsConst.admin.passwordRequired)).isString().isLength({min: 1, max: 50}),
        ]
    }
}