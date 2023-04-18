module.exports = {
    authMiddleware: require('./checks/auth.check.middleware'),
    userMiddleware: require('./checks/user.check.middleware'),
    documentTypeMiddleware: require('./checks/document-type.check.middleware'),
    sharedMiddleware: require('./checks/shared.check.middleware'),
    indicativeNumberMiddleware: require('./checks/indicative-number.check.middleware'),
    departmentMiddleware: require('./checks/department.check.middleware'),
    municipalityMiddleware: require('./checks/municipality.check.middleware'),
    paymentMethodMiddleware: require('./checks/payment-method.check.middleware')
}