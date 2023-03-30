// Constants
const { errorsConst, roleConst } = require('../constants/index.constants');

// Helpers
const { authHelpers, userHelpers, responseHelpers, sharedHelpers } = require('../helpers/index.helpers');

// Models - Queries
const { userQuery, roleQuery } = require('../models/index.queries');

module.exports = {
    getUsers: async (req, res) => {
        const { limit = 10, offset = 0 } = req.query;

        try {
            const { count, users } = await userQuery.findAndCountUserQuery({ where: { state: true }, limit, offset})
            return responseHelpers.responseSuccess(res, { count, users });
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    getUser: async (req, res) => {
        const { user } = req.body;

        return user
            ? responseHelpers.responseSuccess(res, user)
            :responseHelpers.responseError(res, 500, errorsConst.aggregateErrorsApp.errorGetUser);
    },
    createUser: async (req, res) => {
        const { password } = req.body;

        try {
            const [ role ] = await roleQuery.findRoleQuery({ role: roleConst.USER_ROLE });
            const passwordEncrypt = await authHelpers.encryptPasswordHelper(password);
            const user = userHelpers.extractUserDataHelper({ ...req.body, password: passwordEncrypt, role: role.id });
            await userHelpers.createUserModelUserHelper(user);
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    createAdminUser: async (req, res) => {
        const { password } = req.body;

        try {
            const [ role ] = await roleQuery.findRoleQuery({ role: roleConst.ADMIN_ROLE });
            const passwordEncrypt = await authHelpers.encryptPasswordHelper(password);
            const user = userHelpers.extractUserDataHelper({ ...req.body, password: passwordEncrypt, role: role.id });
            await userHelpers.createUserModelUserHelper(user);
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    updateUser: async (req, res) => {
        const { user } = req.body;
        const dataUpdate = userHelpers.extractUserDataHelper(req.body);
        try {
            const id = sharedHelpers.decryptIdDataBase(user.id);
            dataUpdate.password = dataUpdate.password
                ? await authHelpers.encryptPasswordHelper(dataUpdate.password)
                : dataUpdate.password;
            await userQuery.updateUserQuery({ id }, dataUpdate);
            return responseHelpers.responseSuccess(res, null);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    },
    deleteUser: async (req, res) => {
        const { user } = req.body;
        try {
            const id = sharedHelpers.decryptIdDataBase(user.id);
            const [ update ] = await userQuery.updateUserQuery({ id }, { state: false });
            return update
                ? responseHelpers.responseSuccess(res, null)
                : responseHelpers.responseError(res, 400, errorsConst.userErrors.userNoDelete);
        } catch (error) {
            return responseHelpers.responseError(res, 500, error);
        }
    }
}