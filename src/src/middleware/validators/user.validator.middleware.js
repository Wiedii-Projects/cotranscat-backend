// Helpers
const authHelpers = require('./../../helpers/auth.helpers')

// Queries
const { userQuery, userGoogleQuery } = require('./../../models/index.queries')

module.exports = {
    validateUserByEmail: async (value, req) => {
        req.body.user = await userQuery.getUserQuery(value);
    },
    validUserGoogle: async (id_token, req) => {
        try {
            const { email, name, picture } = await authHelpers.googleVerifyHelper(id_token);
            req.body.email = email;
            req.body.name = name;
            req.body.picture = picture;
        } catch (error) {
            req.body.noVerify = false;
        }
    },
    validateUserGoogleByEmail: async (value, req) => {
        req.body.userGoogle = await userGoogleQuery.getUserGoogleQuery(value);
    },
    validateUserByID: async (value, req) => {
        req.body.user = undefined;
        req.body.user = await userQuery.getUserIDQuery(value);
    },
    validatePasswordRules: async (password = '', req) => {
        if (req.body.validPasswordRules !== false) {
            req.body.validPasswordRules = !(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/) === null);
        }
    },
    validateUserStateByID: async (value, req) => {
        req.body.user = await userQuery.getUserIdStateQuery(value);
    },
    validateUserGoogleStateByID: async (value, req) => {
        req.body.user = await userQuery.getUserIdStateQuery(value) || req.body.user;
    },
    validateEmailExists: async (email, req) => {
        req.body.user = await userQuery.emailExistsQuery(email);
        req.body.userGoogle = await userGoogleQuery.emailGoogleExistsQuery(email);
        req.body.validUser = (req.body.user || req.body.userGoogle);
    },
    validateUserGoogleByID: async (value, req) => {
        req.body.user = await userGoogleQuery.getUserGoogleIDQuery(value) || req.body.user;
    }
}