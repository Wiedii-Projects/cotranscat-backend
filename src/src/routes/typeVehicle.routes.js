// Controllers
const { typeVehicleController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/', [
], typeVehicleController.getAllTypeVehicle);

module.exports = router;