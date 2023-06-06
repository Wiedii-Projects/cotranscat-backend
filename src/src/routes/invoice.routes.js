// Controllers
const { invoiceController } = require('../controllers/index.controllers')

// Checks - middleware
const { invoiceMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    invoiceMiddleware.checkCreateInvoice()
], invoiceController.createInvoice);

module.exports = router;