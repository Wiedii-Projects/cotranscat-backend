// Controllers
const { paymentMethodController } = require('../controllers/index.controllers')

// Checks - middleware
const { sharedMiddleware, paymentMethodMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');

const router = Router();

router.post('/', [
    paymentMethodMiddleware.checkCreatePaymentMethod(),
    sharedValidators.validateErrorFields,
], paymentMethodController.createPaymentMethod);

router.get('/', [
    sharedMiddleware.checkAdminRole(),
    sharedValidators.validateErrorFields,
], paymentMethodController.getAllPaymentMethod);

router.put('/:id', [
    paymentMethodMiddleware.checkUpdatePaymentMethod(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], paymentMethodController.updatePaymentMethod);

router.delete('/:id', [
    sharedMiddleware.checkAdminRole(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], paymentMethodController.deletePaymentMethod);

module.exports = router;