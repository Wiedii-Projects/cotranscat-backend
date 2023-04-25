// Constants
const { errorsConst } = require('../../constants/index.constants');
const { encryptIdDataBase } = require('../../helpers/shared.helpers');

// Models
const { Driver, User, DocumentType, IndicativeNumber, Municipality } = require('../index.models');

module.exports = {
    createDriver: async (where, transaction) => {
        try {
            return await Driver.findOrCreate({where, transaction})
        } catch {
            throw errorsConst.driver.queryErrors.create;
        }
    },
    findDrivers: async (where) => {
        try {
            return await Driver.findAll({
                where,
                attributes: ['id','nickName', 'email'],
                include: {
                    model: User,
                    attributes: ['numberDocument', 'name', 'lastName', 'numberPhone'],
                    include: [
                        { model: DocumentType, as: 'UserDocumentType'},
                        { model: IndicativeNumber, as: 'UserIndicativeNumber'}
                    ],
                },
                raw: true,
                nest: true
            }).then((drivers) => drivers.map(({ User : {UserDocumentType, UserIndicativeNumber, ...user}, id, ...driver }) => ({
                id: encryptIdDataBase(id),
                ...driver,
                ...user,
                documentType: UserDocumentType.name,
                indicativeNumber: UserIndicativeNumber.number
            })))
        } catch {
            throw errorsConst.driver.queryErrors.findError;
        }
    },
    updateDriver: async () => {
        try {
            
        } catch {
            throw errorsConst.driver.queryErrors.updateError;
        }
    }
}