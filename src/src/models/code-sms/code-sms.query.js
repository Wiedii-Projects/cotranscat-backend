// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { CodeSms } = require('./../index.models')

// Helpers
const { codeSmsHelpers } = require('../../helpers/index.helpers')

module.exports = {
    createCodeIDQuery: async (user) => {
        try {
            await CodeSms.deleteMany({ user: user.id });
            const code = await codeSmsHelpers.createSMSHelper(user.phoneNumber);
            const codeSMS = new CodeSms({ code: code, userCode: user.id });
            await codeSMS.save();
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateCode
        }
    },
    getCodeQuery: async (code, id) => {
        return await CodeSms.findOne({ code: code, userCode: id });
    },
    deleteAllCodeQuery: async (userCode) => {
        try {
            await CodeSms.deleteMany({ userCode });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorDeleteAllCode
        }
    }
}