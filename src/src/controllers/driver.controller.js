// DB Connections
const { dbConnectionOptions } = require('../constants/core/core-configurations.const');

// Helpers
const { responseHelpers, authHelpers } = require('../helpers/index.helpers');
const { extractUserDataHelper, extractDriverDataHelper } = require('../helpers/user.helpers');

// Models - Queries
const { userQuery, roleQuery, driverQuery } = require('../models/index.queries');


module.exports = {
    createDriver: async (req, res) => {
        const userData = extractUserDataHelper(req.body);
        const { password, ...driverData } = extractDriverDataHelper(req.body);
        let transaction;
        try {
            transaction = await dbConnectionOptions.transaction();
            //TODO: User role process flow adjustment   
            const [role] = await roleQuery.findRoleQuery({ role: 'DRIVER_ROLE' });
            const [user] = await userQuery.createNewUserQuery({ ...userData, idRole: role.id }, transaction);
            await driverQuery.createDriver(
                {
                    id: user.id,
                    password: await authHelpers.encryptPasswordHelper(password),
                    ...driverData
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
            const drivers = await driverQuery.findDrivers();
            return responseHelpers.responseSuccess(res, drivers);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    getDriver: async (req, res) => {
        const { driver } = req.body
        try {
            return responseHelpers.responseSuccess(res, driver);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },

    updateDriver: async (req, res) => {
        const { decryptId: id } = req.body;
        const userData = extractUserDataHelper(req.body);
        const { password, ...driverData } = extractDriverDataHelper(req.body);
        let transaction;
        try {
            transaction = await dbConnectionOptions.transaction();

            await Promise.all([
                userQuery.updateUserQuery({ id }, userData, transaction),
                driverQuery.updateDriver({
                    ...driverData,
                    password: password ? await authHelpers.encryptPasswordHelper(password) : undefined,
                }, { id }, transaction)
            ])

            await transaction.commit();
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            if (transaction) await transaction.rollback();
            return responseHelpers.responseError(res, 500, error);
        }
    }
}