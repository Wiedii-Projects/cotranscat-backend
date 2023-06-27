// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const MoneyTransfer = require("./money-transfer.model");

module.exports = {
  createMoneyTransferQuery: async (where, transaction) => {
    try {
      return await MoneyTransfer.create(where, { transaction });
    } catch {
      throw errorsConst.moneyTransferErrors.queryErrors.createError;
    }
  },
  countMoneyTransferInvoiceQuery: async(where = {}) => {
    return await MoneyTransfer.count(where)
  }
}