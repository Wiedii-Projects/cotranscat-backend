// Controllers
const { countryController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/', [
],countryController.getAllCountry);

module.exports = router;