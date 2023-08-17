// Queries
const { sharedHelpers } = require('../../helpers/index.helpers');

// Helpers
const { licenseCategoryQuery } = require('../../models/index.queries')

module.exports = {
    validateIdLicenseCategory: async (req, id, data) => {
        try {
            const [licenseCategory] = await licenseCategoryQuery.findLicenseCategoryQuery({ where: { id } });
            req.body[data] = licenseCategory
                ? sharedHelpers.decryptIdDataBase(licenseCategory.id)
                : false
        } catch (error) {
            req.body[data] = false;
        }
    }
}