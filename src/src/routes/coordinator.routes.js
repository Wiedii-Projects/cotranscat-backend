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

router.get('/:id',[
    sharedMiddleware.checkId()
],coordinatorController.getCoordinator);

// TODO: This endpoint is not documented and is not being used in the project.
router.put('/:id', [
    coordinatorMiddleware.checkUpdateCoordinator(),
    sharedMiddleware.checkId(),
], coordinatorController.updateCoordinator);

module.exports = router;