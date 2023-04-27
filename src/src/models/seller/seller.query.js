// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { User, IndicativeNumber, DocumentType, Seller } = require('../index.models');

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

module.exports = {
    createSellerQuery: async (where,transaction) => {
        try {
            return await Seller.findOrCreate({
                where,
                transaction
            });
        } catch {
            throw errorsConst.seller.queryErrors.createError
        }
    },
    findSellerQuery: async (where) => {
        try {
            return await Seller.findAll({
              where,
              attributes : ["id","nickName","email"],
              include: [
                { 
                    model:  User,
                    attributes : ["numberDocument","name","lastName","numberPhone"],
                    include : [
                        {model: DocumentType, as: "UserDocumentType"},
                        {model: IndicativeNumber, as: "UserIndicativeNumber"},
                    ]
                },
                
              ],
              raw: true,
              nest:true
            }).then(seller => seller.map(({User : { UserDocumentType , UserIndicativeNumber, ...user}, id, ...seller })=>({
                id: sharedHelpers.encryptIdDataBase(id),
                ...seller,
                ...user,
                documentType: UserDocumentType.name,
                indicativeNumber: UserIndicativeNumber.number
            })))
        } catch {
            throw errorsConst.seller.queryErrors.findError
        }
    },
}