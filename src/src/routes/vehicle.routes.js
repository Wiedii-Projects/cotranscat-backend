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

router.get('/filter/travel/', [
], vehicleController.findVehiclesByStateTravel)

router.get('/filter/all/availableVehicleToTravel/', [
    vehicleMiddleware.checkGetAllVehiclesAvailableToTravel(),
], vehicleController.findAllVehiclesAvailableToTravel)

router.get('/:id', [
    vehicleMiddleware.checkGetVehicle(),
], vehicleController.getVehicle)

router.get('/filter/:value', [
], vehicleController.filterVehicle)

router.get('/all/findAllVehiclesAvailableTravelOptional/', [
    vehicleMiddleware.checkGetAllVehiclesAvailableTravelOptional(),
], vehicleController.findAllVehiclesAvailableTravelOptional)

module.exports = router