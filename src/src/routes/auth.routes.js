const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, validateEmail, createCode, validateCode, changePassword } = require("../controllers/auth/auth.controllers");
const { validateFields } = require("../middlewares");
const { MessageErrors } = require("../models");
const errors = require("../errors/errors.json");
const { checkLogin, checkValidateEmail, checkChangePassword } = require("../middlewares/check/auth.middleware");

const router = Router();

router.post('/login', [
    checkLogin(),
    validateFields
], login);

router.post('/google', [
    check('id_token', new MessageErrors(errors.auth.googleToken)).not().isEmpty(),
    validateFields
], googleSignIn);

router.post('/validateEmail', [
    checkValidateEmail(),
    validateFields
], validateEmail);

router.post('/createCode', createCode)

router.post('/validateCode', [
    check('code', new MessageErrors(errors.auth.codeRequired)).not().isEmpty(),
], validateCode);

router.post('/changePassword', [
    checkChangePassword(),
    validateFields
], changePassword);

module.exports = router;