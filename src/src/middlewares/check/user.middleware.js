const { MessageErrors } = require("../../models");
const errors = require("../../errors/errors.json");
const { check } = require('express-validator');
const { emailExists, isValidRole, userExistsById } = require("../../helpers");

const checkCreateUser = () => {
    return [
        check('name', new MessageErrors(errors.user.nameRequired)).not().isEmpty(),
        check('lastName', new MessageErrors(errors.user.lastNameRequired)).not().isEmpty(),
        check('password', new MessageErrors(errors.user.validatePassword)).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/),
        check('email', new MessageErrors(errors.user.emailInvalid)).isEmail(),
        check('email').custom(emailExists),
        check('role').custom(isValidRole),
        check('phoneNumber', new MessageErrors(errors.user.phoneNumber)).not().isEmpty()
    ];
};

const checkUpdateUser = () => {
    return [
        check('id', new MessageErrors(errors.user.invalidId)).isMongoId(),
        check('id').custom(userExistsById),
        check('role').custom(isValidRole)
    ];
}

const checkDeleteUser = () => {
    return [
        check('id', new MessageErrors(errors.user.invalidId)).isMongoId(),
        check('id').custom(userExistsById)
    ]
}

module.exports = {
    checkCreateUser,
    checkUpdateUser,
    checkDeleteUser
};