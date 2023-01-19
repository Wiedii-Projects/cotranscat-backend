// Controllers
const authController = require('./../controllers/auth.controllers')

// Libraries
const { Router } = require("express");

// Middleware
const authMiddleware = require('./../middleware/checks/auth.check.middleware')

// Validators - middleware
const sharedValidator = require('./../middleware/validators/shared.validator.middleware')

const router = Router();

router.post('/login', [
    authMiddleware.checkLogin(),
    sharedValidator.validateErrorFields
], authController.login);

router.post('/google', [
    authMiddleware.checkGoogleSignIn(),
    sharedValidator.validateErrorFields
], authController.googleSignIn);

router.post('/validateEmail', [
    authMiddleware.checkValidateEmail(),
    sharedValidator.validateErrorFields
], authController.validateEmail);

router.post('/createCode', [
    authMiddleware.checkCreateCode(),
    sharedValidator.validateErrorFields
], authController.createCode)

router.post('/validateCode', [
    authMiddleware.checkValidateCode(),
    sharedValidator.validateErrorFields
], authController.validateCode);

router.post('/changePassword', [
    authMiddleware.checkChangePassword(),
    sharedValidator.validateErrorFields
], authController.changePassword);

module.exports = router;