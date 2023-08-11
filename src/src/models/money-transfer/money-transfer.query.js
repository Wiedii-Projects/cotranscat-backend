// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const { encryptIdDataBase } = require("../../helpers/shared.helpers");

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
  },
  findOneQuery: async (query) => {
    const {
      where,
      attribute = [ 
        'id', 'amountMoney', 'cost', 'iva', 'idInvoice', 'idClientReceives'
    ],
    } = query;

    try {
      const moneyTransferFound = await MoneyTransfer.findOne({
        where,
        attribute,
        raw: true
      })

      if (!moneyTransferFound) return null

      return {
        id: encryptIdDataBase(moneyTransferFound.id),
        amountMoney: moneyTransferFound.amountMoney,
        cost: moneyTransferFound.cost,
        iva: moneyTransferFound.iva,
        idInvoice: encryptIdDataBase(moneyTransferFound.idInvoice),
        idClientReceives: encryptIdDataBase(moneyTransferFound.idClientReceives)
      }
    } catch {
      throw errorsConst.moneyTransferErrors.queryErrors.findOneError;
    }
  }
}