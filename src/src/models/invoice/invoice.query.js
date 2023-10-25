// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const { encryptIdDataBase } = require("../../helpers/shared.helpers");

// Libraries
const { col } = require("sequelize");

// Models
const { 
  Seller, Ticket, Seat, Travel, Route, Client, DocumentType, User, Municipality, DriverVehicle, Vehicle, 
  IndicativeNumber, Department, Shipping, ShippingType, UnitMeasure, MoneyTransfer, Resolution, Prefix, ServiceType 
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
        attributes: [
          [col('Invoice.number'), 'invoiceNumber'],
          [col('Invoice.codeSale'), 'invoiceCodeSale'],
          [col('Invoice.price'), 'invoicePrice'],
          [col('Invoice.date'), 'invoiceDate'],
          'id',
          'isCancelled',
          [col('InvoiceClient.id'), 'InvoiceClient.id'],
          [col('InvoiceClient.email'), 'InvoiceClient.email'],
          [col('InvoiceClient.UserClient.id'), 'InvoiceClient.UserClient.id'],
          [col('InvoiceClient.UserClient.numberDocument'), 'InvoiceClient.UserClient.numberDocument'],
          [col('InvoiceClient.UserClient.name'), 'InvoiceClient.UserClient.name'],
          [col('InvoiceClient.UserClient.lastName'), 'InvoiceClient.UserClient.lastName'],
          [col('InvoiceSeller.id'), 'InvoiceSeller.id'],
          [col('InvoiceSeller.UserSeller.id'), 'InvoiceSeller.UserSeller.id'],
          [col('InvoiceSeller.UserSeller.name'), 'InvoiceSeller.UserSeller.name'],
          [col('InvoiceSeller.UserSeller.lastName'), 'InvoiceSeller.UserSeller.lastName'],
          [col('TicketInvoice.id'), 'TicketInvoice.id'],
          [col('TicketInvoice.TicketSeat.id'), 'TicketInvoice.TicketSeat.id'],
          [col('TicketInvoice.TicketSeat.TravelSeat.id'), 'TicketInvoice.TicketSeat.TravelSeat.id'],
          [col('ResolutionInvoice.id'), 'ResolutionInvoice.id'],
          [col('ResolutionInvoice.idPrefix'), 'ResolutionInvoice.idPrefix'],
          [col('ResolutionInvoice.PrefixResolution.id'), 'ResolutionInvoice.PrefixResolution.id'],
          [col('ResolutionInvoice.PrefixResolution.code'), 'ResolutionInvoice.PrefixResolution.code'],
          [col('ResolutionInvoice.PrefixResolution.isElectronic'), 'ResolutionInvoice.PrefixResolution.isElectronic'],
        ],
        include: [
          {
            model: Client,
            as: 'InvoiceClient',
            attributes: ['id', 'email'],
            include: [
              {
                model: User,
                as: 'UserClient',
                attributes: ['numberDocument', 'name', 'lastName']
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
                attributes: ['name', 'lastName']
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
          {
            model: Resolution,
            as: 'ResolutionInvoice',
            attributes: ['idPrefix'],
            include: [
              {
                model: Prefix,
                as: 'PrefixResolution',
                attributes: ['code', 'isElectronic'],
              }
            ]
          }
        ],
        nest: true,
        order: [['date', 'DESC']],
        offset: offset * 50
      })
        .then((result) => result.map((invoice) => ({
          id: encryptIdDataBase(invoice.id),
          number: invoice.dataValues.invoiceNumber,
          codeSale: invoice.dataValues.invoiceCodeSale,
          price: invoice.dataValues.invoicePrice,
          date: invoice.dataValues.invoiceDate,
          name: invoice.InvoiceClient.UserClient.name,
          isCancelled: invoice.isCancelled == 1 ? true : false,
          codePrefix: invoice.ResolutionInvoice.PrefixResolution.code,
          isElectronic: invoice.ResolutionInvoice.PrefixResolution.isElectronic == 1 ? true : false,
          tickets: invoice.TicketInvoice.length,
          idTravel: invoice.TicketInvoice[0].TicketSeat.TravelSeat.id,
          client: {
            numberDocument: invoice.InvoiceClient.UserClient.numberDocument,
            name: invoice.InvoiceClient.UserClient.name,
            lastName: invoice.InvoiceClient.UserClient.lastName,
            email: invoice.InvoiceClient.email,
            id: encryptIdDataBase(invoice.InvoiceClient.id)
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
      const allMoneyTransferInvoiceResponse = await Invoice.findAll({
        where,
        attributes: [
          [col('Invoice.number'), 'invoiceNumber'],
          [col('Invoice.codeSale'), 'invoiceCodeSale'],
          [col('Invoice.price'), 'invoicePrice'],
          [col('Invoice.date'), 'invoiceDate'],
          'id',
          'isCancelled',
          [col('InvoiceClient.id'), 'InvoiceClient.id'],
          [col('InvoiceClient.email'), 'InvoiceClient.email'],
          [col('InvoiceClient.UserClient.id'), 'InvoiceClient.UserClient.id'],
          [col('InvoiceClient.UserClient.numberDocument'), 'InvoiceClient.UserClient.numberDocument'],
          [col('InvoiceClient.UserClient.name'), 'InvoiceClient.UserClient.name'],
          [col('InvoiceClient.UserClient.lastName'), 'InvoiceClient.UserClient.lastName'],
          [col('InvoiceSeller.id'), 'InvoiceSeller.id'],
          [col('InvoiceSeller.UserSeller.id'), 'InvoiceSeller.UserSeller.id'],
          [col('InvoiceSeller.UserSeller.name'), 'InvoiceSeller.UserSeller.name'],
          [col('InvoiceSeller.UserSeller.lastName'), 'InvoiceSeller.UserSeller.lastName'],
          [col('MoneyTransferInvoice.MoneyTransferClient.UserClient.numberDocument'), 'MoneyTransferInvoice.MoneyTransferClient.UserClient.numberDocument'],
          [col('MoneyTransferInvoice.MoneyTransferClient.UserClient.name'), 'MoneyTransferInvoice.MoneyTransferClient.UserClient.name'],
          [col('MoneyTransferInvoice.MoneyTransferClient.UserClient.lastName'), 'MoneyTransferInvoice.MoneyTransferClient.UserClient.lastName'],
          [col('MoneyTransferInvoice.MoneyTransferClient.ClientMunicipality.name'), 'MoneyTransferInvoice.MoneyTransferClient.ClientMunicipality.name'],
          [col('ResolutionInvoice.id'), 'ResolutionInvoice.id'],
          [col('ResolutionInvoice.idPrefix'), 'ResolutionInvoice.idPrefix'],
          [col('ResolutionInvoice.PrefixResolution.id'), 'ResolutionInvoice.PrefixResolution.id'],
          [col('ResolutionInvoice.PrefixResolution.code'), 'ResolutionInvoice.PrefixResolution.code'],
          [col('ResolutionInvoice.PrefixResolution.isElectronic'), 'ResolutionInvoice.PrefixResolution.isElectronic']
        ],
        include: [
          {
            model: Client,
            as: 'InvoiceClient',
            attributes: ['id', 'email'],
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
                  },
                  {
                    model: Municipality,
                    as: 'ClientMunicipality',
                    attributes: ['name'],
                  }
                ]
              }
            ]
          },
          {
            model: Resolution,
            as: 'ResolutionInvoice',
            attributes: ['idPrefix'],
            include: [
              {
                model: Prefix,
                as: 'PrefixResolution',
                attributes: ['code', 'isElectronic'],
              }
            ]
          }
        ],
        nest: true,
        raw: true,
        order: [['date', 'DESC']],
        offset: offset * 50
      })

      const allMoneyTransferInvoice = allMoneyTransferInvoiceResponse.map((invoice) => ({
        id: encryptIdDataBase(invoice.id),
        isCancelled: invoice.isCancelled == 1 ? true : false,
        number: invoice.invoiceNumber,
        codeSale: invoice.invoiceCodeSale,
        codePrefix: invoice.ResolutionInvoice.PrefixResolution.code,
        isElectronic: invoice.ResolutionInvoice.PrefixResolution.isElectronic == 1 ? true : false,
        price: invoice.invoicePrice,
        date: invoice.invoiceDate,
        client: {
          numberDocument: invoice.InvoiceClient.UserClient.numberDocument,
          name: invoice.InvoiceClient.UserClient.name,
          lastName: invoice.InvoiceClient.UserClient.lastName,
          email: invoice.InvoiceClient.email,
          id: encryptIdDataBase(invoice.InvoiceClient.id)
        },
        seller: {
          name: invoice.InvoiceSeller.UserSeller.name,
          lastName: invoice.InvoiceSeller.UserSeller.lastName,
        },
        clientReceives: {
          ...invoice.MoneyTransferInvoice.MoneyTransferClient.UserClient,
          id: undefined
        },
        municipalityArrive: {
          ...invoice.MoneyTransferInvoice.MoneyTransferClient.ClientMunicipality,
          id: undefined
        }
      }))

      return allMoneyTransferInvoice

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
            'price',
            'idServiceType',
            'isSynchronized',
            'synchronizationType',
            "idPaymentMethod",
            "codeSale",
            "idClient",
            "idSeller",
            "number",
            "idResolution",
            "isCancelled"
          ],
          raw: true,
          nest: true
        })
          .then((result) => {
          const invoice = {
              id: encryptIdDataBase(result.id),
              idServiceType: encryptIdDataBase(result.idServiceType),
              number: result.number,
              date: result.date,
              price: result.price,
              isSynchronized: result.isSynchronized,
              synchronizationType: result.synchronizationType,
              idPaymentMethod: encryptIdDataBase(result.idPaymentMethod),
              codeSale: result.codeSale,
              idClient: encryptIdDataBase(result.idClient),
              idSeller: encryptIdDataBase(result.idSeller),
              number: result.number,
              idResolution: encryptIdDataBase(result.idResolution),
              isCancelled: result.isCancelled
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
            'codeSale',
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
                              as: 'VehicleDriverVehicle',
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
            {
              model: Resolution,
              as: 'ResolutionInvoice',
              attributes: ['idPrefix','number', 'dateOfIssuance', 'initialRange', 'finalRange'],
              include: [
                {
                  model: Prefix,
                  as: 'PrefixResolution'
                }
              ]
            }
          ],
          raw: true,
          nest: true
        })
          .then((result) => {
          const invoice = {
              id: encryptIdDataBase(result.id),
              number: result.number,
              codeSale: result.codeSale,
              codePrefix: result.ResolutionInvoice.PrefixResolution.code,
              isElectronic: result.ResolutionInvoice.PrefixResolution.isElectronic == 1 ? true : false,
              resolution: {
                number: result.ResolutionInvoice.number,
                date: result.ResolutionInvoice.dateOfIssuance,
                initialRange: result.ResolutionInvoice.initialRange,
                finalRange: result.ResolutionInvoice.finalRange
              },
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
                plate: result.TicketInvoice.TicketSeat.TravelSeat.TravelDriverVehicle.VehicleDriverVehicle.plate,
                mark: result.TicketInvoice.TicketSeat.TravelSeat.TravelDriverVehicle.VehicleDriverVehicle.mark,
                model: result.TicketInvoice.TicketSeat.TravelSeat.TravelDriverVehicle.VehicleDriverVehicle.model,
                vehicleMunicipality: {
                  name: result.TicketInvoice.TicketSeat.TravelSeat.TravelDriverVehicle.VehicleDriverVehicle.VehicleMunicipality.name
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
            'codeSale',
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
            },
            {
              model: Resolution,
              as: 'ResolutionInvoice',
              attributes: ['idPrefix','number', 'dateOfIssuance', 'initialRange', 'finalRange'],
              include: [
                {
                  model: Prefix,
                  as: 'PrefixResolution'
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
              codeSale: result.codeSale,
              codePrefix: result.ResolutionInvoice.PrefixResolution.code,
              resolution: {
                number: result.ResolutionInvoice.number,
                date: result.ResolutionInvoice.dateOfIssuance,
                initialRange: result.ResolutionInvoice.initialRange,
                finalRange: result.ResolutionInvoice.finalRange
              },
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
  findInvoiceShippingQuery: async (conditionFilter, whereCodePrefix = {}) => {
     const detailShippingFound =  await Invoice.findOne( {
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
        },
        {
          model: Resolution,
          as: 'ResolutionInvoice',
          attributes: ['idPrefix','number', 'dateOfIssuance', 'initialRange', 'finalRange'],
          include: [
            {
              model: Prefix,
              as: 'PrefixResolution',
              where: whereCodePrefix
            }
          ]
        }
      ],
      raw: true,
      nest: true
    })

    if (!detailShippingFound) return null

    const {
      id: idInvoice, number, price, codeSale,
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
      },
      ResolutionInvoice: { number: numberResolution, dateOfIssuance, initialRange, finalRange, PrefixResolution: { code: codePrefix } }
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
        id: encryptIdDataBase(idInvoice), number, price, codeSale, codePrefix,
        resolution: {
          number: numberResolution,
          date: dateOfIssuance,
          initialRange: initialRange,
          finalRange: finalRange
        },
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
        offset,
        where
      } = query;
      const allShippingInvoiceResponse = await Invoice.findAll({
        where,
        attributes: [
          [col('Invoice.number'), 'invoiceNumber'],
          [col('Invoice.codeSale'), 'invoiceCodeSale'],
          [col('Invoice.price'), 'invoicePrice'],
          [col('Invoice.date'), 'invoiceDate'],
          'id',
          'isCancelled',
          [col('InvoiceClient.id'), 'InvoiceClient.id'],
          [col('InvoiceClient.email'), 'InvoiceClient.email'],
          [col('InvoiceClient.UserClient.id'), 'InvoiceClient.UserClient.id'],
          [col('InvoiceClient.UserClient.numberDocument'), 'InvoiceClient.UserClient.numberDocument'],
          [col('InvoiceClient.UserClient.name'), 'InvoiceClient.UserClient.name'],
          [col('InvoiceClient.UserClient.lastName'), 'InvoiceClient.UserClient.lastName'],
          [col('InvoiceSeller.id'), 'InvoiceSeller.id'],
          [col('InvoiceSeller.UserSeller.id'), 'InvoiceSeller.UserSeller.id'],
          [col('InvoiceSeller.UserSeller.name'), 'InvoiceSeller.UserSeller.name'],
          [col('InvoiceSeller.UserSeller.lastName'), 'InvoiceSeller.UserSeller.lastName'],
          [col('InvoiceShipping.idTravel'), 'InvoiceShipping.idTravel'],
          [col('InvoiceShipping.ClientShipping.UserClient.numberDocument'), 'InvoiceShipping.ClientShipping.UserClient.numberDocument'],
          [col('InvoiceShipping.ClientShipping.UserClient.name'), 'InvoiceShipping.ClientShipping.UserClient.name'],
          [col('InvoiceShipping.ClientShipping.UserClient.lastName'), 'InvoiceShipping.ClientShipping.UserClient.lastName'],
          [col('InvoiceShipping.ClientShipping.ClientMunicipality.name'), 'InvoiceShipping.ClientShipping.ClientMunicipality.name'],
          [col('ResolutionInvoice.id'), 'ResolutionInvoice.id'],
          [col('ResolutionInvoice.idPrefix'), 'ResolutionInvoice.idPrefix'],
          [col('ResolutionInvoice.PrefixResolution.id'), 'ResolutionInvoice.PrefixResolution.id'],
          [col('ResolutionInvoice.PrefixResolution.code'), 'ResolutionInvoice.PrefixResolution.code'],
          [col('ResolutionInvoice.PrefixResolution.isElectronic'), 'ResolutionInvoice.PrefixResolution.isElectronic']
        ],
        include: [
          {
            model: Client,
            as: 'InvoiceClient',
            attributes: ['id', 'email'],
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
                  },
                  {
                    model: Municipality,
                    as: 'ClientMunicipality',
                    attributes: ['name'],
                  }
                ]
              }
            ]
          },
          {
            model: Resolution,
            as: 'ResolutionInvoice',
            attributes: ['idPrefix'],
            include: [
              {
                model: Prefix,
                as: 'PrefixResolution',
                attributes: ['code', 'isElectronic'],
              }
            ]
          }
        ],
        nest: true,
        raw: true,
        order: [['date', 'DESC']],
        offset: offset * 50
      })

      const allShippingInvoice = allShippingInvoiceResponse.map((shippingInvoice) => ({
        id: encryptIdDataBase(shippingInvoice.id),
        isCancelled: shippingInvoice.isCancelled == 1 ? true : false,
        number: shippingInvoice.invoiceNumber,
        codeSale: shippingInvoice.invoiceCodeSale,
        codePrefix: shippingInvoice.ResolutionInvoice.PrefixResolution.code,
        isElectronic: shippingInvoice.ResolutionInvoice.PrefixResolution.isElectronic == 1 ? true : false,
        price: shippingInvoice.invoicePrice,
        date: shippingInvoice.invoiceDate,
        clientSends: {
          numberDocument: shippingInvoice.InvoiceClient.UserClient.numberDocument,
          name: shippingInvoice.InvoiceClient.UserClient.name,
          lastName: shippingInvoice.InvoiceClient.UserClient.lastName,
          email: shippingInvoice.InvoiceClient.email,
          id: encryptIdDataBase(shippingInvoice.InvoiceClient.id)
        },
        seller: {
          name: shippingInvoice.InvoiceSeller.UserSeller.name,
          lastName: shippingInvoice.InvoiceSeller.UserSeller.lastName,
        },
        clientReceives: {
          numberDocument: shippingInvoice.InvoiceShipping.ClientShipping.UserClient.numberDocument,
          name: shippingInvoice.InvoiceShipping.ClientShipping.UserClient.name,
          lastName: shippingInvoice.InvoiceShipping.ClientShipping.UserClient.lastName
        },
        idTravel: shippingInvoice.InvoiceShipping.idTravel ? encryptIdDataBase(shippingInvoice.InvoiceShipping.idTravel) : null
      }))

      return allShippingInvoice
    } catch {
      throw errorsConst.invoiceErrors.queryErrors.findAllError;
    }
  },
  updateInvoiceQuery: async (where, update, transaction) => {
    try {
      return await Invoice.update(update, { where, transaction });
    } catch {
      throw errorsConst.invoiceErrors.queryErrors.updateError;
    }
  },
  findInvoiceElectronicQuery: async(query = {}) => {
    try {
        const { 
          where
        } = query;
        return await Invoice.findOne({
          include: [
            {
              model: Resolution,
              as: 'ResolutionInvoice',
              attributes: [],
              include: [
                {
                  model: Prefix,
                  as: 'PrefixResolution',
                  attributes: ['isElectronic']
                }
              ]
            }
          ],
          where,
          attributes: [
            'id',
            'number',
            'date',
            'price',
            'idServiceType',
            'isSynchronized',
            'synchronizationType',
            "idPaymentMethod",
            "codeSale",
            "idClient",
            "idSeller",
            "number",
            "idResolution",
            "isCancelled"
          ],
          raw: true,
          nest: true
        })
          .then((result) => {
          const invoice = {
              id: encryptIdDataBase(result.id),
              idServiceType: encryptIdDataBase(result.idServiceType),
              number: result.number,
              date: result.date,
              price: result.price,
              isSynchronized: result.isSynchronized,
              synchronizationType: result.synchronizationType,
              idPaymentMethod: encryptIdDataBase(result.idPaymentMethod),
              codeSale: result.codeSale,
              idClient: encryptIdDataBase(result.idClient),
              idSeller: encryptIdDataBase(result.idSeller),
              number: result.number,
              idResolution: encryptIdDataBase(result.idResolution),
              isCancelled: result.isCancelled,
              isElectronic: result.ResolutionInvoice.PrefixResolution.isElectronic
          };
          return invoice;
        })
    } catch {
        throw errorsConst.invoiceErrors.queryErrors.findAllError;
    }
  },
  findAllInvoiceQuery: async (query) => {
    try {
      const {
        where,
        include = [
          {
            model: Resolution,
            as: 'ResolutionInvoice'
          }
        ]
      } = query;
      return await Invoice.findAll({
        where,
        include,
        raw: 1,
        nest: 1
      })
    } catch {
      throw errorsConst.invoiceErrors.queryErrors.findAllError;
    }
  }
}