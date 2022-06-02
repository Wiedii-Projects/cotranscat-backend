const { User, Role, UserGoogle } = require("../models");
const { MessageErrors } = require("../models");
const errors = require("../errors/errors.json");

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new MessageErrors(errors.user.unregisteredRoleDB);
    }
};

const emailExists = async (email = '') => {
    const emailInUse = await User.findOne({ email });
    const emailGoogleInUse = await UserGoogle.findOne({ email });
    if (emailInUse || emailGoogleInUse) {
        throw new MessageErrors(errors.user.emailInUse);
    }
}

const userExistsById = async (id = '') => {
    const userExists = await User.findById(id);
    const userGoogleExists = await UserGoogle.findById(id);
    if (!userExists && !userGoogleExists) {
        throw new MessageErrors(errors.user.idNotExist);
    }
}

const validateEmailExists = async (email = '') => {
    const user = await User.findOne({ email });
    const userGoogle = await UserGoogle.findOne({ email });
    if (!user && !userGoogle) {
        throw new MessageErrors(errors.auth.emailExist);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById,
    validateEmailExists
}