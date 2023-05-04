// Controllers
const { clientController } = require('../controllers/index.controllers')

// Checks - middleware
const { clientMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    clientMiddleware.checkCreateClient()
], clientController.createClient);

router.get('/', clientController.getAllClient);

module.exports = router;