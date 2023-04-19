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
    sharedValidators.validateErrorFields,
], unitMeasureController.createUnitMeasure);

router.get('/', [
    sharedMiddleware.checkAdminRole(),
    sharedValidators.validateErrorFields,
], unitMeasureController.getAllUnitMeasure);

router.put('/:id', [
    unitMeasureMiddleware.checkUpdateUnitMeasure(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], unitMeasureController.updateUnitMeasure);

router.delete('/:id', [
    sharedMiddleware.checkAdminRole(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], unitMeasureController.deleteUnitMeasure);

module.exports = router;