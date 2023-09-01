// Constants
const { errorsConst } = require("../../constants/index.constants");
const sharedHelpers = require("../../helpers/shared.helpers");

// Models
const Seat = require("../seat/seat.model");
const Ticket = require("./ticket.model");

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
      throw errorsConst.ticketErrors.queryErrors.findAllTicketQuery;
    }
  },
  findAllQuery: async( query ) => {
    try {
      const {
        where,
        attributes = [
          'id', 'number', 'code', 'numberPhone', 'passengerName', 'idSeat', 'idInvoice'
        ]
      } = query;

      const ticketsFound = await Ticket.findAll({ 
        where,
        attributes,
        raw: true
      })
      
      let tickets = []
      tickets = ticketsFound.map((result) => ({
        id: sharedHelpers.encryptIdDataBase(result.id),
        number: result.number,
        code: result.code,
        numberPhone: result.numberPhone,
        passengerName: result.passengerName,
        idSeat: sharedHelpers.encryptIdDataBase(result.idSeat),
        idInvoice: sharedHelpers.encryptIdDataBase(result.idInvoice),
      }))

      return tickets
    } catch {
      throw errorsConst.ticketErrors.queryErrors.findAllError;
    }
  }
};
