// Helpers
const { sharedHelpers, responseHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { departmentQuery } = require('../models/index.queries');


module.exports = {
    createDepartment: async (req, res) => {
        const { name } = req.body;
        try {
            await departmentQuery.createDepartmentQuery(name)
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getAllDepartment: async (req, res) => {
        try {
            const resp = await departmentQuery.findDepartment();
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    updateDepartment: async (req, res) => {
        const { decryptId, name } = req.body;
        try {
            await departmentQuery.updateDepartmentQuery(
                { id: decryptId },
                { name }
            )
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    deleteDepartment: async (req, res) => {
        const { id } = req.params;
        try {
            await departmentQuery.deleteDepartmentQuery({ id: sharedHelpers.decryptIdDataBase(id) });
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}