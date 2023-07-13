// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const { encryptIdDataBase } = require("../../helpers/shared.helpers");

// Models
const { 
  Seller, Ticket, Seat, Travel, Route, Client, DocumentType, User, Municipality, DriverVehicle, Vehicle, 
  IndicativeNumber, Department, Shipping, ShippingType, UnitMeasure, MoneyTransfer 
} = require("../index.models");
const Invoice = require("./invoice.model");

module.exports = {
  createNewInvoiceQuery: async (where, options) => {
    try {
      return await Invoice.create(where, options);
    } catch {
      throw errorsConst.invoiceErrors.queryErrors.createError;
    }
  },
  countInvoiceQuery: async(where = {}) => {
    return await Invoice.count({ where })
  },
  findAllTravelInvoiceQuery: async (query) => {
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
  findAllMoneyTransferInvoiceQuery: async (query) => {
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
            model: MoneyTransfer,
            as: 'MoneyTransferInvoice',
            attributes: ['id', 'idClientReceives'],
            include: [
              {
                model: Client,
                as: 'MoneyTransferClient',
                attributes: ['id'],
                include: [
                  {
                    model: User,
                    as: 'UserClient',
                    attributes: ['numberDocument', 'name', 'lastName'],
                  }
                ]
              }
            ]
          },
        ],
        nest: true,
        raw: true,
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
          client: {
            numberDocument: invoice.InvoiceClient.UserClient.numberDocument,
            name: invoice.InvoiceClient.UserClient.name,
            lastName: invoice.InvoiceClient.UserClient.lastName,
          },
          seller: {
            name: invoice.InvoiceSeller.UserSeller.name,
            lastName: invoice.InvoiceSeller.UserSeller.lastName,
          },
          clientReceives: {
            ...invoice.MoneyTransferInvoice.MoneyTransferClient.UserClient,
            id: undefined
          }
        }))
      );
    } catch {
      throw errorsConst.invoiceErrors.queryErrors.findAllError;
    }
  },
  findInvoiceQuery: async(query = {}) => {
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
          raw: true,
          nest: true
        })
          .then((result) => {
          const invoice = {
              id: encryptIdDataBase(result.id),
              number: result.number,
              date: result.date,
              price: result.price,
          };
          return invoice;
        })
    } catch {
        throw errorsConst.invoiceErrors.queryErrors.findAllError;
    }
  },
  findInvoiceTravelQuery: async (query = {}) => {
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
  },
  findInvoiceMoneyTransferQuery: async (query = {}) => {
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
              include: [
                {
                  model: User,
                  as: 'UserClient',
                  include: [
                    {
                      model: DocumentType,
                      as: 'UserDocumentType'
                    },
                    {
                      model: IndicativeNumber,
                      as: 'UserIndicativePhone'
                    },
                  ]
                },
                {
                  model: Municipality,
                  as: "ClientMunicipality",
                  required: false,
                  include: [
                    {
                      model: Department,
                      as: "MunicipalityDepartment",
                      required: false
                    }
                  ]
                },
                {
                  model: IndicativeNumber,
                  as: 'ClientIndicativeNumberWhatsApp',
                  required: false
                }
              ]
            },
            {
              model: MoneyTransfer,
              as: "MoneyTransferInvoice",
              include: [
                {
                  model: Client,
                  as: "MoneyTransferClient",
                  include: [
                    {
                      model: User,
                      as: 'UserClient',
                      include: [
                        {
                          model: DocumentType,
                          as: 'UserDocumentType'
                        },
                        {
                          model: IndicativeNumber,
                          as: 'UserIndicativePhone'
                        }
                      ]
                    },
                    {
                      model: Municipality,
                      as: "ClientMunicipality",
                      required: false,
                      include: [
                        {
                          model: Department,
                          as: "MunicipalityDepartment",
                          required: false
                        }
                      ]
                    },
                    {
                      model: IndicativeNumber,
                      as: 'ClientIndicativeNumberWhatsApp',
                      required: false
                    }
                  ]
                }
              ]
            }
          ],
          raw: true,
          nest: true
        })
          .then((result) => {
          if(result){
            const invoice = {
              id: encryptIdDataBase(result.id),
              number: result.number,
              date: result.date,
              price: result.price,
              invoiceClient: {
                name: result.InvoiceClient.UserClient.name,
                lastName: result.InvoiceClient.UserClient.lastName,
                numberDocument: result.InvoiceClient.UserClient.numberDocument,
                userDocumentType: result.InvoiceClient.UserClient.UserDocumentType.name,
                numberPhone: result.InvoiceClient.UserClient.numberPhone,
                indicativePhone: result.InvoiceClient.UserClient.UserIndicativePhone.number,
                numberPhoneWhatsapp: result.InvoiceClient.numberPhoneWhatsapp ?? undefined,
                indicativePhoneWhatsapp: result.InvoiceClient.ClientIndicativeNumberWhatsApp.number,
                address: result.InvoiceClient.UserClient.address ?? undefined,
                municipality: result.InvoiceClient.ClientMunicipality.name
              },
              invoiceMoneyTransfer: {
                id: encryptIdDataBase(result.MoneyTransferInvoice.id),
                amountMoney: result.MoneyTransferInvoice.amountMoney,
                cost: result.MoneyTransferInvoice.cost,
                totalCost: result.MoneyTransferInvoice.cost + result.MoneyTransferInvoice.iva,
                iva: result.MoneyTransferInvoice.iva,
                moneyTransferClient: {
                  name: result.MoneyTransferInvoice.MoneyTransferClient.UserClient.name,
                  lastName: result.MoneyTransferInvoice.MoneyTransferClient.UserClient.lastName,
                  userDocumentType: result.MoneyTransferInvoice.MoneyTransferClient.UserClient.UserDocumentType.name,
                  numberDocument: result.MoneyTransferInvoice.MoneyTransferClient.UserClient.numberDocument,
                  numberPhone: result.MoneyTransferInvoice.MoneyTransferClient.UserClient.numberPhone,
                  indicativePhone: result.MoneyTransferInvoice.MoneyTransferClient.UserClient.UserIndicativePhone.number,
                  address: result.MoneyTransferInvoice.MoneyTransferClient.address,
                  municipality: result.MoneyTransferInvoice.MoneyTransferClient.ClientMunicipality.name
                }
              }
          };
          return invoice;
          } else {
            return null;
          }

        })
    } catch {
      throw errorsConst.invoiceErrors.queryErrors.findAllError;
    }
  },
  findInvoiceShippingQuery: async (conditionFilter) => {

     const detailShippingFound =  await Invoice.findOne({
      where: conditionFilter,
      include: [
        {
          model: Client,
          as: 'InvoiceClient',
          include: [
            {
              model: User,
              as: 'UserClient',
              include: [
                {
                  model: DocumentType,
                  as: 'UserDocumentType'
                },
                {
                  model: IndicativeNumber,
                  as: 'UserIndicativePhone'
                }
              ]
            },
            {
              model: Municipality,
              as: "ClientMunicipality",
              required: false,
              include: [
                {
                  model: Department,
                  as: "MunicipalityDepartment",
                  required: false
                }
              ]
            },
            {
              model: IndicativeNumber,
              as: 'ClientIndicativeNumberWhatsApp',
              required: false
            }
          ]
        },
        {
          model: Shipping,
          as: "InvoiceShipping",
          include: [
            {
              model: ShippingType,
              as: "ShippingTypeShipping"
            },
            {
              model: UnitMeasure,
              as: "UnitMeasureShipping"
            },
            {
              model: Client,
              as: "ClientShipping",
              include: [
                {
                  model: User,
                  as: 'UserClient',
                  include: [
                    {
                      model: DocumentType,
                      as: 'UserDocumentType'
                    },
                    {
                      model: IndicativeNumber,
                      as: 'UserIndicativePhone'
                    }
                  ]
                },
                {
                  model: Municipality,
                  as: "ClientMunicipality",
                  required: false,
                  include: [
                    {
                      model: Department,
                      as: "MunicipalityDepartment",
                      required: false
                    }
                  ]
                },
                {
                  model: IndicativeNumber,
                  as: 'ClientIndicativeNumberWhatsApp',
                  required: false
                }
              ]
            }
          ]
        }
      ],
      raw: true,
      nest: true
    })

    if (!detailShippingFound) return null

    const {
      id: idInvoice, number, price, codeSale, codePrefix,
      InvoiceClient: {
        id: idSends, email: emailSends, address: addressSends, numberPhoneWhatsappSends,
        ClientMunicipality: dataMunicipalitySends, ClientIndicativeNumberWhatsApp: dataIndicativeNumberWhatsAppSends,
        UserClient: { 
          numberDocument: numberDocumentSends, name: nameSends, lastName: lastNameSends, 
          numberPhone: numberPhoneSends, UserDocumentType: documentTypeSends, UserIndicativePhone: indicativePhoneSends
        }
      },
      InvoiceShipping: {
        id: idShipping, dateOfEntry, dateDeparture, declaredValue, insuranceCost, content, isHomeDelivery, costShipping,
        ShippingTypeShipping: { name: nameTypeShipping },
        UnitMeasureShipping: { name: nameUnitMeasure },
        ClientShipping: {
          id: idReceives, email: emailReceives, address: addressReceives, numberPhoneWhatsappReceives,
          ClientMunicipality: dataMunicipalityReceives, ClientIndicativeNumberWhatsApp: dataIndicativeNumberWhatsAppReceives,
          UserClient: { 
            numberDocument: numberDocumentReceives, name: nameReceives, lastName: lastNameReceives, 
            numberPhone: numberPhoneReceives, UserDocumentType: documentTypeReceives, UserIndicativePhone: indicativePhoneReceives
          }
        }
      }
    } = detailShippingFound

    let municipalityReceives = null
    let departmentReceives = null

    if (dataMunicipalityReceives?.id) {
      const { id: idMunicipality, name, MunicipalityDepartment: departmentData } = dataMunicipalityReceives
      municipalityReceives = {
        id: encryptIdDataBase(idMunicipality),

        name
      }

      if (departmentData?.id) {
        departmentReceives = {
          id: encryptIdDataBase(departmentData.id),

          name: departmentData.name
        }
      }
    }

    let municipalitySends = null
    let departmentSends = null

    if (dataMunicipalitySends?.id) {
      const { id: idMunicipality, name, MunicipalityDepartment: departmentData } = dataMunicipalitySends
      municipalitySends = {
        id: encryptIdDataBase(idMunicipality),

        name
      }

      if (departmentData?.id) {
        departmentSends = {
          id: encryptIdDataBase(departmentData.id),

          name: departmentData.name
        }
      }
    }

    return {
      invoice: {
        id: encryptIdDataBase(idInvoice), number, price, codeSale, codePrefix
      },
      invoiceDetails: {
        id: encryptIdDataBase(idShipping), dateOfEntry, dateDeparture, isHomeDelivery,
      declaredValue, insuranceCost, content, nameTypeShipping, nameUnitMeasure, costShipping
      },
      clientReceives: {
        id: encryptIdDataBase(idReceives),
        numberDocument: numberDocumentReceives,
        name: nameReceives,
        lastName: lastNameReceives,
        documentType: {
          ...documentTypeReceives,
          id: encryptIdDataBase(documentTypeReceives.id),
        },
        indicativeNumber: {
          ...indicativePhoneReceives,
          id: encryptIdDataBase(indicativePhoneReceives.id),
        },
        numberPhone: numberPhoneReceives,
        email: emailReceives ?? undefined,
        address: addressReceives ?? undefined,
        numberPhoneWhatsapp: numberPhoneWhatsappReceives ?? undefined,
        indicativeNumberWhatsApp: {
          ...dataIndicativeNumberWhatsAppReceives,
          id: dataIndicativeNumberWhatsAppReceives?.id ? encryptIdDataBase(dataIndicativeNumberWhatsAppReceives.id) : null,
        },
        municipality: municipalityReceives, department: departmentReceives
      },
      clientSends: {
        id: encryptIdDataBase(idSends),
        numberDocument: numberDocumentSends,
        name: nameSends,
        lastName: lastNameSends,
        documentType: {
          ...documentTypeSends,
          id: encryptIdDataBase(documentTypeSends.id),
        },
        indicativeNumber: {
          ...indicativePhoneSends,
          id: encryptIdDataBase(indicativePhoneSends.id),
        },
        numberPhone: numberPhoneSends,
        email: emailSends ?? undefined,
        address: addressSends ?? undefined,
        numberPhoneWhatsapp: numberPhoneWhatsappSends ?? undefined,
        indicativeNumberWhatsApp: {
          ...dataIndicativeNumberWhatsAppSends,
          id: dataIndicativeNumberWhatsAppSends?.id ? encryptIdDataBase(dataIndicativeNumberWhatsAppSends.id) : null,
        },
        municipality: municipalitySends, department: departmentSends
      }
    }
  },
  findAllShippingInvoiceQuery: async (query) => {
    try {
      const { 
        where,
        offset
      } = query;
      const allShippingInvoiceResponse = await Invoice.findAll({
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
            model: Shipping,
            as: "InvoiceShipping",
            include: [
              {
                model: Client,
                as: "ClientShipping",
                attributes: ['id'],
                include: [
                  {
                    model: User,
                    as: 'UserClient',
                    attributes: ['numberDocument', 'name', 'lastName'],
                  }
                ]
              }
            ]
          }
        ],
        nest: true,
        raw:true,
        attributes: ['codeSale', 'codePrefix','number', 'price', 'date', 'id'],
        order: [['number', 'DESC']],
        limit: 20,
        offset: offset * 20
      })

      const allShippingInvoice = allShippingInvoiceResponse.map((shippingInvoice) => ({
          id: encryptIdDataBase(shippingInvoice.id),
          number: shippingInvoice.number,
          codeSale: shippingInvoice.codeSale,
          codePrefix: shippingInvoice.codePrefix,
          price: shippingInvoice.price,
          date: shippingInvoice.date,
          clientSends: {
            numberDocument: shippingInvoice.InvoiceClient.UserClient.numberDocument,
            name: shippingInvoice.InvoiceClient.UserClient.name,
            lastName: shippingInvoice.InvoiceClient.UserClient.lastName,
          },
          seller: {
            name: shippingInvoice.InvoiceSeller.UserSeller.name,
            lastName: shippingInvoice.InvoiceSeller.UserSeller.lastName,
          },
          clientReceives: {
            numberDocument: shippingInvoice.InvoiceShipping.ClientShipping.UserClient.numberDocument,
            name: shippingInvoice.InvoiceShipping.ClientShipping.UserClient.name,
            lastName: shippingInvoice.InvoiceShipping.ClientShipping.UserClient.lastName
          }
        }))
     
     return allShippingInvoice
    } catch {
      throw errorsConst.invoiceErrors.queryErrors.findAllError;
    }
  }
}