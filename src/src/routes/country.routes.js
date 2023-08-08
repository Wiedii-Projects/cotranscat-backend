// Controllers
const { countryController } = require('../controllers/index.controllers')

// Checks - middleware
const { departmentMiddleware, sharedMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/', [
],countryController.getAllCountry);

module.exports = router;