// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const {
  Ticket,
} = require("../index.models");

module.exports = {
  createNewTicketQuery: async (where, options) => {
    try {
      return await Ticket.bulkCreate(where, options);
    } catch {
      throw errorsConst.ticketErrors.queryErrors.createError;
    }
  },
};
