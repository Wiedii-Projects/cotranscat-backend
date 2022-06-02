const Server = require('./server.models');
const User = require('./user.models');
const Role = require('./role.models');
const UserGoogle = require('./userGoogle.models');
const MessageErrors =  require('./errors.models');
const CodeSms = require('./codeSms.models');

module.exports = {
    Server,
    User,
    Role,
    UserGoogle,
    MessageErrors,
    CodeSms
}