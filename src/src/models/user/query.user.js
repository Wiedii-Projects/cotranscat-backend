
const { User } = require("../../models");
const bcryptjs = require("bcryptjs");


const getUser = async(email) => {
    try {
        return await User.findOne({ email }, {google: 0});
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

const getUserIdState = async(id) => {
    try {
        return await User.findOne({ state: true, _id: id }, {google: 0});
    } catch (error) {
        return false;
    }
}

const getAllUsers = async(limit, since, query) => {
    const [totalUsers, users] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find(query, {google:0, state:0, role:0,phoneNumber:0})
            .skip(Number(since))
            .limit(Number(limit))
    ]);
    return { totalUsers, users }
}

const createNewUser = async(data) => {
    const user = new User(data);
    await user.save();
}

const emailExists = async (email = '') => {
    const emailInUse = await User.findOne({ email });
    return emailInUse;
}

const updateDataUser = async(id, data) => {
    return await User.findByIdAndUpdate(id, data)
}

module.exports = {
    getUser,
    getUserID,
    getUserIdState,
    getAllUsers,
    createNewUser,
    emailExists,
    updateDataUser
}