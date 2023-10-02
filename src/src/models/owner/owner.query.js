// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Owner, User, DocumentType, IndicativeNumber, Municipality, Department } = require('../index.models');

module.exports = {
    createOwnerQuery: async (where, transaction) => {
        try {
            return await Owner.findOrCreate({
                where,
                transaction
            });
        } catch {
            throw errorsConst.ownerErrors.queryErrors.createError
        }
    },

    findOwnerQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await Owner.findAll({
                where,
                raw: true,
                nest: true,
                attributes: [ 'numberPhoneWhatsapp', 'email', 'address', 'id' ], 
                include: [{
                    model: User,
                    as: 'UserOwner',
                    attributes: [ 'numberDocument', 'name', 'lastName', 'numberPhone', 'state' ],
                    include : [{
                        model: DocumentType, 
                        as: "UserDocumentType"
                    }, 
                    {
                        model: IndicativeNumber, 
                        as: "UserIndicativePhone"
                    }]
                },
                {
                    model: IndicativeNumber, 
                    as: "IndicativeNumberOwner"
                },
                {
                    model: Municipality, 
                    as: "MunicipalityOwner",
                    include: [{
                        model: Department,
                        as: "MunicipalityDepartment"
                    }]
                }
            ]})
        } catch {
            throw errorsConst.ownerErrors.queryErrors.findAllError
        }
    },

    updateOwnerQuery: async (where, update) => {
        try {
            return await Owner.update(update, { where });
        } catch {
            throw errorsConst.ownerErrors.queryErrors.updateError
        }
    },

    deleteOwnerQuery: async (where) => {
        try {
            return await Owner.destroy({ where })
        } catch {
            throw errorsConst.ownerErrors.queryErrors.deleteError
        }
    }
}