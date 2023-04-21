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
    sharedValidators.validateErrorFields,
], shippingTypeController.createShippingType);

router.get('/', [
    sharedMiddleware.checkAdminRole(),
    sharedValidators.validateErrorFields,
], shippingTypeController.getAllShippingType);

router.put('/:id', [
    shippingTypeMiddleware.checkUpdateShippingType(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], shippingTypeController.updateShippingType);

router.delete('/:id', [
    sharedMiddleware.checkAdminRole(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], shippingTypeController.deleteShippingType);

module.exports = router;