// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { PrefixManifest } = require('../index.models');

module.exports = {

    findPrefixManifestQuery: async (query = {}) => {
        try {
            const { where } = query;
            const prefixManifest = await PrefixManifest.findOne({
                where,
                raw: true
            })
            return {
                ...prefixManifest,
                id: sharedHelpers.encryptIdDataBase(prefixManifest.id)
            }
        } catch {
            throw errorsConst.prefixManifestErrors.queryErrors.findOneError
        }
    }
}