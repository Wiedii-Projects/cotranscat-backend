const { User, Role } = require("../models");

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`The role ${role} is not registered in the DB`);
    }
};

const emailExists = async (email = '') => {
    const emailInUse = await User.findOne({ email });
    if (emailInUse) {
        throw new Error(`Email ${email} is already in use`)
    }
}

const userExistsById = async (id = '') => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`The ID ${id} does not exist`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById
}