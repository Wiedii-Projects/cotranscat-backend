// Controllers
const { adminController } = require('../controllers/index.controllers')

// Checks - middleware
const { sharedMiddleware, adminMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');

const router = Router();

router.post('/', [
    adminMiddleware.checkCreateAdmin(),
    sharedValidators.validateErrorFields,
], adminController.createAdmin);

router.get('/', [
    sharedMiddleware.checkAdminRole(),
    sharedValidators.validateErrorFields,
], adminController.getAllAdmin);

router.put('/:id', [
    adminMiddleware.checkUpdateAdmin(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], adminController.updateAdmin);

router.delete('/:id', [
    sharedMiddleware.checkAdminRole(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], adminController.deleteAdmin);

module.exports = router;