// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { LicenseCategory } = require('../index.models');

module.exports = {

    findLicenseCategoryQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await LicenseCategory.findAll({
                where,
                raw: true
            }).then(licenseCategory => licenseCategory.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.licenseCategoryErrors.queryErrors.findAllError
        }
    }
}