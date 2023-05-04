// Controllers
const { shippingTypeController } = require('../controllers/index.controllers')

// Checks - middleware
const { sharedMiddleware, shippingTypeMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');

const router = Router();

router.post('/', [
    shippingTypeMiddleware.checkCreateShippingType(),
], shippingTypeController.createShippingType);

router.get('/', [
], shippingTypeController.getAllShippingType);

router.put('/:id', [
    shippingTypeMiddleware.checkUpdateShippingType(),
    sharedMiddleware.checkId(),
], shippingTypeController.updateShippingType);

router.delete('/:id', [
    sharedMiddleware.checkId(),
], shippingTypeController.deleteShippingType);

module.exports = router;