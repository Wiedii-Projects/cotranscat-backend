// DB Connections
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');

// Helpers
const { responseHelpers, authHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { userQuery, roleQuery, driverQuery } = require('../models/index.queries');


module.exports = {
    createDriver: async (req, res) => {
        const {
            documentType, indicativePhone, isValid,
            nickName, email, password,
            ...userData
        } = req.body;
        let transaction;
        try {
            transaction = await dbConnectionOptions.transaction();
            //TODO: User role process flow adjustment   
            const [role] = await roleQuery.findRoleQuery({ role: 'DRIVER_ROLE' });
            const [user] = await userQuery.createNewUserQuery({ ...userData, idRole: role.id }, transaction);
            await driverQuery.createDriver(
                {
                    nickName,
                    email,
                    password: await authHelpers.encryptPasswordHelper(password),
                    id: user.id
                },
                transaction
            )
            await transaction.commit();
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getAllDrivers: async (req, res) => {
        try {
            return responseHelpers.responseSuccess(res, resp);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    
    updateDriver: async (req, res) => {
        try {
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    deleteDriver: async (req, res) => {
        try {
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}