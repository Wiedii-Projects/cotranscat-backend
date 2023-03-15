// Constants
const { errorsConst } = require('../../constants/index.constants')

// Models
const { User } = require('./../index.models')

module.exports = {
    getUserQuery: async (email) => {
        try {
            return await User.findOne({ where: { email, google: 0  } });
        } catch {
            return false;
        }
    },
    getUserIDQuery: async (id) => {
        try {
            const user = await User.findAll({ where: { state: true, id: id } });
            if (user.length === 0) throw false
            return { ...user[0].dataValues}
        } catch {
            return false;
        }
    },
    getUserIdStateQuery: async (id) => {
        try {
            return await User.findOne({ where: { state: true, id: id, google: 0  } });
        } catch {
            return false;
        }
    },
    getAllUsersQuery: async (limit, offset, query) => {
        try {
            const countsUser = await User.findAndCountAll({
                where: query,
                offset: Number(offset),
                limit: Number(limit)
            });

            return {
                totalUsers: countsUser.count,
                users: countsUser.rows
            }

        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetAllUser
        }
    },
    createNewUserQuery: async (user) => {
        const { name, lastName, email, phoneNumber, password, role } = user

        try {
            await User.findOrCreate({
                where: { name, lastName, email, password, phoneNumber, role },
                defaults: { google: false, state: true, img: "" }
            });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateUser
        }
    },
    emailExistsQuery: async (email = '') => {
        try {
            return await User.findOne({ where: { email } });
        } catch  {
            return false
        }
    },
    updateDataUserQuery: async (id, data) => {
        try {
            await User.update(data, {
                where: { id }
              });
            return true
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateUser
        }
    }
}