// Controllers
const { typeFuelController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/', [
], typeFuelController.getAllTypeFuel);

module.exports = router;