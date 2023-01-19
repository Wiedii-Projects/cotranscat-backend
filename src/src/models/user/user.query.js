// Constants
const { errorsConst } = require('./../../constants/index');

// Models
const { User } = require('./../index.models')

module.exports = {
    getUserQuery: async (email) => {
        try {
            return await User.findOne({ email }, { google: 0 });
        } catch {
            return false;
        }
    },
    getUserIDQuery: async (id) => {
        try {
            return await User.findById(id);
        } catch {
            return false;
        }
    },
    getUserIdStateQuery: async (id) => {
        try {
            return await User.findOne({ state: true, _id: id }, { google: 0 });
        } catch {
            return false;
        }
    },
    getAllUsersQuery: async (limit, since, query) => {
        const responseAllUser = await Promise.all([
            User.countDocuments({ state: true }),
            User.find(query, { google: 0, state: 0, role: 0, phoneNumber: 0 })
                .skip(Number(since))
                .limit(Number(limit))
        ])
            .then(responses => {
                return {
                    totalUsers: responses[0],
                    users: responses[1]
                }
            })
            .catch(() => {
                throw errorsConst.aggregateErrorsApp.errorGetAllUser
            })

        return responseAllUser
    },
    createNewUserQuery: async (data) => {
        try {
            const user = new User(data);
            await user.save();
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateUser
        }
    },
    emailExistsQuery: async (email = '') => {
        const emailInUse = await User.findOne({ email });
        return emailInUse;
    },
    updateDataUserQuery: async (id, data) => {
        try {
            return await User.findByIdAndUpdate(id, data)
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateUser
        }
    }
}