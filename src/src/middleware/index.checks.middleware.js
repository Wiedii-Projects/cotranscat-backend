module.exports = {
    authMiddleware: require('./checks/auth.check.middleware'),
    userMiddleware: require('./checks/user.check.middleware'),
    documentTypeMiddleware: require('./checks/document-type.check.middleware'),
    sharedMiddleware: require('./checks/shared.check.middleware')
}