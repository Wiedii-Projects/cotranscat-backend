// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const { CodeSms } = require("../index.models");

module.exports = {
  createCodeIDQuery: async (code, userId) => {
    try {
      await CodeSms.create({ code, userCode: userId });
    } catch {
      throw errorsConst.aggregateErrorsApp.errorCreateCode;
    }
  },
  getCodeQuery: async (code, id) => {
    try {
      return await CodeSms.findOne({ where: { code: code, userCode: id } });
    } catch {
      return false;
    }
  },
  deleteAllCodeQuery: async (userCode) => {
    try {
      await CodeSms.destroy({
        where: { userCode },
      });
    } catch (e){
      console.log(e)
      throw errorsConst.aggregateErrorsApp.errorDeleteAllCode;
    }
  },
};
