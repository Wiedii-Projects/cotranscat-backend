// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const {
  Ticket,
} = require("../index.models");

module.exports = {
  createNewTicketQuery: async (where, invoice, transaction) => {
    try {
      return await Ticket.bulkCreate(where, { transaction, invoice });
    } catch {
      throw errorsConst.ticketErrors.queryErrors.createError;
    }
  },
};
