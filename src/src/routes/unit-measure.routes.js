// Controllers
const { unitMeasureController } = require('../controllers/index.controllers')

// Checks - middleware
const { sharedMiddleware, unitMeasureMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');

const router = Router();

router.post('/', [
    unitMeasureMiddleware.checkCreateUnitMeasure(),
], unitMeasureController.createUnitMeasure);

router.get('/', [
], unitMeasureController.getAllUnitMeasure);

router.put('/:id', [
    unitMeasureMiddleware.checkUpdateUnitMeasure(),
    sharedMiddleware.checkId(),
], unitMeasureController.updateUnitMeasure);

router.delete('/:id', [
    sharedMiddleware.checkId(),
], unitMeasureController.deleteUnitMeasure);

module.exports = router;