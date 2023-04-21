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
], indicativeNumberController.createIndicativeNumber);

router.get('/',[
    sharedMiddleware.checkJwt()
],indicativeNumberController.getAllIndicativeNumber);

router.put('/:id', [
    indicativeNumberMiddleware.checkUpdateIndicativeNumber(),
    sharedMiddleware.checkId(),
], indicativeNumberController.updateIndicativeNumber);

router.delete('/:id', [
    sharedMiddleware.checkAdminRole(),
    sharedMiddleware.checkId(),
], indicativeNumberController.deleteIndicativeNumber);

module.exports = router;