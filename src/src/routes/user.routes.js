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

const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check('id', 'The ID does not exist').isMongoId(),
    validateFields
], getUser);

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be at least 6 characters long').isLength({ min: 6 }),
    check('email', 'The email is invalid').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    validateFields
], createUser);

router.put('/:id', [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    validateFields
], updateUser);

router.delete('/:id', [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], deleteUser);

module.exports = router