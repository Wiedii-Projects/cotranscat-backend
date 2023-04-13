// Controllers
const { indicativeNumberController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

// Checks - middleware
const { indicativeNumberMiddleware } = require('../middleware/index.checks.middleware');

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');


const router = Router();

router.post('/', [
    indicativeNumberMiddleware.checkCreateIndicativeNumber(),
    sharedValidators.validateErrorFields,
], indicativeNumberController.createIndicativeNumber);

router.get('/', [
    indicativeNumberMiddleware.checkAdministratorCredentials(),
    sharedValidators.validateErrorFields,
], indicativeNumberController.getAllIndicativeNumber);

router.put('/:id', [
    indicativeNumberMiddleware.checkAdministratorCredentials(),
    sharedValidators.validateErrorFields,
], indicativeNumberController.updateIndicativeNumber);

router.delete('/:id', [
    indicativeNumberMiddleware.checkAdministratorCredentials(),
    sharedValidators.validateErrorFields,
], indicativeNumberController.deleteIndicativeNumber);

module.exports = router;