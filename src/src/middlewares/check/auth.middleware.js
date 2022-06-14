const { MessageErrors } = require("../../models");
const errors = require("../../errors/errors.json");
const { check } = require('express-validator');
const { validateEmailExists } = require("../../helpers");

const checkLogin = () => {
    return [
        check('email', new MessageErrors(errors.auth.emailRequired)).isEmail(),
        check('password', new MessageErrors(errors.auth.passwordRequired)).not().isEmpty()
    ];
};

const checkValidateEmail = () => {
    return [
        check('email', new MessageErrors(errors.auth.emailRequired)).isEmail(),
        check('email').custom(validateEmailExists)
    ];
};

const checkChangePassword = () => {
    return [
        check('password', new MessageErrors(errors.auth.passwordRequired)).not().isEmpty(),
        check('password', new MessageErrors(errors.auth.validatePassword)).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/),
        check('passwordConfirm', new MessageErrors(errors.auth.passwordConfirmRequired)).not().isEmpty(),
        check('passwordConfirm', new MessageErrors(errors.auth.validatePassword)).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/)
    ];
};

module.exports = {
    checkLogin,
    checkValidateEmail,
    checkChangePassword
}