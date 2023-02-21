// Constants
const { errorsConst } = require('../constants/index.constants');

// Helpers
const { authHelpers, responseHelpers, codeSmsHelpers } = require('../helpers/index.helpers')

// Libraries
const ObjectId = require('mongoose').Types.ObjectId;

// Models - Queries
const { codeSMSQuery, userQuery } = require('../models/index.queries')

module.exports = {
    login: async (req, res) => {
        const { user } = req.body;

        try {
            const token = await authHelpers.generateJWTHelper(user.id);
            return responseHelpers.responseSuccess(res, { user, token });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    googleSignIn: async (req, res) => {
        const { user } = req.body;

        try {
            const token = await authHelpers.generateJWTHelper(user.id);
            return responseHelpers.responseSuccess(res, { user, token });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    validateEmail: async (req, res) => {
        const { user, userGoogle } = req.body;

        if (!userGoogle && !user) {
            return responseHelpers.responseError(res, 500, errorsConst.aggregateErrorsApp.errorValidateEmail);
        }

        return responseHelpers.responseSuccess(res, userGoogle || user);
    },
    createCode: async (req, res) => {
        const { user } = req.body;

        try {
            await codeSMSQuery.deleteAllCodeQuery( ObjectId(user.id) )
            const code = await codeSmsHelpers.createSMSHelper(user.phoneNumber)
            await codeSMSQuery.createCodeIDQuery(code, user.id)
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    validateCode: async (req, res) => {
        const { uid } = req.body;

        try {
            await codeSMSQuery.deleteAllCodeQuery(uid);
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    changePassword: async (req, res) => {
        const { password, uid } = req.body;

        try {
            const passwordEncrypt = await authHelpers.encryptPasswordHelper(password);
            await userQuery.updateDataUserQuery(uid, { password: passwordEncrypt });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}