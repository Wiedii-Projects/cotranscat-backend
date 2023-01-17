// Aggregates Models
const Server = require('./aggregates/server/server.model');
const ErrorModel =  require('./aggregates/error/error.model');

// Models
const User = require('./user/user.model');
const Role = require('./role/role.model');
const UserGoogle = require('./user-google/user-google.model');
const CodeSms = require('./code-sms/code-sms.model');

module.exports = {
    Server,
    User,
    Role,
    UserGoogle,
    ErrorModel,
    CodeSms
}