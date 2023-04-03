// Queries
const { userQuery } = require('./../../models/index.queries')

module.exports = {
    validateGetUser: async (value, req) => {
        const [user] = await userQuery.findUserQuery(value);
        req.body.user = user;
    },
    validatePasswordRules: async (password = '', req) => {
        req.body.isValidPassword = !(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/) === null);
    }
}