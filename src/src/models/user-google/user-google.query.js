// Models
const { UserGoogle } = require('./../index.models')

module.exports = {
    createUserQuery: async (req) => {
        user = new UserGoogle(req);
        await user.save();
    },
    getUserGoogleQuery: async (email) => {
        try {
            return await UserGoogle.findOne({ email }, { google: 0 });
        } catch (error) {
            return false;
        }
    },
    getUserStateGoogleQuery: async (id) => {
        try {
            return await UserGoogle.findOne({ state: true, _id: id });
        } catch (error) {
            return false;
        }
    },
    getAllUserGoogleQuery: async (limit, since, query) => {
        const [totalUserGoogle, usersGoogle] = await Promise.all([
            UserGoogle.countDocuments(query),
            UserGoogle.find(query)
                .skip(Number(since))
                .limit(Number(limit))
        ]);
        return { totalUserGoogle, usersGoogle };
    },
    emailGoogleExistsQuery: async (email = '') => {
        const emailGoogleInUse = await UserGoogle.findOne({ email });
        return emailGoogleInUse;
    },
    getUserGoogleIDQuery: async (id) => {
        try {
            return await UserGoogle.findById(id, { google: 0 });
        } catch (error) {
            return false;
        }
    },
    updateDataUserGoogleQuery: async (id, data) => {
        return await UserGoogle.findByIdAndUpdate(id, data)
    }
}