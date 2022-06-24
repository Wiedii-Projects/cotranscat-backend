const { Router } = require('express');
const { getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user/user.controllers');
const { 
    checkCreateUser, 
    checkUpdateUser, 
    checkDeleteUser, 
    checkGetUser
 } = require('../middlewares/check/user.middleware');
const { validateFields} = require('../middlewares');


const router = Router();

router.get('/', getUsers);

router.get('/:uid', [
    checkGetUser(),
    validateFields
], getUser);

router.post('/', [
    checkCreateUser(),
    validateFields
], createUser);

router.put('/:uid', [
    checkUpdateUser(),
    validateFields
], updateUser);

router.delete('/', [
    checkDeleteUser(),
    validateFields
], deleteUser);

module.exports = router