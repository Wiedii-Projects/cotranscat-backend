// Controllers
const { routeController } = require('../controllers/index.controllers')

// Checks - middleware
const { routeMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    routeMiddleware.checkCreateRoute(),
], routeController.createRoute);

router.get('/', [
    routeMiddleware.checkGetAllRouteAccordingHeadquarter(),
], routeController.getAllRoute);

module.exports = router;