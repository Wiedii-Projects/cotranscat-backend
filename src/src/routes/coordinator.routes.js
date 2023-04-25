// Controllers
const { coordinatorController } = require('../controllers/index.controllers')

// Checks - middleware
const { sharedMiddleware, coordinatorMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    coordinatorMiddleware.checkCreateCoordinator(),
], coordinatorController.createCoordinator);

router.get('/',coordinatorController.getAllCoordinator);

router.get('/:id',[sharedMiddleware.checkId()],coordinatorController.getCoordinator);

router.put('/:id', [
    coordinatorMiddleware.checkUpdateCoordinator(),
    sharedMiddleware.checkId(),
], coordinatorController.updateCoordinator);

module.exports = router;