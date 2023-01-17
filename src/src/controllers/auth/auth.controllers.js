// Constants
const errorsConst = require('./../../constants/index');

// Helpers
const authHelpers = require('./../../helpers/auth.helpers')
const responseHelpers = require('./../../helpers/response.helpers')

// Models - Queries
const { codeSMSQuery, userQuery} = require('./../../models/index.queries')

module.exports = {
    login: async (req, res) => {
        try {
            const { user } = req.body;
            const token = await authHelpers.generateJWTHelper(user.id);
            return responseHelpers.responseValid(res, { user, token });
        } catch (error) {
            return responseHelpers.responseError(res, 500, errorsConst.authErrors.somethingWentWrong);
        }
    },
    googleSignIn: async (req, res) => {
        try {
            const { user } = req.body;
            const token = await authHelpers.generateJWTHelper(user.id);
            return responseHelpers.responseValid(res, { user, token });
        } catch (error) {
            return responseHelpers.responseError(res, 500, errorsConst.authErrors.tokenNotValidate);
        }
    },
    validateEmail: async (req, res) => {
        try {
            const { user, userGoogle } = req.body;
            return responseHelpers.responseValid(res, userGoogle || user);
        } catch (error) {
            return responseHelpers.responseError(res, 500, errorsConst.authErrors.somethingWentWrong);
        }
    },
    createCode: async (req, res) => {
        try {
            await codeSMSQuery.createCodeIDQuery(req.body.user);
            return responseHelpers.responseValid(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, errorsConst.authErrors.somethingWentWrong);
        }
    },
    validateCode: async (req, res) => {
        try {
            const { uid } = req.body;
            await codeSMSQuery.deleteAllCodeQuery(uid);
            return responseHelpers.responseValid(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, errorsConst.authErrors.somethingWentWrong);
        }
    },
    changePassword: async (req, res) => {
        try {
            const { password, uid } = req.body;
            const passwordEncrypt = await authHelpers.encryptPasswordHelper(password);
            userQuery.updateDataUserQuery(uid, { password: passwordEncrypt });
            return responseHelpers.responseValid(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, errorsConst.authErrors.somethingWentWrong);
        }
    }
}