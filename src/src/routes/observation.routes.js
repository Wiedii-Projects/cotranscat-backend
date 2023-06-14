// Controllers
const { observationController } = require('../controllers/index.controllers');

// Checks - middleware
const { observationMiddleware } = require('../middleware/index.checks.middleware');

// Libraries
const { Router } = require("express");
 
const router = Router();

router.post('/');

router.get('/');

module.exports = router;