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
    authMiddleware.checkLogin(),
    sharedValidators.validateErrorFields
], authController.login);

router.post('/google', [
    authMiddleware.checkGoogleSignIn(),
    sharedValidators.validateErrorFields
], authController.googleSignIn);

router.post('/validateEmail', [
    authMiddleware.checkValidateEmail(),
    sharedValidators.validateErrorFields
], authController.validateEmail);

router.post('/createCode', [
    authMiddleware.checkCreateCode(),
    sharedValidators.validateErrorFields
], authController.createCode)

router.post('/validateCode', [
    authMiddleware.checkValidateCode(),
    sharedValidators.validateErrorFields
], authController.validateCode);

router.post('/changePassword', [
    authMiddleware.checkChangePassword(),
    sharedValidators.validateErrorFields
], authController.changePassword);

module.exports = router;