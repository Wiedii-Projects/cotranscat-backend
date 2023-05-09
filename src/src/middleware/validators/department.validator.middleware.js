// Queries
const { sharedHelpers } = require('../../helpers/index.helpers');

// Helpers
const { departmentQuery } = require('./../../models/index.queries')

module.exports = {
    validateDepartment: async (req, query) => {
        try {
            const [department] = await departmentQuery.findDepartmentQuery(query);
            req.body.idDepartment = department
                ? sharedHelpers.decryptIdDataBase(department.id)
                : false
        } catch {
            req.body.idDepartment = false;
        }
    }
}