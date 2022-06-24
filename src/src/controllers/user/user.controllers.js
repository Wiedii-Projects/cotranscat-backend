const bcryptjs = require("bcryptjs");
const { User, UserGoogle } = require("../../models");
const errors = require("../../errors/errors.json");
const { responseValid, responseError } = require("../../errors/response");

const getUsers = async (req, res) => {
    const { limit = 10, since = 0 } = req.query;
    const query = { state: true };

    const [totalUsers, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    const [totalUserGoogle, usersGoogle] = await Promise.all([
        UserGoogle.countDocuments(query),
        UserGoogle.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    if (totalUsers === 0 && totalUserGoogle === 0) {
        return responseError(res, 400, errors.user.unregisteredUsersDB);
    }

    const count = totalUsers + totalUserGoogle;
    const rows = Array.prototype.concat(users, usersGoogle);
    return responseValid(res, { count, rows });
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ state: true, _id: id });
    const userGoogle = await UserGoogle.findOne({ state: true, _id: id });

    if (!user && !userGoogle) {
        return responseError(res, 400, errors.user.idNotExist);
    }

    return responseValid(res, { user, userGoogle });
}

const createUser = async (req, res) => {
    const { name, lastName, email, password, phoneNumber, role } = req.body;
    const user = new User({ name, lastName, email, password, phoneNumber, role });

    try {
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();
        return responseValid(res, user);

    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { _id, password, email, google, ...body } = req.body;

    try {
        if (password) {
            const salt = bcryptjs.genSaltSync();
            body.password = bcryptjs.hashSync(password, salt);
        }

        const user = await User.findByIdAndUpdate(id, body);
        const userGoogle = await UserGoogle.findByIdAndUpdate(id, body);

        if (user) {
            if (user.state === false) {
                return responseError(res, 400, errors.user.userNoUpdated);
            }
        }
        if (userGoogle) {
            if (userGoogle.state === false) {
                return responseError(res, 400, errors.user.userNoUpdated);
            }
        }
        return responseValid(res, {user, userGoogle});

    } catch (error) {
        return responseError(res, 500, errors.auth.somethingWentWrong);
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const userGoogle = await UserGoogle.findById(id);

    if (user) {
        if (user.state === true) {
            await User.findByIdAndUpdate(id, { state: false });
        } else {
            return responseError(res, 400, errors.user.userDeleted);
        }
    }

    if (userGoogle) {
        if (userGoogle.state === true) {
            await UserGoogle.findByIdAndUpdate(id, { state: false });
        } else {
            return responseError(res, 400, errors.user.userDeleted);
        }
    }
    return responseValid(res, {user, userGoogle});
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}