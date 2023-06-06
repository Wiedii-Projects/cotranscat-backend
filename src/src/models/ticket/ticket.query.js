// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const {
  Ticket,
} = require("../index.models");

module.exports = {
  createNewTicketQuery: async (where, transaction) => {
    try {
      return await Ticket.bulkCreate(where);
    } catch {
      throw errorsConst.userErrors.queryErrors.createError;
    }
  },
};
