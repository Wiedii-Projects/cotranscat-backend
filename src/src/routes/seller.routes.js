// Controllers
const { sellerController } = require('../controllers/index.controllers')

// Checks - middleware
const { sellerMiddleware, sharedMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.post('/', [
    sellerMiddleware.checkCreateSeller(),
], sellerController.createSeller);

router.get('/',sellerController.getAllSeller);

router.get('/:id',[sharedMiddleware.checkId()],sellerController.getSeller);

module.exports = router;