// Controllers
const { documentTypeController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

// Checks - middleware
const { documentTypeMiddleware, sharedMiddleware } = require('../middleware/index.checks.middleware');

const router = Router();

router.post('/', [
    documentTypeMiddleware.checkCreateDocumentType()
], documentTypeController.createDocumentType);

router.get('/', documentTypeController.getAllDocumentTypes);

router.put('/:id', [
    documentTypeMiddleware.checkUpdateDocumentType(),
    sharedMiddleware.checkId()
], documentTypeController.updateDocumentType);

router.delete('/:id', [
    sharedMiddleware.checkId()
], documentTypeController.deleteDocumentType);

module.exports = router;