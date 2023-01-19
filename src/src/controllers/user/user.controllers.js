// Constants
const errorsConst = require('./../../constants/index');

// Helpers
const authHelpers = require('./../../helpers/auth.helpers')
const userHelpers = require('./../../helpers/user.helpers')
const responseHelpers = require('./../../helpers/response.helpers')

// Models - Queries
const { userQuery, userGoogleQuery } = require('./../../models/index.queries')

module.exports = {
    getUsers: async (req, res) => {
        const { limit = 10, since = 0 } = req.query;

        try {
            const { totalUsers, users } = await userQuery.getAllUsersQuery(limit, since, { state: true });
            const { totalUserGoogle, usersGoogle } = await userGoogleQuery.getAllUserGoogleQuery(limit, since, { state: true });
            return responseHelpers.responseValid(res, { count: (totalUsers || 0) + (totalUserGoogle || 0), users, usersGoogle });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getUser: async (req, res) => {
        const { user } = req.body;

        if (!user) {
            return responseHelpers.responseError(res, 500, errorsConst.aggregateErrorsApp.errorGetUser);
        }

        return responseHelpers.responseValid(res, { user });

    },
    createUser: async (req, res) => {
        try {
            await userHelpers.createUserModelUserHelper(req);
            return responseHelpers.responseValid(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    updateUser: async (req, res) => {
        const { dataUpdate, user } = req.body;

        try {
            dataUpdate.password = dataUpdate.password 
                ?  await authHelpers.encryptPasswordHelper(dataUpdate.password) 
                : dataUpdate.password;
            const userUpdate = await userQuery.updateDataUserQuery(user._id, dataUpdate);
            const userGoogleUpdate = await userGoogleQuery.updateDataUserGoogleQuery(user._id, dataUpdate);
            return userUpdate || userGoogleUpdate
                ? responseHelpers.responseValid(res, null)
                : responseHelpers.responseError(res, 400, errorsConst.userErrors.userNoUpdated);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    deleteUser: async (req, res) => {
        const { user } = req.body;

        try {
            const userUpdate = await userQuery.updateDataUserQuery(user._id, { state: false });
            const userGoogleUpdate = await userGoogleQuery.updateDataUserGoogleQuery(user._id, { state: false });
            return userUpdate || userGoogleUpdate 
                ? responseHelpers.responseValid(res, null) 
                : responseHelpers.responseError(res, 400, errorsConst.userErrors.userNoDelete);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}