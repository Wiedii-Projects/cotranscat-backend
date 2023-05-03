// Controllers
const { userController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require('express');

// Checks - middleware
const { userMiddleware } = require('./../middleware/index.checks.middleware')

// Validators - middleware

const router = Router();

router.get('/', [
    userMiddleware.checkAllGetUser(),
],userController.getUsers);

router.get('/:id', [
    userMiddleware.checkGetUser(),
], userController.getUser);

router.post('/', [
    userMiddleware.checkCreateUser(),
], userController.createUser);

router.post('/createClientUser', [
    userMiddleware.checkCreateClientUser(),
], userController.createClientUser);

router.post('/createAdmin', [
    userMiddleware.checkCreateAdminUser(),
], userController.createAdminUser);

router.put('/', [
    userMiddleware.checkUpdateUser(),
], userController.updateUser);

router.delete('/', [
    userMiddleware.checkDeleteUser(),
], userController.deleteUser);

module.exports = router