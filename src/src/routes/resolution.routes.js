// Controllers
const { resolutionController } = require('../controllers/index.controllers')

// Checks - middleware
const { resolutionMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    resolutionMiddleware.checkCreateResolution(),
], resolutionController.createResolution);

router.get('/', [
    resolutionMiddleware.checkGetAllResolutionInvoice(),
],resolutionController.getAllResolution);

module.exports = router;