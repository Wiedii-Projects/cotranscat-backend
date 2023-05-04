// Controllers
const { paymentMethodController } = require('../controllers/index.controllers')

// Checks - middleware
const { sharedMiddleware, paymentMethodMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

// Validators - middleware

const router = Router();

router.post('/', [
    paymentMethodMiddleware.checkCreatePaymentMethod(),
], paymentMethodController.createPaymentMethod);

router.get('/', [
], paymentMethodController.getAllPaymentMethod);

router.put('/:id', [
    paymentMethodMiddleware.checkUpdatePaymentMethod(),
    sharedMiddleware.checkId(),
], paymentMethodController.updatePaymentMethod);

router.delete('/:id', [
    sharedMiddleware.checkId(),
], paymentMethodController.deletePaymentMethod);

module.exports = router;