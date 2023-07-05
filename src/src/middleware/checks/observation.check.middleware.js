// Constants
const { errorsConst } = require('../../constants/index.constants');

// Libraries
const { check } = require('express-validator');

// Validators - middleware
const { sharedValidators } = require('../index.validators.middleware');

// Models
const { ErrorModel } = require("../../models/index.models");
const invoiceValidatorMiddleware = require('../validators/invoice.validator.middleware');
const sharedHelpers = require('../../helpers/shared.helpers');
const sharedCheckMiddleware = require('./shared.check.middleware');

module.exports = {
    checkCreateObservation: () => [
        ...sharedCheckMiddleware.checkJwt(),
            check('description', new ErrorModel(errorsConst.observationErrors.descriptionRequired)).isString(),
            check('idInvoice', new ErrorModel(errorsConst.invoiceErrors.invoiceRequired))
                .custom((value, {req}) => invoiceValidatorMiddleware.validateInvoiceExist({ id: sharedHelpers.decryptIdDataBase(value) }, req))
                .custom((value, {req}) => !!req.body.invoice)
                .withMessage(new ErrorModel(errorsConst.invoiceErrors.invoiceNotGenerated)),
            sharedValidators.validateError,
    ],
    checkObservation: () => [
        ...sharedCheckMiddleware.checkJwt(),
            check('idInvoice', new ErrorModel(errorsConst.invoiceErrors.invoiceRequired))
                .custom((value, {req}) => invoiceValidatorMiddleware.validateInvoiceExist({ id: sharedHelpers.decryptIdDataBase(value) }, req))
                .custom((value, {req}) => !!req.body.invoice)
                .withMessage(new ErrorModel(errorsConst.invoiceErrors.invoiceNotGenerated)),
            sharedValidators.validateError,
    ],
}