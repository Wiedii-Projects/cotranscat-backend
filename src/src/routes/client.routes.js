// Controllers
const { clientController } = require('../controllers/index.controllers')

// Checks - middleware
const { sharedMiddleware, clientMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');

const router = Router();

router.post('/', [
    clientMiddleware.checkCreateClient(),
    sharedValidators.validateErrorFields,
], clientController.createClient);

router.get('/', clientController.getAllClient);

module.exports = router;