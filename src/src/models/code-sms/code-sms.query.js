// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { CodeSms } = require('./../index.models')

module.exports = {
    createCodeIDQuery: async (code, userId) => {
        try {
            const codeSMS = new CodeSms({ code: code, userCode: userId });
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
            await CodeSms.deleteMany({userCode});
        } catch {
            throw errorsConst.aggregateErrorsApp.errorDeleteAllCode
        }
    }
}