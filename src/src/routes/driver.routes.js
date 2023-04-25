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
    //TODO: implementation of role permission validation
    sharedValidators.validateErrorFields,
], driverController.getAllDrivers);

router.get('/:id', [
    //TODO: implementation of role permission validation
    driverMiddleware.checkDriverExist()
], driverController.getDriver);

// router.put('/:id', [
//     adminMiddleware.checkUpdateAdmin(),
//     sharedMiddleware.checkId(),
//     sharedValidators.validateErrorFields,
// ], adminController.updateAdmin);

// router.delete('/:id', [
//     sharedMiddleware.checkAdminRole(),
//     sharedMiddleware.checkId(),
//     sharedValidators.validateErrorFields,
// ], adminController.deleteAdmin);

module.exports = router;