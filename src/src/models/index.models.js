module.exports = {
    // Aggregates Models
    ServerModel: require('./aggregates/server/server.model'),
    ErrorModel: require('./aggregates/error/error.model'),
    // Models
    User: require('./user/user.model'),
    Role: require('./role/role.model'),
    UserGoogle: require('./user-google/user-google.model'),
    CodeSms: require('./code-sms/code-sms.model')
}