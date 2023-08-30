// Controllers
const { licenseCategoryController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

const router = Router();

router.get('/', [
], licenseCategoryController.getAllLicenseCategory);

module.exports = router;