// Controllers
const { municipalityController } = require('../controllers/index.controllers')

// Checks - middleware
const { sharedMiddleware, municipalityMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

// Validators - middleware

const router = Router();

router.post('/', [
    municipalityMiddleware.checkCreateMunicipality(),
], municipalityController.createMunicipality);

router.get('/',[
    municipalityMiddleware.checkGetMunicipality()
],municipalityController.getMunicipality);

router.put('/:id', [
    municipalityMiddleware.checkUpdateMunicipality(),
    sharedMiddleware.checkId(),
], municipalityController.updateMunicipality);

router.delete('/:id', [
    sharedMiddleware.checkId(),
], municipalityController.deleteMunicipality);

module.exports = router;