// Helpers
const { responseHelpers } = require('../helpers/index.helpers');


// Models - Queries
const { licenseCategoryQuery } = require('../models/index.queries');


module.exports = {
    getAllLicenseCategory: async (req, res) => {
        try {
            const licenseCategory = await licenseCategoryQuery.findLicenseCategoryQuery();
            return responseHelpers.responseSuccess(res, licenseCategory);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}