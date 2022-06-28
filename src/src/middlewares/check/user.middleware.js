const { MessageErrors } = require("../../models");
const errors = require("../../errors/errors.json");
const { check } = require('express-validator');
const { 
    showUserIdState, 
    showUserGoogleIdState, 
    validPasswordRules, 
    validEmailExists, 
    validRole, 
    showUserID, 
    showUserGoogleID, 
    extractUserData 
} = require("../../helpers/validator/user.validator");
const { validateJWT } = require("../validate/validateJwt.middlewares");

const checkGetUser = () => {
    return [
        check('uid', new MessageErrors(errors.user.idNotExist)).isMongoId(),
        check('uid').custom((value, { req }) => showUserIdState(value, req)), 
        check('uid', new MessageErrors(errors.auth.userNotExist))
            .custom((value, { req }) => showUserGoogleIdState(value, req))
            .custom((value, { req }) => req.body.user),
    ];
}

const checkCreateUser = () => {
    return [
        check('name', new MessageErrors(errors.user.nameRequired)).not().isEmpty(),
        check('lastName', new MessageErrors(errors.user.lastNameRequired)).not().isEmpty(),
        check('password', new MessageErrors(errors.auth.validatePassword))
            .custom((value, { req }) => validPasswordRules(value, req))
            .custom((value, { req }) => req.body.validPasswordRules),
        check('email', new MessageErrors(errors.user.emailInvalid)).isEmail(),
        check('email', new MessageErrors(errors.user.emailInUse))
            .custom((value, { req }) => validEmailExists(value, req))
            .custom((value, { req }) => req.body.validUser? false:true),
        check('role', new MessageErrors(errors.user.unregisteredRoleDB))
            .custom((value, { req }) => validRole(value, req))
            .custom((value, { req }) => req.body.validRole),
        check('phoneNumber', new MessageErrors(errors.user.phoneNumber)).not().isEmpty()
    ];
};

const checkUpdateUser = () => {
    return [
        check('uid', new MessageErrors(errors.user.invalidId)).isMongoId(),
        check('uid').custom((value, { req }) => showUserID(value, req)),
        check('uid', new MessageErrors(errors.auth.userNotExist))
            .custom((value, { req }) => showUserGoogleID(value, req))
            .custom((value, { req }) => req.body.user),
        check('role', new MessageErrors(errors.user.unregisteredRoleDB))
            .custom((value, { req }) => validRole(value, req))
            .custom((value, { req }) => req.body.validRole)
            .custom((value, { req }) => extractUserData(req)),
    ];
}

const checkDeleteUser = () => {
    return [
        validateJWT,
        check('user', new MessageErrors(errors.user.adminRole))
            .custom((value, { req }) => req.user.role=="ADMIN_ROLE"),
        check('uid', new MessageErrors(errors.user.invalidId)).isMongoId(),
        check('uid').custom((value, { req }) => showUserID(value, req)),
        check('uid', new MessageErrors(errors.auth.userNotExist))
            .custom((value, { req }) => showUserGoogleID(value, req))
            .custom((value, { req }) => req.body.user)
    ]
}

module.exports = {
    checkCreateUser,
    checkUpdateUser,
    checkDeleteUser,
    checkGetUser
    
};