const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, validateEmail, createCode, validateCode, changePassword } = require("../controllers/auth/auth.controllers");
const { validateFields } = require("../middlewares");
const { MessageErrors } = require("../models");
const errors = require("../errors/errors.json");
const { validateEmailExists } = require("../helpers");

const router = Router();

router.post('/login', [
    check('email', new MessageErrors(errors.auth.emailRequired)).isEmail(),
    check('password', new MessageErrors(errors.auth.passwordRequired)).not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', new MessageErrors(errors.auth.googleToken)).not().isEmpty(),
    validateFields
], googleSignIn);

router.post('/validateEmail', [
    check('email', new MessageErrors(errors.auth.emailRequired)).isEmail(),
    check('email').custom(validateEmailExists),
    validateFields
], validateEmail);

router.post('/createCode', createCode)

router.post('/validateCode', [
    check('code', new MessageErrors(errors.auth.codeRequired)).not().isEmpty(),
], validateCode);

router.post('/changePassword', [
    check('password', new MessageErrors(errors.auth.passwordRequired)).not().isEmpty(),
    check('password', new MessageErrors(errors.auth.validatePassword)).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/),
    check('passwordConfirm', new MessageErrors(errors.auth.passwordConfirmRequired)).not().isEmpty(),
    check('passwordConfirm', new MessageErrors(errors.auth.validatePassword)).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/),
    validateFields
], changePassword);

module.exports = router;