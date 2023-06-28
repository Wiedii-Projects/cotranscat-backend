// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const MoneyTransfer = require("./money-transfer.model");

module.exports = {
  createMoneyTransferQuery: async (where, options) => {
    try {
      return await MoneyTransfer.create(where, options);
    } catch {
      throw errorsConst.moneyTransferErrors.queryErrors.createError;
    }
  },
  countMoneyTransferInvoiceQuery: async(where = {}) => {
    return await MoneyTransfer.count(where)
  }
}