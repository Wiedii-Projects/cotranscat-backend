// Constants
const { errorsConst } = require("../../constants/index.constants");

const Invoice = require("./invoice.model");

module.exports = {
  createNewInvoiceQuery: async (where, transaction) => {
    try {
      return await Invoice.create(where, { transaction });
    } catch {
      throw errorsConst.userErrors.queryErrors.createError;
    }
  },
};