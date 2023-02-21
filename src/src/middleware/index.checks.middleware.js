module.exports = {
    authMiddleware: require('./checks/auth.check.middleware'),
    userMiddleware: require('./checks/user.check.middleware'),
    sharedMiddleware: require('./checks/shared.check.middleware')
}