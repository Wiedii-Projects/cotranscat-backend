// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const {
  User,
  IndicativeNumber,
  DocumentType,
  Seller,
  Bank,
  Prefix,
  Resolution,
} = require("../index.models");

// Helpers
const sharedHelpers = require("../../helpers/shared.helpers");

// Libraries
const { col } = require("sequelize");

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
  getPrefixesOfResolutionByBankSellerQuery: async (idSeller, idServiceType) => {
    try {
      const resolutionsFound = await Seller.findAll({
        attributes: [],
        include: [
          {
            model: Bank,
            as: "BankSeller",
            attributes: [],
            required: false,
            include: [
              {
                model: Prefix,
                as: "BankPrefix",
                attributes: ['code', 'currentConsecutive'],
                required: false,
                include: [
                  {
                    model: Resolution,
                    as: "PrefixResolution",
                    attributes: ['dateOfIssuance', 'initialRange', 'finalRange']
                  }
                ],
                where: { idServiceType }
              }
            ],
            order: [[{ model: Resolution, as: 'PrefixResolution' }, 'dateOfIssuance']],
          }
        ],
        where: {
          id: idSeller
        },
        order: [[col('BankSeller.BankPrefix.PrefixResolution.dateOfIssuance')]],
        raw: true,
        nest: true
      })

      const resolutions = []
      resolutionsFound.forEach((
        {
          BankSeller: {
            BankPrefix: {
              id: idPrefix, code, currentConsecutive,
              PrefixResolution: {
                id: idResolution, dateOfIssuance, initialRange, finalRange
              }
            }
          },
        }
      ) => {
        if (idPrefix)
          resolutions.push({
            idPrefix: idPrefix && sharedHelpers.encryptIdDataBase(idPrefix),
            code,
            currentConsecutive,
            idResolution: idResolution && sharedHelpers.encryptIdDataBase(idResolution),
            dateOfIssuance,
            initialRange,
            finalRange
          })
      })

      return resolutions
    } catch {
      throw errorsConst.sellerErrors.queryErrors.getPrefixesOfResolutionByBankSellerError;
    }
  }
};
