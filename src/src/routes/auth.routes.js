// Controllers
const { authController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

// Checks - middleware
const { authMiddleware } = require('./../middleware/index.checks.middleware')

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware')

const router = Router();

router.post('/login', [
    // TODO: Implement login check validation
], authController.login);

router.post('/validateEmail', [
    authMiddleware.checkValidateEmail(),
    sharedValidators.validateErrorFields
], authController.validateEmail);

router.post('/changePassword', [
    authMiddleware.checkChangePassword(),
    sharedValidators.validateErrorFields
], authController.changePassword);

module.exports = router;