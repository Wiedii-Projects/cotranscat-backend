
const { UserGoogle } = require("../../models");


const createUser = async(req) => {
    user = new UserGoogle(req);
    await user.save();
}

const getUserGoogle = async(email) => {
    try {
        return await UserGoogle.findOne({ email });
    } catch (error) {
        return false;
    }
}

module.exports = {
    createUser,
    getUserGoogle
}