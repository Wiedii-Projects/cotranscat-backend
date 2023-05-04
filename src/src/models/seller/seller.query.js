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
  findSellerQuery: async (where) => {
    try {
      return await Seller.findAll({
        where,
        attributes: ["id", "nickName", "email"],
        raw: true,
        nest: true,
        include: [
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
      }).then((sellers) =>
        sellers.map(
          ({
            UserSeller: { UserDocumentType, UserIndicativePhone, ...user },
            id,
            ...seller
          }) => {
            return {
              id: sharedHelpers.encryptIdDataBase(id),
              ...seller,
              ...user,
              documentType: {
                ...UserDocumentType,
                id: sharedHelpers.encryptIdDataBase(UserDocumentType.id),
              },
              indicativePhone: {
                ...UserIndicativePhone,
                id: sharedHelpers.encryptIdDataBase(UserIndicativePhone.id),
              },
            };
          }
        )
      );
    } catch {
      throw errorsConst.sellerErrors.queryErrors.findError;
    }
  },
};
