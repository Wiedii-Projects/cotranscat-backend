// Controllers
const userController = require('./../controllers/user/user.controllers.js')

// Libraries
const { Router } = require('express');

// Middleware
const userMiddleware = require('./../middleware/checks/user.check.middleware')

// Validators - middleware
const sharedValidator = require('./../middleware/validators/shared.validator.middleware')

const router = Router();

router.get('/', userController.getUsers);

router.get('/:uid', [
    userMiddleware.checkGetUser(),
    sharedValidator.validateFields
], userController.getUser);

router.post('/', [
    userMiddleware.checkCreateUser(),
    sharedValidator.validateFields
], userController.createUser);

router.put('/:uid', [
    userMiddleware.checkUpdateUser(),
    sharedValidator.validateFields
], userController.updateUser);

router.delete('/', [
    userMiddleware.checkDeleteUser(),
    sharedValidator.validateFields
], userController.deleteUser);

module.exports = router