// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const { CodeSms } = require("../index.models");

// Helpers
const { encryptIdDataBase } = require('../../helpers/shared.helpers');

module.exports = {
  createCodeIDQuery: async (codeSMS) => {
    try {
      await CodeSms.create(codeSMS);
    } catch {
      throw errorsConst.aggregateErrorsApp.errorCreateCode;
    }
  },
  findCodeQuery: async (query) => {
    try {
      const {
        where, 
        attributes = [ 'id', 'code', 'userCode']
    } = query;
      return await CodeSms.findOne({ 
          where, 
          raw: true,
          attributes, 
       }).then( code => {
          code.id = encryptIdDataBase(code.id)
          return code
       });
    } catch {
      return false;
    }
  },
  deleteAllCodeQuery: async (where) => {
    try {
      await CodeSms.destroy({
        where,
      });
    } catch {
      throw errorsConst.aggregateErrorsApp.errorDeleteAllCode;
    }
  },
};
