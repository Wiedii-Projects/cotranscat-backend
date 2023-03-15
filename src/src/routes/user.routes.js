// Controllers
const { userController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require('express');

// Checks - middleware
const { userMiddleware } = require('./../middleware/index.checks.middleware')

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware')

const router = Router();

router.get('/', userController.getUsers);

router.get('/:id', [
    userMiddleware.checkGetUser(),
    sharedValidators.validateErrorFields
], userController.getUser);

router.post('/', [
    userMiddleware.checkCreateUser(),
    sharedValidators.validateErrorFields
], userController.createUser);

router.put('/:id', [
    userMiddleware.checkUpdateUser(),
    sharedValidators.validateErrorFields
], userController.updateUser);

router.delete('/', [
    userMiddleware.checkDeleteUser(),
    sharedValidators.validateErrorFields
], userController.deleteUser);

module.exports = router