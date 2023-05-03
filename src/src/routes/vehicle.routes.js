// Controllers
const { vehicleController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require('express');

// Checks - middleware
const { vehicleMiddleware } = require('./../middleware/index.checks.middleware')

// Validators - middleware

const router = Router();

router.post('/', [
    vehicleMiddleware.checkCreateVehicle(),
], vehicleController.createVehicle)

router.get('/:id', [
    vehicleMiddleware.checkGetVehicle(),
], vehicleController.getVehicle)

module.exports = router