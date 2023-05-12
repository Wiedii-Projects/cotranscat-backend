// Controllers
const { userController } = require('../controllers/index.controllers')

// Libraries
const { Router } = require('express');

// Checks - middleware
const { userMiddleware } = require('./../middleware/index.checks.middleware')

// Validators - middleware

const router = Router();

router.delete('/', [
    userMiddleware.checkDeleteUser(),
], userController.deleteUser);

router.get('/filterUsers', [
    userMiddleware.checkFilterUsers(),
], userController.searchUsers);
module.exports = router