// Controllers
const { roleController } = require('../controllers/index.controllers');

// Checks - middleware
const { roleMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");
 
const router = Router();

router.post('/', [
    roleMiddleware.checkCreateRole(),
], roleController.createRole);

router.get('/', roleController.getAllRoles);

module.exports = router;