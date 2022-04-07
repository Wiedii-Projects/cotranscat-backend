const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth/auth.controllers");
const { validateFields } = require("../middlewares");
const { MessageErrors } = require("../models");
const errors = require("../errors/errors.json");

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

module.exports = router;