const Server = require('./server.models');
const User = require('./user/user.models');
const Role = require('./role/role.models');
const UserGoogle = require('./userGoogle/userGoogle.models');
const MessageErrors =  require('./errors.models');
const CodeSms = require('./codeSms/codeSms.models');

module.exports = {
    Server,
    User,
    Role,
    UserGoogle,
    MessageErrors,
    CodeSms
}