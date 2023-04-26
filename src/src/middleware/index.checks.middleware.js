module.exports = {
    authMiddleware: require('./checks/auth.check.middleware'),
    userMiddleware: require('./checks/user.check.middleware'),
    documentTypeMiddleware: require('./checks/document-type.check.middleware'),
    sharedMiddleware: require('./checks/shared.check.middleware'),
    indicativeNumberMiddleware: require('./checks/indicative-number.check.middleware'),
    departmentMiddleware: require('./checks/department.check.middleware'),
    municipalityMiddleware: require('./checks/municipality.check.middleware'),
    paymentMethodMiddleware: require('./checks/payment-method.check.middleware'),
    unitMeasureMiddleware: require('./checks/unit-measure.check.middleware'),
    shippingTypeMiddleware: require('./checks/shipping-type.check.middleware'),
    vehicleMiddleware: require('./checks/vehicle.check.middleware'),
    adminMiddleware: require('./checks/admin.check.middleware'),
    clientMiddleware: require('./checks/client.check.middleware'),
    driverMiddleware: require('./checks/driver.check.middleware'),
    coordinatorMiddleware: require('./checks/coordinator.check.middleware')
}