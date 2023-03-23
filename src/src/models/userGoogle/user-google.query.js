// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { UserGoogle } = require('../index.models')

module.exports = {
    createUserQuery: async (data) => {
        try {
            const userGoogle = await UserGoogle.findByPk(id);
            await userGoogle.update(data);
            return true
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateUserGoogle
        }
    },
    getUserGoogleQuery: async (email) => {
        try {
            return await UserGoogle.findOne({ where: { email, google: 0  } });
        } catch {
            return false;
        }
    },
    getAllUserGoogleQuery: async (limit, offset, query) => {
        try {
            const countsUser = await UserGoogle.findAndCountAll({
                where: query,
                offset: Number(offset),
                limit: Number(limit)
            });
    
            return {
                totalUsers: countsUser.count,
                users: countsUser.rows
            }
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetAllUserGoogle
        }
    },
    emailGoogleExistsQuery: async (email = '') => {
        try {
            return await UserGoogle.findOne({ where: { email } });
        } catch {
            return false
        }
    },
    getUserGoogleIDQuery: async (id) => {
        try {
            const user = await UserGoogle.findAll({ where: { state: true, id: id, google: 0 } });
            if (user.length === 0) throw false
            return { ...user[0].dataValues}
        } catch {
            return false;
        }
    },
    updateDataUserGoogleQuery: async (id, data) => {
        try {
            await UserGoogle.update(data, {
                where: { id }
              });
            return true
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateUserGoogle
        }
    }
}