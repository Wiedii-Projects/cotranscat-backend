
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

const getUserGoogleID = async(id) => {
    try {
        return await UserGoogle.findById(id);
    } catch (error) {
        return false;
    }
}

const getUserStateGoogle = async(id) => {
    try {
        return await UserGoogle.findOne({ state: true, _id: id });
    } catch (error) {
        return false;
    }
}

const getAllUserGoogle = async(limit, since, query) => {
    const [totalUserGoogle, usersGoogle] = await Promise.all([
        UserGoogle.countDocuments(query),
        UserGoogle.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ]);
    return { totalUserGoogle, usersGoogle };
}

const emailGoogleExists = async (email = '') => {
    const emailGoogleInUse = await UserGoogle.findOne({ email });
    return emailGoogleInUse;
}

const updateDataUserGoogle = async(id, data) => {
    return await UserGoogle.findByIdAndUpdate(id, data)
}

module.exports = {
    createUser,
    getUserGoogle,
    getUserStateGoogle,
    getAllUserGoogle,
    emailGoogleExists,
    getUserGoogleID,
    updateDataUserGoogle
}