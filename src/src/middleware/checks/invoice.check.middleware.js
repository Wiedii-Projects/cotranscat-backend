// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - middleware
const { sharedValidators } = require('../index.validators.middleware');

module.exports = {
    checkCreateInvoice: () => {
        return [
            check("tickets")
                .isArray()
                .isLength({min: 1})
                .withMessage(new ErrorModel(errorsConst.invoiceErrors.ticketsRequired)),
            check("tickets.*.numberPhone")
                .isString().withMessage(new ErrorModel(errorsConst.ticketErrors.numberPhoneRequired)).bail()
                .isLength({ min: 1, max: 12 }).withMessage(new ErrorModel(errorsConst.ticketErrors.phoneNumberCharacter)),
            check("tickets.*.passengerName")
                .isString()
                .withMessage(new ErrorModel(errorsConst.ticketErrors.passengerNameRequired))
                .bail()
                .isLength({ min: 1, max: 50 })
                .withMessage(new ErrorModel(errorsConst.ticketErrors.namePassengerSize))
                .bail(),
      sharedValidators.validateError,
        ]
    },
}