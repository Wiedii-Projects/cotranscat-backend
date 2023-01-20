// Constants
const { errorsConst } = require('../../constants/index.constants');

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
    getAllUserGoogleQuery: async (limit, since, query) => {
        const responseAllUserGoogle = await Promise.all([
            UserGoogle.countDocuments(query),
            UserGoogle.find(query)
                .skip(Number(since))
                .limit(Number(limit))
        ])
            .then(responses => {
                return {
                    totalUserGoogle: responses[0],
                    usersGoogle: responses[1]
                }
            })
            .catch(() => {
                throw errorsConst.aggregateErrorsApp.errorGetAllUserGoogle
            })

        return responseAllUserGoogle
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
        try {
            return await UserGoogle.findByIdAndUpdate(id, data)
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateUserGoogle
        }
    }
}