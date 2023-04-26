// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Admin, IndicativeNumber, User, DocumentType } = require('../index.models');

module.exports = {
    createAdminQuery: async (where, transaction) => {
        try {
            return await Admin.findOrCreate({
                where,
                transaction
            });
        } catch {
            throw errorsConst.admin.queryErrors.createError
        }
    },

    findAdminQuery: async (where) => {
        try {
            return await Admin.findAll({
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
            }).then(admin => admin.map(({User : { UserDocumentType , UserIndicativeNumber, ...user}, id, ...admin })=>({
                id: sharedHelpers.encryptIdDataBase(id),
                ...admin,
                ...user,
                documentType: UserDocumentType.name,
                indicativeNumber: UserIndicativeNumber.number
            })))
        } catch {
            throw errorsConst.admin.queryErrors.findError
        }
    },

    updateAdminQuery: async (where, update) => {
        try {
            return await Admin.update(update, { where });
        } catch {
            throw errorsConst.admin.queryErrors.updateError
        }
    },

}