// Controllers
const { invoiceController } = require('../controllers/index.controllers')

// Checks - middleware
const { invoiceMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/shipping/', [
    invoiceMiddleware.checkFilterDetailsShipping()
], invoiceController.getInvoiceShipping);

router.post('/shipping/', [
    invoiceMiddleware.checkCreateInvoiceShipping()
], invoiceController.createInvoiceShipping);

router.get('/shipping/all/', [
    invoiceMiddleware.checkGetAllShippingInvoice()
], invoiceController.getAllInvoiceShipping);

router.post('/moneyTransfer/', [
    invoiceMiddleware.checkCreateMoneyTransfer()
], invoiceController.createInvoiceMoneyTransfer);

router.get('/moneyTransfer/all/', [
    invoiceMiddleware.checkGetAllMoneyTransferInvoice()
], invoiceController.getAllInvoiceMoneyTransfer);

router.get('/moneyTransfer/:idInvoice', [
    invoiceMiddleware.checkGetInvoiceMoneyTransfer()
], invoiceController.getInvoiceMoneyTransfer);

router.post('/travel/', [
    invoiceMiddleware.checkCreateInvoiceTravel()
], invoiceController.createInvoiceTravel);

router.get('/travel/all/', [
    invoiceMiddleware.checkGetAllTravelInvoice()
], invoiceController.getAllInvoiceTravel);

router.get('/travel/:idInvoice', [
    invoiceMiddleware.checkGetInvoiceTravel()
], invoiceController.getInvoiceTravel);

module.exports = router;