const errorsConst = require('./errors/errors.json')
const appConst = require('./core/app.const')
const codeSMSConst = require('./core/code-sms.const')
const roleConst = require('./core/role.const')

module.exports = {
    appConst,
    codeSMSConst,
    roleConst,
    ...errorsConst
}