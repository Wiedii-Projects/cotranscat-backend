// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { User, Role } = require('./../index.models');

// Helpers
const { encryptIdDataBase } = require('../../helpers/shared.helpers');

module.exports = {
    findAndCountUserQuery: async (query) => {
        try {
            let {
                where, 
                attributes = [ 'id', 'name', 'lastName', 'email', 'phoneNumber', 'state', 'img', 'google'], 
                group, 
                limit, 
                offset, 
                order
            } = query;
            const { rows, count } = await User.findAndCountAll({
                where,
                attributes,
                raw: true,
                include: [{
                    model: Role,
                    as: 'userRole'
                  }],
                group,
                order,
                offset,
                limit
            });
            const users = rows.map( (user) => {
                user.role = {};
                user.role['id'] = encryptIdDataBase(user['userRole.id']);
                user.role['role'] = user['userRole.role'];
                delete user['userRole.id'];
                delete user['userRole.role'];
                user.id = encryptIdDataBase(user.id)
                return user;
            });
            return { users, count }; 
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetAllUser
        }
    },
    findUserQuery: async (query) => {
        try {
            const {
                where, 
                attributes = [ 'id', 'name', 'lastName', 'email', 'phoneNumber', 'state', 'img', 'google'], 
                group, 
                limit, 
                offset, 
                order
            } = query;
            return await User.findAll({ 
                where, 
                attributes, 
                raw: true,
                include: [{
                    model: Role,
                    as: 'userRole'
                  }],
                group,
                order,
                limit, 
                offset
                }).then( users => {
                    const usersWithRole = users.map( user => {
                        user.role = {};
                        user.role['id'] = encryptIdDataBase(user['userRole.id']);
                        user.role['role'] = user['userRole.role'];
                        delete user['userRole.id'];
                        delete user['userRole.role'];
                        user.id = encryptIdDataBase(user.id)
                        return user;
                    });
                    return usersWithRole;
                });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetAllUser
        }
    },
    createNewUserQuery: async (user) => {
        const { name, lastName, email, phoneNumber, password, role, img } = user;
        try {
            return await User.findOrCreate({
                where: { name, lastName, email, password, phoneNumber, role, img }
            });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateUser
        }
    },
    updateUserQuery: async (where, update) => {
        try {
            return await User.update(update, {
                where
              });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateUser
        }
    }
}