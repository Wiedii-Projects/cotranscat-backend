// Validators - middleware
const authValidators  = require('./validators/auth.validator.middleware')
const userValidators = require('./validators/user.validator.middleware')
const roleValidators = require('./validators/role.validator.middleware')
const codeValidators = require('./validators/code.validator.middleware')
const sharedValidators = require('./validators/shared.validator.middleware')

module.exports = {
    authValidators,
    userValidators,
    roleValidators,
    codeValidators,
    sharedValidators
}