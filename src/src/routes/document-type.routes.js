// Controllers
const { documentTypeController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

// Checks - middleware
const { documentTypeMiddleware } = require('../middleware/index.checks.middleware');

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware');


const router = Router();

router.post('/', [
    documentTypeMiddleware.checkCreateDocumentType(),
    sharedValidators.validateErrorFields,
], documentTypeController.createDocumentType);

router.get('/', [
    documentTypeMiddleware.checkAdministratorCredentials(),
    sharedValidators.validateErrorFields,
], documentTypeController.getAllDocumentTypes);

router.put('/:id', [
    documentTypeMiddleware.checkAdministratorCredentials(),
    sharedValidators.validateErrorFields,
], documentTypeController.updateDocumentType);

router.delete('/:id', [
    documentTypeMiddleware.checkAdministratorCredentials(),
    sharedValidators.validateErrorFields,
], documentTypeController.deleteDocumentType);

module.exports = router;