module.exports = {
    authValidators: require('./validators/auth.validator.middleware'),
    userValidators: require('./validators/user.validator.middleware'),
    roleValidators: require('./validators/role.validator.middleware'),
    sharedValidators: require('./validators/shared.validator.middleware'),
    vehicleValidator: require('./validators/vehicle.validator.middleware'),
    municipalityValidators: require('./validators/municipality.validator.middleware'),
    driverValidator: require('./validators/driver.validator.middleware'),
    travelValidator: require('./validators/travel.validator.middleware'),
    functionalityValidators: require('./validators/functionality.validator.middleware'),
    routeValidator: require('./validators/route.validator.middleware'),
    departmentValidators: require('./validators/department.validator.middleware'),
    seatValidators: require('./validators/seat.validator.middleware')
}