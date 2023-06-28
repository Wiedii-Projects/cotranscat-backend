// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Models
const { ErrorModel } = require("../../models/index.models");

// Validators - middleware
const { 
    sharedValidators, userValidators, seatValidators, clientValidator, paymentMethodValidators, 
    invoiceValidators, unitMeasureValidators, shippingTypeValidators 
} = require('../index.validators.middleware');
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
                .custom((id, { req }) => clientValidator.validateClient(req, { id }, "idClient"))
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
    checkCreateMoneyTransfer: () => [
        ...sharedCheckMiddleware.checkJwt(),
        check("idClientSends")
            .isString()
            .withMessage(new ErrorModel(errorsConst.invoiceErrors.clientRequired))
            .bail(),
        sharedValidators.validateError,
        check("idClientSends")
            .custom((value, {req}) => clientValidator.validateClient(req, {id: sharedHelpers.decryptIdDataBase(value)}, "clientSend"))
            .custom((value, {req}) => !!req.body.clientSend)
            .withMessage(new ErrorModel(errorsConst.invoiceErrors.clientNotExist))
            .bail(),
        sharedValidators.validateError,
        check("idClientReceives")
            .isString()
            .withMessage(new ErrorModel(errorsConst.shippingErrors.clientReceivesRequired))
            .bail(),
        sharedValidators.validateError,
        check("idClientReceives")
            .custom((value, {req}) => clientValidator.validateClient(req, {id: sharedHelpers.decryptIdDataBase(value)}, "clientReceives"))
            .custom((value, {req}) => !!req.body.clientReceives)
            .withMessage(new ErrorModel(errorsConst.shippingErrors.clientReceivesNotExist))
            .bail(),
        sharedValidators.validateError,
        check('amountMoney').isDecimal({ decimal_digits: '0,2' }).withMessage(new ErrorModel(errorsConst.moneyTransferErrors.amountMoneyRequired)).bail(),
        check('cost').isDecimal({ decimal_digits: '0,2' }).withMessage(new ErrorModel(errorsConst.moneyTransferErrors.costRequired)).bail(),
        check('iva').isDecimal({ decimal_digits: '0,2' }).withMessage(new ErrorModel(errorsConst.moneyTransferErrors.ivaRequired)).bail(),
        sharedValidators.validateError,
    ],
    checkCreateInvoiceShipping: () => {
        return [
            ...sharedCheckMiddleware.checkJwt(),
            check("paymentMethod")
                .isString()
                .withMessage(new ErrorModel(errorsConst.shippingErrors.paymentMethodNotExist))
                .bail(),
            check("paymentMethod")
                .custom((value, {req}) => paymentMethodValidators.validatePaymentMethod(req, {id: sharedHelpers.decryptIdDataBase(value)}))
                .custom((value, {req}) => !!req.body.idPaymentMethod)
                .withMessage(new ErrorModel(errorsConst.shippingErrors.paymentMethodRequired))
                .bail(),
            sharedValidators.validateError,
            check("depth")
                .isInt( { min: 1})
                .withMessage(new ErrorModel(errorsConst.shippingErrors.depthRequired))
                .bail(),
            sharedValidators.validateError,
            check("weight")
                .isInt( { min: 1})
                .withMessage(new ErrorModel(errorsConst.shippingErrors.weightRequired))
                .bail(),
            sharedValidators.validateError,
            check("width")
                .isInt( { min: 1})
                .withMessage(new ErrorModel(errorsConst.shippingErrors.widthRequired))
                .bail(),
            sharedValidators.validateError,
            check("high")
                .isInt( { min: 1})
                .withMessage(new ErrorModel(errorsConst.shippingErrors.highRequired))
                .bail(),
            sharedValidators.validateError,
            check("declaredValue")
                .isInt( { min: 0})
                .withMessage(new ErrorModel(errorsConst.shippingErrors.declaredValueRequired))
                .bail(),
            sharedValidators.validateError,
            check("insuranceCost")
                .isInt( { min: 1})
                .withMessage(new ErrorModel(errorsConst.shippingErrors.insuranceCostRequired))
                .bail(),
            sharedValidators.validateError,
            check("costShipping")
                .isInt( { min: 1})
                .withMessage(new ErrorModel(errorsConst.shippingErrors.costShippingRequired))
                .bail(),
            sharedValidators.validateError,
            check("price")
                .isFloat( { min: 1})
                .withMessage(new ErrorModel(errorsConst.invoiceErrors.priceRequired))
                .bail(),
            sharedValidators.validateError,
            check('content')
                .customSanitizer((value) => value.toString()) 
                .isLength({min: 1})
                .withMessage(new ErrorModel(errorsConst.shippingErrors.contentRequired))
                .bail(),
            sharedValidators.validateError,
            check('isHomeDelivery')
                .customSanitizer((value) => {
                    if (typeof value === 'string') return parseInt(value, 10)
                    return value;
                })
                .isInt().withMessage(new ErrorModel(errorsConst.shippingErrors.isHomeDeliveryRequired))
                .isIn([0, 1]).withMessage(new ErrorModel(errorsConst.shippingErrors.isHomeDeliveryInvalidValue))
                .bail(),
            sharedValidators.validateError,
            check("idClientSends")
                .isString()
                .withMessage(new ErrorModel(errorsConst.invoiceErrors.clientRequired))
                .bail(),
            sharedValidators.validateError,
            check("idClientSends")
                .custom((value, {req}) => clientValidator.validateClient(req, {id: sharedHelpers.decryptIdDataBase(value)}, "clientSend"))
                .custom((value, {req}) => !!req.body.clientSend)
                .withMessage(new ErrorModel(errorsConst.invoiceErrors.clientNotExist))
                .bail(),
            sharedValidators.validateError,
            check("idClientReceives")
                .isString()
                .withMessage(new ErrorModel(errorsConst.shippingErrors.clientReceivesRequired))
                .bail(),
            sharedValidators.validateError,
            check("idClientReceives")
                .custom((value, {req}) => clientValidator.validateClient(req, {id: sharedHelpers.decryptIdDataBase(value)}, "clientReceives"))
                .custom((value, {req}) => !!req.body.clientReceives)
                .withMessage(new ErrorModel(errorsConst.shippingErrors.clientReceivesNotExist))
                .bail(),
            sharedValidators.validateError,
            check("idShippingType")
                .isString()
                .withMessage(new ErrorModel(errorsConst.shippingErrors.shippingTypeRequired))
                .bail(),
            sharedValidators.validateError,
            check("idShippingType")
                .custom((value, {req}) => shippingTypeValidators.validateShippingType(req, {id: sharedHelpers.decryptIdDataBase(value)}))
                .custom((value, {req}) => !!req.body.shippingType)
                .withMessage(new ErrorModel(errorsConst.shippingErrors.shippingTypeNotExist))
                .bail(),
            sharedValidators.validateError,
            check("idUnitMeasure")
                .isString()
                .withMessage(new ErrorModel(errorsConst.shippingErrors.unitMeasureRequired))
                .bail(),
            sharedValidators.validateError,
            check("idUnitMeasure")
                .custom((value, {req}) => unitMeasureValidators.validateUnitMeasure(req, {id: sharedHelpers.decryptIdDataBase(value)}))
                .custom((value, {req}) => !!req.body.unitMeasure)
                .withMessage(new ErrorModel(errorsConst.shippingErrors.unitMeasureNotExist)),
            sharedValidators.validateError
        ]
    },
    checkFilterDetailsShipping: () => {
      return [
        ...sharedCheckMiddleware.checkJwt(),
        check('filterValue')
          .isString()
          .withMessage(new ErrorModel(errorsConst.shippingErrors.valueToFilterIsRequired))
          .bail()
          .isLength({ min: 1 })
          .withMessage(new ErrorModel(errorsConst.shippingErrors.filterValueIsEmpty)),
          sharedValidators.validateError
      ]
    },
    checkGetAllShippingInvoice: () => {
        return [
            ...sharedCheckMiddleware.checkJwt(),
        ]
    }
}