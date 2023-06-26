// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const Shipping = require("./shipping.model");

module.exports = {
  createShippingQuery: async (where, transaction) => {
    try {
      return await Shipping.create(where, { transaction });
    } catch {
      throw errorsConst.shippingErrors.queryErrors.createError;
    }
  },
  countShippingInvoiceQuery: async(where = {}) => {
    return await Shipping.count(where)
  }
}