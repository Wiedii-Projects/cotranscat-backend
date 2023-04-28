// Controllers
const { municipalityController } = require('../controllers/index.controllers')

// Checks - middleware
const { sharedMiddleware, municipalityMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');

const router = Router();

router.post('/', [
    municipalityMiddleware.checkCreateMunicipality(),
    sharedValidators.validateErrorFields,
], municipalityController.createMunicipality);

router.get('/',municipalityController.getAllMunicipality);

router.put('/:id', [
    municipalityMiddleware.checkUpdateMunicipality(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], municipalityController.updateMunicipality);

router.delete('/:id', [
    sharedMiddleware.checkAdminRole(),
    sharedMiddleware.checkId(),
    sharedValidators.validateErrorFields,
], municipalityController.deleteMunicipality);

module.exports = router;