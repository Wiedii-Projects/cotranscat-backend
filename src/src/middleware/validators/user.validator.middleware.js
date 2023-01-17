// Helpers
const authHelpers = require('./../../helpers/auth.helpers')

// Queries
const { userQuery, userGoogleQuery } = require('./../../models/index.queries')

module.exports = {
    showUser: async (value, req) => {
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
    showUserGoogle: async (value, req) => {
        req.body.userGoogle = await userGoogleQuery.getUserGoogleQuery(value);
    },
    showUserID: async (value, req) => {
        req.body.user = undefined;
        req.body.user = await userQuery.getUserIDQuery(value);
    },
    validPasswordRules: async (password = '', req) => {
        if (req.body.validPasswordRules !== false) {
            req.body.validPasswordRules = !(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/) === null);
        }
    },
    showUserIdState: async (value, req) => {
        req.body.user = await userQuery.getUserIdStateQuery(value);
    },
    showUserGoogleIdState: async (value, req) => {
        req.body.user = await userQuery.getUserIdStateQuery(value) || req.body.user;
    },
    validEmailExists: async (email, req) => {
        req.body.user = await userQuery.emailExistsQuery(email);
        req.body.userGoogle = await userGoogleQuery.emailGoogleExistsQuery(email);
        req.body.validUser = (req.body.user || req.body.userGoogle);
    },
    showUserGoogleID: async (value, req) => {
        req.body.user = await userGoogleQuery.getUserGoogleIDQuery(value) || req.body.user;
    },
    extractUserData: async (req) => {
        const { _id, password, name, email, google, lastName, socialStratification, identificationNumber, dateBirth, phoneNumber, ...body } = req.body;
        req.body.dataUpdate = { _id, password, email, google, name, lastName, socialStratification, identificationNumber, dateBirth, phoneNumber };
    }
}