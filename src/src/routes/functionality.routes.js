// Controllers
const { functionalityController } = require('../controllers/index.controllers');

// Checks - middleware
const { functionalityMiddleware } = require('../middleware/index.checks.middleware');
const sharedCheckMiddleware = require('../middleware/checks/shared.check.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    functionalityMiddleware.checkCreateFunctionality(),
], functionalityController.createFunctionality);

router.get('/', functionalityController.getAllFunctionality);

router.put('/:id', [
    functionalityMiddleware.checkUpdateFunctionality(),
], functionalityController.updateFunctionality);

router.delete('/:id', [
    sharedCheckMiddleware.checkId()
], functionalityController.deleteFunctionality);

module.exports = router;