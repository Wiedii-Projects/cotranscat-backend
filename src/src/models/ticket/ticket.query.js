// Constants
const { errorsConst } = require("../../constants/index.constants");
const sharedHelpers = require("../../helpers/shared.helpers");

// Models
const {
  Ticket, Seat,
} = require("../index.models");

module.exports = {
  createNewTicketQuery: async (where, options) => {
    try {
      return await Ticket.bulkCreate(where, options);
    } catch {
      throw errorsConst.ticketErrors.queryErrors.createError;
    }
  },
  findAllTicketQuery: async( query ) => {
    try {
      const {
        where
      } = query;
      return await Ticket.findAll({ 
        where, 
        include: [{
          model: Seat,
          as: 'TicketSeat',
          attributes: ['name'],
        }],
        raw: true,
        nest: true
      })
        .then((tickets) => {
          return tickets.map((result) => ({
            id: sharedHelpers.encryptIdDataBase(result.id),
            number: result.number,
            code: result.code,
            numberPhone: result.numberPhone,
            passengerName: result.passengerName,
            seat: {
              name: result.TicketSeat.name
            }
          }))
        });
    } catch {
      throw errorsConst.ticketErrors.queryErrors.findAllError;
    }
  }
};
