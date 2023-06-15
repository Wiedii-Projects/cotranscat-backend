// Controllers
const { invoiceController } = require('../controllers/index.controllers')

// Checks - middleware
const { invoiceMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    invoiceMiddleware.checkCreateInvoiceTravel()
], invoiceController.createInvoiceTravel);

router.get('/:idInvoice', [
    invoiceMiddleware.checkGetInvoice()
], invoiceController.getInvoice)

router.get('/', [
    invoiceMiddleware.checkGetAllInvoice()
], invoiceController.getAllInvoice)

module.exports = router;