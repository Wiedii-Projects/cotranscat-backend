
const { User } = require("../../models");

const getUser = async(email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        return false;
    }
}

const getUserID = async(id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        return false;
    }
}

module.exports = {
    getUser,
    getUserID
}