// Constants
const { errorsConst } = require("../../constants/index.constants");
const { ServiceType, Seller, PaymentMethod, Ticket, Seat, Travel, Route, Client, DocumentType, User, Municipality, DriverVehicle, Vehicle } = require("../index.models");
const Invoice = require("./invoice.model");
const { encryptIdDataBase } = require("../../helpers/shared.helpers");

module.exports = {
  createNewInvoiceQuery: async (where, transaction) => {
    try {
      return await Invoice.create(where, { transaction });
    } catch {
      throw errorsConst.invoiceErrors.queryErrors.createError;
    }
  },
  countInvoiceQuery: async(where = {}) => {
    return await Invoice.count(where)
  },
  findAllInvoiceQuery: async (query) => {
    try {
      const { 
        where,
        offset
      } = query;
      return await Invoice.findAll({
        where,
        include: [
          {
            model: Client,
            as: 'InvoiceClient',
            attributes: ['id'],
            include: [
              {
                model: User,
                as: 'UserClient',
                attributes: ['numberDocument', 'name', 'lastName'],
              }
            ]
          },
          {
            model: Seller,
            as: 'InvoiceSeller',
            attributes: ['id'],
            include: [
              {
                model: User,
                as: 'UserSeller',
                attributes: ['name', 'lastName'],
              }
            ]
          },
          {
            model: Ticket,
            as: 'TicketInvoice',
            attributes: ['id'],
            include: [
              {
                model: Seat,
                as: 'TicketSeat',
                attributes: ['id'],
                include: [
                  {
                    model: Travel,
                    as: 'TravelSeat',
                    attributes: ['id']
                  },
                ]
              },
            ]
          },
        ],
        nest: true,
        attributes: ['number', 'price', 'date', 'id'],
        order: [['number', 'DESC']],
        limit: 20,
        offset: offset * 20
      })
      .then( (result) => result.map((invoice) => ({
          id: encryptIdDataBase(invoice.id),
          number: invoice.number,
          price: invoice.price,
          date: invoice.date,
          tickets: invoice.TicketInvoice.length,
          idTravel: invoice.TicketInvoice[0].TicketSeat.TravelSeat.id,
          client: {
            numberDocument: invoice.InvoiceClient.UserClient.numberDocument,
            name: invoice.InvoiceClient.UserClient.name,
            lastName: invoice.InvoiceClient.UserClient.lastName,
          },
          seller: {
            name: invoice.InvoiceSeller.UserSeller.name,
            lastName: invoice.InvoiceSeller.UserSeller.lastName,
          }
        }))
      );
    } catch {
      throw errorsConst.invoiceErrors.queryErrors.findAllError;
    }
  },
  findInvoiceQuery: async (query = {}) => {
    try {
        const { 
          where
        } = query;
        return await Invoice.findOne({
          where,
          attributes: [
            'id',
            'number',
            'date',
            'price'
          ],
          include: [
            {
              model: Client,
              as: 'InvoiceClient',
              attributes: [],
              include: [
                {
                  model: User,
                  as: 'UserClient',
                  attributes: [ 'numberDocument', 'name', 'lastName' ],
                  include: [
                    {
                      model: DocumentType,
                      as: 'UserDocumentType',
                      attributes: [ 'name' ],
                    },
                  ]
                },
              ]
            },
            {
              model: Ticket,
              as: 'TicketInvoice',
              attributes: [],
              include: [
                {
                  model: Seat,
                  as: 'TicketSeat',
                  attributes: ['id'],
                  include: [
                    {
                      model: Travel,
                      as: 'TravelSeat',
                      attributes: ['date', 'time'],
                      include: [
                        {
                          model: Route,
                          as: 'TravelRoute',
                          attributes: [],
                          include: [
                            {
                              model: Municipality,
                              as: 'MunicipalityDepart',
                              attributes: ['name'],
                            },
                            {
                              model: Municipality,
                              as: 'MunicipalityArrive',
                              attributes: ['name'],
                            },
                          ]
                        },
                        {
                          model: DriverVehicle,
                          as: 'TravelDriverVehicle',
                          attributes: [],
                          include: [
                            {
                              model: Vehicle,
                              as: 'Vehicle',
                              attributes: ['plate', 'mark', 'model'],
                              include: [
                                {
                                  model: Municipality,
                                  as: 'VehicleMunicipality',
                                  attributes: ['name']
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                  ]
                },
              ]
            },
          ],
          raw: true,
          nest: true
        })
          .then((result) => {
          const invoice = {
              id: encryptIdDataBase(result.id),
              number: result.number,
              date: result.date,
              price: result.price,
              invoiceClient: {
                name: result.InvoiceClient.UserClient.name,
                lastName: result.InvoiceClient.UserClient.lastName,
                numberDocument: result.InvoiceClient.UserClient.numberDocument,
                userDocumentType: result.InvoiceClient.UserClient.UserDocumentType.name
              },
              municipalityDepart: result.TicketInvoice.TicketSeat.TravelSeat.TravelRoute.MunicipalityDepart.name,
              municipalityArrive: result.TicketInvoice.TicketSeat.TravelSeat.TravelRoute.MunicipalityArrive.name,
              travelSeat: {
                date:result.TicketInvoice.TicketSeat.TravelSeat.date,
                time: result.TicketInvoice.TicketSeat.TravelSeat.time,
              },
              vehicle: {
                plate: result.TicketInvoice.TicketSeat.TravelSeat.TravelDriverVehicle.Vehicle.plate,
                mark: result.TicketInvoice.TicketSeat.TravelSeat.TravelDriverVehicle.Vehicle.mark,
                model: result.TicketInvoice.TicketSeat.TravelSeat.TravelDriverVehicle.Vehicle.model,
                vehicleMunicipality: {
                  name: result.TicketInvoice.TicketSeat.TravelSeat.TravelDriverVehicle.Vehicle.VehicleMunicipality.name
                }
              }
          };
          return invoice;
        })
    } catch {
        throw errorsConst.invoiceErrors.queryErrors.findAllError;
    }
}
};