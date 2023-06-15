// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - middleware
const { sharedValidators, userValidators, seatValidators, clientValidator, paymentMethodValidators, invoiceValidators } = require('../index.validators.middleware');
const sharedCheckMiddleware = require('./shared.check.middleware');
const sharedHelpers = require('../../helpers/shared.helpers');

module.exports = {
    checkGetInvoice: () => {
        return [
            ...sharedCheckMiddleware.checkJwt(),
            check('idInvoice', new ErrorModel(errorsConst.invoiceErrors.invoiceRequired))
                .custom((value, {req}) => invoiceValidators.validateInvoice({ id: sharedHelpers.decryptIdDataBase(value) }, req))
                .custom((value, {req}) => !!req.body.invoice)
                .withMessage(new ErrorModel(errorsConst.invoiceErrors.invoiceNotGenerated)),
            sharedValidators.validateError,
        ]
    },
    checkGetAllInvoice: () => {
        return [
            ...sharedCheckMiddleware.checkJwt(),
        ]
    },
    checkCreateInvoiceTravel: () => {
        return [
            ...sharedCheckMiddleware.checkJwt(),
            ...sharedCheckMiddleware.checkId(),
            check('decryptId', new ErrorModel(errorsConst.ticketErrors.clientNotExist))
                .isNumeric()
                .custom((id, { req }) => clientValidator.validateClient(req, { id }))
                .custom((_, { req }) => !!req.body.idClient),
        sharedValidators.validateError,
            check("paymentMethod")
                .custom((value, {req}) => paymentMethodValidators.validatePaymentMethod(req, {id: sharedHelpers.decryptIdDataBase(value)}))
                .custom((value, {req}) => !!req.body.idPaymentMethod)
                .withMessage(new ErrorModel(errorsConst.invoiceErrors.paymentMethodRequired)),
            check("price").optional({checkFalsy: false})
                .isFloat().withMessage(new ErrorModel(errorsConst.invoiceErrors.priceRequired)),
            check("tickets")
                .isArray()
                .isLength({min: 1})
                .withMessage(new ErrorModel(errorsConst.invoiceErrors.ticketsRequired)),
        sharedValidators.validateError,
            check("tickets.*.numberPhone")
                .isString().withMessage(new ErrorModel(errorsConst.ticketErrors.numberPhoneRequired)).bail()
                .isLength({ min: 1, max: 12 }).withMessage(new ErrorModel(errorsConst.ticketErrors.phoneNumberCharacter)),
        sharedValidators.validateError,
            check("tickets.*.passengerName")
                .isString()
                .withMessage(new ErrorModel(errorsConst.ticketErrors.passengerNameRequired))
                .bail()
                .isLength({ min: 1, max: 50 })
                .withMessage(new ErrorModel(errorsConst.ticketErrors.namePassengerSize))
                .bail(),
        sharedValidators.validateError,
            check("tickets.*.idSeat")
                .isString().withMessage(new ErrorModel(errorsConst.ticketErrors.idSeatRequired)).bail()
                .custom((value, { req }) => userValidators.decryptId(value, "seat", req))
                .custom((_, { req }) => req.body.seat ? true : false).withMessage(new ErrorModel(errorsConst.ticketErrors.idSeatWrong)).bail()
                .custom(async (value, { req }) => await seatValidators.validateArraySeat( value, req))
                .custom((_, { req }) => req.body.seatExist.find(element => element == false) == undefined).withMessage(new ErrorModel(errorsConst.ticketErrors.idSeatNotExist)),
        sharedValidators.validateError,
        ]
    },
}