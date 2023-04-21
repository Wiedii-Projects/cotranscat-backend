// Controllers
const { indicativeNumberController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

// Checks - middleware
const { indicativeNumberMiddleware, sharedMiddleware } = require('../middleware/index.checks.middleware');

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');


const router = Router();

router.post('/', [
    indicativeNumberMiddleware.checkCreateIndicativeNumber(),
    sharedValidators.validateErrorFields,
], indicativeNumberController.createIndicativeNumber);

router.get('/',[
    sharedMiddleware.checkJwt(),
    sharedValidators.validateErrorFields
],indicativeNumberController.getAllIndicativeNumber);

router.put('/:id', [
    sharedMiddleware.checkAdminRole(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], indicativeNumberController.updateIndicativeNumber);

router.delete('/:id', [
    sharedMiddleware.checkAdminRole(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], indicativeNumberController.deleteIndicativeNumber);

module.exports = router;