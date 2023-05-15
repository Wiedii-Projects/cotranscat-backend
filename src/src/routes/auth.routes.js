// Controllers
const { authController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require("express");

// Checks - middleware
const { authMiddleware } = require('./../middleware/index.checks.middleware')

// Validators - middleware

const router = Router();

router.post('/login', [
    authMiddleware.checkLogin()
], authController.login);

router.post('/validateEmail', [
    authMiddleware.checkValidateEmail()
], authController.validateEmail);

router.post('/changePassword', [
    authMiddleware.checkChangePassword()
], authController.changePassword);

module.exports = router;