// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const { Prefix } = require("../index.models");

module.exports = {
    createPrefixQuery: async (where, transaction) => {
        try {
            return await Prefix.create(where, { transaction });
        } catch (error) {
            throw errorsConst.prefixErrors.queryErrors.createError;
        }
    },
    findPrefixQuery: async (query = {}) => {
        const { where } = query;
        try {
            const prefixesFound = await Prefix.findAll({
                where,
                raw: true,
                nest: true
            });

            const prefixes = prefixesFound.map(({ id, idHeadquarter, idBank, idServiceType, ...otherDataPrefix }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                idHeadquarter: sharedHelpers.encryptIdDataBase(idHeadquarter),
                idBank: sharedHelpers.encryptIdDataBase(idBank),
                idServiceType: sharedHelpers.encryptIdDataBase(idServiceType),
                otherDataPrefix
            }))

            return prefixes

        } catch {
            throw errorsConst.prefixErrors.queryErrors.findAllError
        }
    },
    updatePrefixQuery: async (where, update, transaction) => {
        try {
            return await Prefix.update(update, { where, transaction });
        } catch {
            throw errorsConst.prefixErrors.queryErrors.updateError
        }
    }
}