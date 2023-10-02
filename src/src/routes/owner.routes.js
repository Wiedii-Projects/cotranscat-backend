// Controllers
const { ownerController } = require('../controllers/index.controllers')

// Checks - middleware
const { ownerMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    ownerMiddleware.checkCreateOwner()
], ownerController.createOwner);

router.put('/', [
    ownerMiddleware.checkUpdateOwner()
], ownerController.updateOwner)

router.get('/', ownerController.getAllOwner);

module.exports = router;