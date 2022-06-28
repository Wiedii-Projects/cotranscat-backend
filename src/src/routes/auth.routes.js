const { Router } = require("express");
const { 
    login, 
    googleSignIn, 
    validateEmail, 
    createCode, 
    validateCode, 
    changePassword 
} = require("../controllers/auth/auth.controllers");
const { 
    checkLogin, 
    checkValidateEmail, 
    checkChangePassword, 
    checkGoogleSignIn, 
    checkCreateCode, 
    checkValidateCode 
} = require("../middlewares/check/auth.middleware");
const { validateFields } = require("../middlewares");


const router = Router();

router.post('/login', [
    checkLogin(),
    validateFields
], login);

router.post('/google', [
    checkGoogleSignIn(),
    validateFields
], googleSignIn);

router.post('/validateEmail', [
    checkValidateEmail(),
    validateFields
], validateEmail);

router.post('/createCode', [
    checkCreateCode(),
    validateFields
], createCode)

router.post('/validateCode', [
    checkValidateCode(),
    validateFields
], validateCode);

router.post('/changePassword', [
    checkChangePassword(),
    validateFields
], changePassword);

module.exports = router;