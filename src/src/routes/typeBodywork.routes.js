// Controllers
const { typeBodyworkController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/', [
], typeBodyworkController.getAllTypeBodywork);

module.exports = router; 