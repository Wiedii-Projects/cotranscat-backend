// Constants
const { errorsConst } = require('../constants/index.constants');

// Helpers
const { authHelpers, responseHelpers, codeSmsHelpers } = require('../helpers/index.helpers')

// Models - Queries
const { codeSMSQuery, userQuery } = require('../models/index.queries')

module.exports = {
    login: async (req, res) => {
        const { user } = req.body;

        try {
            delete user.password;
            const token = await authHelpers.generateJWTHelper(user.id);
            return responseHelpers.responseSuccess(res, { ...user, token });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    validateEmail: async (req, res) => {
        const { user } = req.body;
        return responseHelpers.responseSuccess(res, user?.state ? true : false);
    },
    createCode: async (req, res) => {
        const { user } = req.body;
        try {
            await codeSMSQuery.deleteAllCodeQuery( user.id )
            const code = await codeSmsHelpers.createSMSHelper(user.phoneNumber)
            await codeSMSQuery.createCodeIDQuery(code, user.id)
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    validateCode: async (req, res) => {
        const { id } = req.body;

        try {
            await codeSMSQuery.deleteAllCodeQuery(id);
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    changePassword: async (req, res) => {
        const { password, id } = req.body;

        try {
            const passwordEncrypt = await authHelpers.encryptPasswordHelper(password);
            await userQuery.updateUserQuery(id, { password: passwordEncrypt });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}