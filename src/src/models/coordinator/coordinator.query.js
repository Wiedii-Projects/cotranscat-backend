// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { Coordinator, User, IndicativeNumber, DocumentType } = require('../index.models');

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

module.exports = {
    createCoordinatorQuery: async (where,transaction) => {
        try {
            return await Coordinator.findOrCreate({
                where,
                transaction
            });
        } catch {
            throw errorsConst.coordinator.queryErrors.createError
        }
    },
    findCoordinatorQuery: async (where) => {
        try {
            return await Coordinator.findAll({
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
            }).then(coordinator => coordinator.map(({User : { UserDocumentType , UserIndicativeNumber, ...user}, id, ...coordinator })=>({
                id: sharedHelpers.encryptIdDataBase(id),
                ...coordinator,
                ...user,
                documentType: UserDocumentType.name,
                indicativeNumber: UserIndicativeNumber.number
            })))
        } catch {
            throw errorsConst.coordinator.queryErrors.findError
        }
    },
    updateCoordinatorQuery: async (where, update) => {
        try {
            return await Coordinator.update(update, { where });
        } catch {
            throw errorsConst.coordinator.queryErrors.updateError
        }
    }
}