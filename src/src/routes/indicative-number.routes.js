// Controllers
const { indicativeNumberController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

// Checks - middleware
const { indicativeNumberMiddleware, sharedMiddleware } = require('../middleware/index.checks.middleware');

// Validators - middleware

const router = Router();

router.post('/', [
    indicativeNumberMiddleware.checkCreateIndicativeNumber(),
], indicativeNumberController.createIndicativeNumber);

router.get('/',[
],indicativeNumberController.getAllIndicativeNumber);

router.put('/:id', [
    indicativeNumberMiddleware.checkUpdateIndicativeNumber(),
    sharedMiddleware.checkId(),
], indicativeNumberController.updateIndicativeNumber);

router.delete('/:id', [
    sharedMiddleware.checkId(),
], indicativeNumberController.deleteIndicativeNumber);

module.exports = router;