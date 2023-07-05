// Helpers
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');

// Helpers
const { responseHelpers } = require('../helpers/index.helpers');
const { extractPrefixDataHelper } = require('../helpers/prefix.helpers');
const { extractResolutionDataHelper } = require('../helpers/resolution.helpers');

// Models - Queries
const { resolutionQuery } = require('../models/index.queries');
const { createPrefixQuery } = require('../models/prefix/prefix.query');
const { createResolutionQuery } = require('../models/resolution/resolution.query');

module.exports = {
    createResolution: async (req, res) => {
        const { 
            currentConsecutive, TNSPrefix, bank, idServiceType, number, DIANPrefix, initialRange, 
            finalRange, idRoute, date, headquarter
        } = req.body;

        let transaction;
        const prefix = extractPrefixDataHelper({ currentConsecutive, TNSPrefix, idBank: bank.id, idServiceType, idHeadquarter: headquarter.id });
        let resolution = extractResolutionDataHelper({ number, DIANPrefix, initialRange, finalRange, idRoute, date });
        try {
            transaction = await dbConnectionOptions.transaction();
            const prefixCreated = await createPrefixQuery(prefix, transaction);
            resolution.idPrefix = prefixCreated.id;
            await createResolutionQuery(resolution, transaction);
            
            await transaction.commit();
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllResolution: async (req, res) => {
        try {
            const resp = await resolutionQuery.findResolutionQuery()
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

}