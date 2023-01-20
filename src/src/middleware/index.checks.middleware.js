// Checks - middleware
const authMiddleware = require('./checks/auth.check.middleware')
const userMiddleware = require('./checks/user.check.middleware')

module.exports = {
    authMiddleware,
    userMiddleware
}