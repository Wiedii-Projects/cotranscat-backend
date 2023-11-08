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
  Municipality,
  Headquarter,
  PrefixManifest,
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
  getPrefixesOfResolutionByBankSellerQuery: async (idSeller, idServiceType, isElectronic) => {
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
                where: { 
                  idServiceType,
                  isElectronic
                }
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
  },
  findSellerBankAssociatedQuery: async (query = {}) => {
    const {
      where,
      attributes = ["id", "nickName", "email"]
    } = query
    try {
      return await Seller.findOne({
        where,
        attributes,
        raw: true,
        nest: true,
        include: [
          {
            model: Bank,
            as: "BankSeller"
          }
        ]
      })
    } catch {
      throw errorsConst.sellerErrors.queryErrors.findSellerBankAssociatedError;
    }
  },
  findPrefixManifestByBankAssociatedToSellerQuery: async (query = {}) => {
    const {
      where,
      attributes = ["id", "nickName", "email"]
    } = query
    try {
      const prefixManifestFound = await Seller.findOne({
        where,
        attributes: [],
        raw: true,
        nest: true,
        include: [
          {
            model: Bank,
            as: "BankSeller",
            attributes: [],
            include: [
              {
                model: Municipality,
                as: "MunicipalityBank",
                attributes: [],
                include: [
                  {
                    model: Headquarter,
                    as: "MunicipalityHeadquarter",
                    attributes: [],
                    include: [
                      {
                        model: PrefixManifest,
                        as: "HeadquarterPrefixManifest"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      })
      if (prefixManifestFound) {
        const { BankSeller: { MunicipalityBank: { MunicipalityHeadquarter: { HeadquarterPrefixManifest } }} } = prefixManifestFound;
      
        return {
          id: HeadquarterPrefixManifest?.id ? sharedHelpers.encryptIdDataBase(HeadquarterPrefixManifest.id) : "",
          code: HeadquarterPrefixManifest?.code ? HeadquarterPrefixManifest.code : "",
          headquarter: HeadquarterPrefixManifest?.idHeadquarter ? sharedHelpers.encryptIdDataBase(HeadquarterPrefixManifest.idHeadquarter) : "",
        };
      } else {
        return {
          id: "",
          code: "",
          headquarter: "",
        };
      }      
    } catch {
      throw errorsConst.sellerErrors.queryErrors.findSellerBankAssociatedError;
    }
  }
};
