// Controllers
const authController = require('./../controllers/auth/auth.controllers')

// Libraries
const { Router } = require("express");

// Middleware
const authMiddleware = require('./../middleware/checks/auth.check.middleware')

// Validators - middleware
const sharedValidator = require('./../middleware/validators/shared.validator.middleware')

const router = Router();

router.post('/login', [
    authMiddleware.checkLogin(),
    sharedValidator.validateFields
], authController.login);

router.post('/google', [
    authMiddleware.checkGoogleSignIn(),
    sharedValidator.validateFields
], authController.googleSignIn);

router.post('/validateEmail', [
    authMiddleware.checkValidateEmail(),
    sharedValidator.validateFields
], authController.validateEmail);

router.post('/createCode', [
    authMiddleware.checkCreateCode(),
    sharedValidator.validateFields
], authController.createCode)

router.post('/validateCode', [
    authMiddleware.checkValidateCode(),
    sharedValidator.validateFields
], authController.validateCode);

router.post('/changePassword', [
    authMiddleware.checkChangePassword(),
    sharedValidator.validateFields
], authController.changePassword);

module.exports = router;