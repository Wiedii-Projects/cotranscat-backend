const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user/user.controllers');
const { validateFields, validateJWT, isRole } = require('../middlewares');
const { MessageErrors } = require('../models');
const errors = require('../errors/errors.json');
const { checkCreateUser, checkUpdateUser, checkDeleteUser } = require('../middlewares/check/user.middleware');

const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check('id', new MessageErrors(errors.user.idNotExist)).isMongoId(),
    validateFields
], getUser);

router.post('/', [
    checkCreateUser(),
    validateFields
], createUser);

router.put('/:id', [
    checkUpdateUser(),
    validateFields
], updateUser);

router.delete('/:id', [
    validateJWT,
    isRole('ADMIN_ROLE'),
    checkDeleteUser(),
    validateFields
], deleteUser);

module.exports = router