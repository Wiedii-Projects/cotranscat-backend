// Controllers
const { invoiceController } = require('../controllers/index.controllers')

// Checks - middleware
const { invoiceMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/shipping/', [
    invoiceMiddleware.checkFilterDetailsShipping()
], invoiceController.getShipping);

router.post('/shipping/', [
    invoiceMiddleware.checkCreateInvoiceShipping()
], invoiceController.createInvoiceShipping);

router.get('/shipping/all/', [
    invoiceMiddleware.checkGetAllShippingInvoice()
], invoiceController.getAllShippingInvoice);

router.post('/moneyTransfer/', [
    invoiceMiddleware.checkCreateMoneyTransfer()
], invoiceController.createInvoiceMoneyTransfer);

router.post('/travel/', [
    invoiceMiddleware.checkCreateInvoiceTravel()
], invoiceController.createInvoiceTravel);

router.get('/travel/all/', [
    invoiceMiddleware.checkGetAllTravelInvoice()
], invoiceController.getAllInvoice);

router.get('/travel/:idInvoice', [
    invoiceMiddleware.checkGetInvoice()
], invoiceController.getInvoice);

module.exports = router;