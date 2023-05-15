// Controllers
const { adminController } = require('../controllers/index.controllers')

// Checks - middleware
const { sharedMiddleware, adminMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    adminMiddleware.checkCreateAdmin(),
], adminController.createAdmin);

router.get('/', adminController.getAllAdmin);

router.get('/:id', [
    sharedMiddleware.checkId()
], adminController.getAdmin);

// TODO: This endpoint is not documented and is not being used in the project.
router.put('/:id', [
    adminMiddleware.checkUpdateAdmin(),
    sharedMiddleware.checkId()
], adminController.updateAdmin);

module.exports = router;