const bcryptjs = require("bcryptjs");
const { User } = require("../../models")

const getUsers = async (req, res) => {
    const { limit = 10, since = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({
        status: true,
        data: { total, users },
        errors: null
    })
}

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(201).json({
        status: true,
        data: user,
        errors: null
    })
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { _id, password, email, google, ...body } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, body);

    res.json({
        status: true,
        data: user,
        errors: null
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });

    res.json({
        status: true,
        data: user,
        errors: null
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}