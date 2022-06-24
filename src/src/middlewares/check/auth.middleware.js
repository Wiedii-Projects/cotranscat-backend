const { MessageErrors } = require("../../models");
const errors = require("../../errors/errors.json");
const { check } = require('express-validator');
const { 
    showUser, 
    validPassword, 
    validUserGoogle, 
    showUserGoogle, 
    createUserGoogle, 
    showUserID, 
    validCode, 
    validPasswordRules 
} = require("../../helpers/validator/user.validator");
const { validateFields } = require("../validate/validateFields.middlewares");

const checkLogin = () => {
    return [
        check('email', new MessageErrors(errors.auth.emailRequired)).isEmail(),
        check('password', new MessageErrors(errors.auth.passwordRequired)).not().isEmpty(),
        check('password', new MessageErrors(errors.auth.validatePassword))
            .custom((value, { req }) => validPasswordRules(value, req))
            .custom((value, { req }) => req.body.validPasswordRules),
        validateFields,
        check('email', new MessageErrors(errors.auth.incorrectCredentials))
            .custom((value, { req }) => showUser(value, req))
            .custom((value, { req }) => req.body.user?true:false),
        check('user', new MessageErrors(errors.user.userNotExist))
            .custom((value, { req }) =>  req.body.user.state),
        check('password', new MessageErrors(errors.auth.incorrectCredentials))
            .custom((value, { req }) => validPassword(value , req.body.user.password, req))
            .custom((value, { req }) =>  req.body.validPassword), 
    ];
};

const checkGoogleSignIn = () => {
    return [
        check('id_token', new MessageErrors(errors.auth.googleToken)).not().isEmpty(),
        check('id_token', new MessageErrors(errors.auth.googleToken))
            .custom((value, { req }) => validUserGoogle(value, req))
            .custom((value, { req }) => req.body.noVerify),
        check('email', new MessageErrors(errors.auth.incorrectCredentials))
            .custom((value, { req }) => showUserGoogle(value, req))
            .custom((value, { req }) => req.body.userGoogle?true:createUserGoogle()),
        check('user', new MessageErrors(errors.auth.userRemoved))
            .custom((value, { req }) =>  req.body.user.state), 
    ];
} 

const checkValidateEmail = () => {
    return [
        check('email', new MessageErrors(errors.auth.emailRequired)).isEmail(),
        check('email').custom((value, { req }) => showUserGoogle(value, req)),
        check('email').custom((value, { req }) => showUser(value, req)),
        check('user', new MessageErrors(errors.auth.emailExist))
            .custom((value, { req }) => value===null && req.body.userGoogle === null ? false:true), 
        check('user', new MessageErrors(errors.auth.userNotExist))
            .custom((value, { req }) => value?.state===false || req.body.userGoogle?.state === false ? false:true), 
    ];
};

const checkCreateCode = () => {
    return [
        check('uid', new MessageErrors(errors.auth.uidRequired)).not().isEmpty(),
        check('uid', new MessageErrors(errors.user.idNotExist)).isMongoId(),
        check('uid', new MessageErrors(errors.auth.userNotExist))
            .custom((value, { req }) => showUserID(value, req))
            .custom((value, { req }) => req.body.user),
    ];
}

const checkValidateCode = () => {
    return [
        check('code', new MessageErrors(errors.auth.codeRequired)).not().isEmpty(),
        check('code', new MessageErrors(errors.auth.codeNotValid))
            .custom((value, { req }) => validCode(value, req))
            .custom((value, { req }) => req.body.validCode?true:false),
    ];
}

const checkChangePassword = () => {
    return [
        check('password', new MessageErrors(errors.auth.passwordRequired)).not().isEmpty(),
        check('password', new MessageErrors(errors.auth.validatePassword))
            .custom((value, { req }) => validPasswordRules(value, req))
            .custom((value, { req }) => req.body.validPasswordRules),
        check('passwordConfirm', new MessageErrors(errors.auth.passwordConfirmRequired)).not().isEmpty(),
        check('passwordConfirm', new MessageErrors(errors.auth.validatePassword))
            .custom((value, { req }) => validPasswordRules(value, req))
            .custom((value, { req }) => req.body.validPasswordRules),
        check('password', new MessageErrors(errors.auth.passwordNotMatch))
            .custom((value, { req }) => value===req.body.passwordConfirm)
    ];
};

module.exports = {
    checkLogin,
    checkValidateEmail,
    checkChangePassword,
    checkGoogleSignIn,
    checkCreateCode,
    checkValidateCode
}