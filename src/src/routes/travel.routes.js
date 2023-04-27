// Controllers
const { travelController } = require('../controllers/index.controllers')

// Checks - middleware
const { travelMiddleware } = require('../middleware/index.checks.middleware');

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    travelMiddleware.checkCreateDriver()
], travelController.createTravel);

// router.get('/', [
//     //TODO: implementation of role permission validation
//     sharedValidators.validateErrorFields,
// ], driverController.getAllDrivers);

// router.get('/:id', [
//     //TODO: implementation of role permission validation
//     driverMiddleware.checkDriverExist()
// ], driverController.getDriver);

// router.put('/:id', [
//     //TODO: implementation of role permission validation
//     driverMiddleware.checkUpdateDriver(),
// ], driverController.updateDriver);

module.exports = router;