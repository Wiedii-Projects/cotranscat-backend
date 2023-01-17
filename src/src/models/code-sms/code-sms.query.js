// Models
const { CodeSms } = require('./../index.models')

// Helpers
const codeSmsHelpers = require('./../../helpers/code-sms.helpers')

module.exports = {
    createCodeIDQuery: async (user) => {
        await CodeSms.deleteMany({ user: user.id });
        const code = await codeSmsHelpers.createSMSHelper(user.phoneNumber);
        const codeSMS = new CodeSms({ code: code, userCode: user.id });
        await codeSMS.save();
    },
    getCodeQuery: async (code, id) => {
        return await CodeSms.findOne({ code: code, userCode: id });
    },
    deleteAllCodeQuery: async (userCode) => {
        await CodeSms.deleteMany({ userCode });
    }
}