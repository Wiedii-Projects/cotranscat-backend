// Controllers
const { vehicleController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require('express');

// Checks - middleware
const { vehicleMiddleware } = require('./../middleware/index.checks.middleware')

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware')

const router = Router();

router.post('/', [
    vehicleMiddleware.checkCreateVehicle(),
    sharedValidators.validateErrorFields
], vehicleController.createVehicle)

router.get('/:id', [
    vehicleMiddleware.checkGetVehicle(),
    sharedValidators.validateErrorFields
], vehicleController.getVehicle)

module.exports = router