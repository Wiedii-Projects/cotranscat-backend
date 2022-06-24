const errors = require("../../errors/errors.json");
const { responseValid, responseError } = require("../../errors/response");
const { getAllUsers, updateDataUser } = require("../../models/user/query.user");
const { getAllUserGoogle, updateDataUserGoogle } = require("../../models/userGoogle/query.userGoogle");
const { createUserModelUser, encryptPassword } = require("../../helpers/validator/user.validator");

const getUsers = async (req, res) => {

    const { limit = 10, since = 0 } = req.query;
    const { totalUsers, users } = await getAllUsers(limit, since);
    const { totalUserGoogle, usersGoogle } = getAllUserGoogle(limit, since);
    return responseValid(res, { count: (totalUsers||0)+(totalUserGoogle||0), users, usersGoogle });
}

const getUser = async (req, res) => {
    try {
        const { user } = req.body;
        return responseValid(res, { user });
    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
}

const createUser = async (req, res) => {
    try {
        const user = await createUserModelUser(req);
        return responseValid(res, user);

    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
}

const updateUser = async (req, res) => {
    try {
        const { dataUpdate, user } = req.body;
        dataUpdate.password = dataUpdate.password? encryptPassword(dataUpdate.password) : dataUpdate.password;
        const userUpdate = await updateDataUser(user._id, dataUpdate);
        const userGoogleUpdate = await updateDataUserGoogle(user._id, dataUpdate);
        return userUpdate || userGoogleUpdate ? responseValid(res, null) : responseError(res, 400, errors.user.userNoUpdated);
    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
}

const deleteUser = async (req, res) => {
    const userUpdate = await updateDataUser(req.body.user._id, { state: false });
    const userGoogleUpdate = await updateDataUserGoogle(req.body.user._id, { state: false });
    return userUpdate || userGoogleUpdate ? responseValid(res, null) : responseError(res, 400, errors.user.userNoDelete);
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}