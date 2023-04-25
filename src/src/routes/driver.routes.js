// Controllers
const { driverController } = require('../controllers/index.controllers')

// Checks - middleware
const { driverMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    driverMiddleware.checkCreateDriver(),
], driverController.createDriver);

// router.get('/', [
//     sharedMiddleware.checkAdminRole(),
//     sharedValidators.validateErrorFields,
// ], adminController.getAllAdmin);

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