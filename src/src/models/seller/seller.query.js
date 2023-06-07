// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const {
  User,
  IndicativeNumber,
  DocumentType,
  Seller,
} = require("../index.models");

// Helpers
const sharedHelpers = require("../../helpers/shared.helpers");

module.exports = {
  createSellerQuery: async (where, transaction) => {
    try {
      return await Seller.findOrCreate({
        where,
        transaction,
      });
    } catch {
      throw errorsConst.sellerErrors.queryErrors.createError;
    }
  },
  findSellerQuery: async (query = {}) => {
    const {
      where,
      attributes= ["id", "nickName", "email"],
      include =  [
        {
          model: User,
          as: "UserSeller",
          attributes: [
            "numberDocument",
            "name",
            "lastName",
            "numberPhone",
            "state",
          ],
          include: [
            {
              model: DocumentType,
              as: "UserDocumentType",
            },
            {
              model: IndicativeNumber,
              as: "UserIndicativePhone",
            },
            {
              model: IndicativeNumber,
              as: "UserIndicativePhone",
            },
          ],
        },
      ],
      group,
      limit,
      offset,
      order
    } = query
    try {
      return await Seller.findAll({
        where,
        attributes,
        raw: true,
        nest: true,
        include,
        group,
        limit,
        offset,
        order
      })
    } catch {
      throw errorsConst.sellerErrors.queryErrors.findError;
    }
  },
};
