// Models
const { User } = require('./../index.models')

module.exports = {
    getUserQuery: async (email) => {
        try {
            return await User.findOne({ email }, { google: 0 });
        } catch (error) {
            return false;
        }
    },
    getUserIDQuery: async (id) => {
        try {
            return await User.findById(id);
        } catch (error) {
            return false;
        }
    },
    getUserIdStateQuery: async (id) => {
        try {
            return await User.findOne({ state: true, _id: id }, { google: 0 });
        } catch (error) {
            return false;
        }
    },
    getAllUsersQuery: async (limit, since, query) => {
        const [totalUsers, users] = await Promise.all([
            User.countDocuments({ state: true }),
            User.find(query, { google: 0, state: 0, role: 0, phoneNumber: 0 })
                .skip(Number(since))
                .limit(Number(limit))
        ]);
        return { totalUsers, users }
    },
    createNewUserQuery: async (data) => {
        const user = new User(data);
        await user.save();
    },
    emailExistsQuery: async (email = '') => {
        const emailInUse = await User.findOne({ email });
        return emailInUse;
    },
    updateDataUserQuery: async (id, data) => {
        return await User.findByIdAndUpdate(id, data)
    }
}