// Controllers
const { bloodTypeController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/', [
], bloodTypeController.getAllBloodType);

module.exports = router;