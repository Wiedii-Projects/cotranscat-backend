const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user/user.controllers');
const { isValidRole, emailExists, userExistsById } = require('../helpers');
const { validateFields, validateJWT, isRole } = require('../middlewares');
const { MessageErrors } = require('../models');
const errors = require('../errors/errors.json');

const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check('id', 'The ID does not exist').isMongoId(),
    validateFields
], getUser);

router.post('/', [
    check('name', new MessageErrors(errors.user.nameRequired)).not().isEmpty(),
    check('password', new MessageErrors(errors.user.passwordCharactersLong)).isLength({ min: 6 }),
    check('email', new MessageErrors(errors.user.emailInvalid)).isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    validateFields
], createUser);

router.put('/:id', [
    check('id', new MessageErrors(errors.user.invalidId)).isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    validateFields
], updateUser);

router.delete('/:id', [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('id', new MessageErrors(errors.user.invalidId)).isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], deleteUser);

module.exports = router