// Controllers
const { userController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require('express');

// Checks - middleware
const { userMiddleware } = require('./../middleware/index.checks.middleware')

// Validators - middleware
const { sharedValidators } = require('../middleware/index.validators.middleware')

const router = Router();

router.get('/', [
    userMiddleware.checkAllGetUser(),
    sharedValidators.validateErrorFields
],userController.getUsers);

router.get('/:id', [
    userMiddleware.checkGetUser(),
    sharedValidators.validateErrorFields
], userController.getUser);

router.post('/', [
    userMiddleware.checkCreateUser(),
    sharedValidators.validateErrorFields
], userController.createUser);

router.post('/createClientUser', [
    userMiddleware.checkCreateClientUser(),
    sharedValidators.validateErrorFields
], userController.createClientUser);

router.post('/createAdmin', [
    userMiddleware.checkCreateAdminUser(),
    sharedValidators.validateErrorFields
], userController.createAdminUser);

router.put('/', [
    userMiddleware.checkUpdateUser(),
    sharedValidators.validateErrorFields
], userController.updateUser);

router.delete('/', [
    userMiddleware.checkDeleteUser(),
    sharedValidators.validateErrorFields
], userController.deleteUser);

module.exports = router