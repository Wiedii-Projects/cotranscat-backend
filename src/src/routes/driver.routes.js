// Controllers
const { driverController } = require('../controllers/index.controllers')

// Checks - middleware
const { driverMiddleware } = require('../middleware/index.checks.middleware');

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    driverMiddleware.checkCreateDriver(),
], driverController.createDriver);

router.get('/', [
], driverController.getAllDrivers);

router.get('/:id', [
    driverMiddleware.checkDriverExist()
], driverController.getDriver);

router.put('/:id', [
    driverMiddleware.checkUpdateDriver(),
], driverController.updateDriver);

router.put('/inactiveDriver/:id', [
    driverMiddleware.checkDriverExist(),
], driverController.inactiveDriver)

router.post('/assignVehicle', [
    driverMiddleware.checkAssignVehicle(),
], driverController.assignVehicle)

module.exports = router;