const { User, Role, UserGoogle } = require("../models");

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`The role ${role} is not registered in the DB`);
    }
};

const emailExists = async (email = '') => {
    const emailInUse = await User.findOne({ email });
    const emailGoogleInUse = await UserGoogle.findOne({ email });
    if (emailInUse || emailGoogleInUse) {
        throw new Error(`Email ${email} is already in use`)
    }
}

const userExistsById = async (id = '') => {
    const userExists = await User.findById(id);
    const userGoogleExists = await UserGoogle.findById(id);
    if (!userExists && !userGoogleExists) {
        throw new Error(`The ID ${id} does not exist`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById
}