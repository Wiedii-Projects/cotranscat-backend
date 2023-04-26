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
], adminController.createAdmin);

router.get('/', adminController.getAllAdmin);

router.get('/:id', [sharedMiddleware.checkId()], adminController.getAdmin);

router.put('/:id', [
    adminMiddleware.checkUpdateAdmin(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], adminController.updateAdmin);

module.exports = router;