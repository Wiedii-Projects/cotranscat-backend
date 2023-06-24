// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const Shipping = require("./shipping.model");

module.exports = {
  createShippingQuery: async (where, transaction) => {
    try {
      return await Shipping.create(where, { transaction });
    } catch (e){
        console.log(e)
      throw errorsConst.shippingErrors.queryErrors.createError;
    }
  }
}