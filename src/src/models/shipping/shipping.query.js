// Constants
const { errorsConst } = require("../../constants/index.constants");

// Helpers
const { encryptIdDataBase } = require("../../helpers/shared.helpers");

// Models
const Shipping = require("./shipping.model");

module.exports = {
  createShippingQuery: async (where, options) => {
    try {
      return await Shipping.create(where, options);
    } catch {
      throw errorsConst.shippingErrors.queryErrors.createError;
    }
  },
  countShippingInvoiceQuery: async(where = {}) => {
    return await Shipping.count(where)
  },
  findAllShippingQuery: async (query = {}) => {
    try {
      const {
        where,
      } = query;
      return await Shipping.findAll({
        where,
        raw: true,
        nest: true
      })
    } catch {
      throw errorsConst.shippingErrors.queryErrors.findAllError;
    }
  },
  findOneQuery: async (query) => {
    const {
      where,
      attribute = [
        'id', 'dateDeparture', 'timeDeparture', 'weight', 'depth', 'width', 'high', 'declaredValue',
        'insuranceCost', 'costShipping', 'content', 'isHomeDelivery', 'idUnitMeasure', 'idShippingType',
        'idClientReceives', 'idInvoice'
      ],
    } = query;
    try {
      const shippingFound = await Shipping.findOne({
        where,
        attribute,
        raw: true
      })
      if (!shippingFound) return null

      return {
        id: encryptIdDataBase(shippingFound.id),
        dateDeparture: shippingFound.dateDeparture,
        timeDeparture: shippingFound.timeDeparture,
        weight: shippingFound.weight,
        depth: shippingFound.depth,
        width: shippingFound.width,
        high: shippingFound.high,
        declaredValue: shippingFound.declaredValue,
        insuranceCost: shippingFound.insuranceCost,
        costShipping: shippingFound.costShipping,
        content: shippingFound.content,
        isHomeDelivery: shippingFound.isHomeDelivery,
        idUnitMeasure: encryptIdDataBase(shippingFound.idUnitMeasure),
        idShippingType: encryptIdDataBase(shippingFound.idShippingType),
        idClientReceives: encryptIdDataBase(shippingFound.idClientReceives),
        idInvoice: encryptIdDataBase(shippingFound.idInvoice)
      }
    } catch {
      throw errorsConst.shippingErrors.queryErrors.findOneError;
    }
  }
}