const bcryptjs = require("bcryptjs");
const { User, UserGoogle, MessageErrors } = require("../../models");
const errors = require("../../errors/errors.json");

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
        return res.json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.user.unregisteredUsersDB)
        })
    }

    const count = totalUsers + totalUserGoogle;
    const rows = Array.prototype.concat(users, usersGoogle);

    res.json({
        status: true,
        data: { count, rows },
        errors: null
    })
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ state: true, _id: id });
    const userGoogle = await UserGoogle.findOne({ state: true, _id: id });

    if (!user && !userGoogle) {
        return res.status(404).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.user.idNotExist)
        })
    }

    res.json({
        status: true,
        data: { user, userGoogle },
        errors: null
    })
}

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    try {
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            status: true,
            data: user,
            errors: null
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.user.serverError)
        })
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
                return res.json({
                    status: false,
                    data: null,
                    error: new MessageErrors(errors.user.userNoUpdated)
                })
            }
        }

        if (userGoogle) {
            if (userGoogle.state === false) {
                return res.json({
                    status: false,
                    data: null,
                    error: new MessageErrors(errors.user.userNoUpdated)
                })
            }
        }

        res.json({
            status: true,
            data: { user, userGoogle },
            errors: null
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: null,
            errors: new MessageErrors(errors.user.serverError)
        })
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
            return res.json({
                status: false,
                data: null,
                error: new MessageErrors(errors.user.userDeleted)
            })
        }
    }

    if (userGoogle) {
        if (userGoogle.state === true) {
            await UserGoogle.findByIdAndUpdate(id, { state: false });
        } else {
            return res.json({
                status: false,
                data: null,
                error: new MessageErrors(errors.user.userDeleted)
            })
        }
    }

    res.json({
        status: true,
        data: { user, userGoogle },
        errors: null
    })
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}