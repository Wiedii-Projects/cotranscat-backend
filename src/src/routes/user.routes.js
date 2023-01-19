// Controllers
const userController = require('./../controllers/user.controllers.js')

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
    sharedValidator.validateErrorFields
], userController.getUser);

router.post('/', [
    userMiddleware.checkCreateUser(),
    sharedValidator.validateErrorFields
], userController.createUser);

router.put('/:uid', [
    userMiddleware.checkUpdateUser(),
    sharedValidator.validateErrorFields
], userController.updateUser);

router.delete('/', [
    userMiddleware.checkDeleteUser(),
    sharedValidator.validateErrorFields
], userController.deleteUser);

module.exports = router