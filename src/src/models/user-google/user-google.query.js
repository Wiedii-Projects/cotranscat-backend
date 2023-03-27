// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { UserGoogle, Role } = require('../index.models')

module.exports = {
    findUserGoogleQuery: async (query) => {
        try {
            let {
                where, 
                attributes = [ 'id', 'name', 'lastName', 'email', 'phoneNumber', 'state', 'img', 'google'], 
                group, 
                limit, 
                offset, 
                order
            } = query;
            return await UserGoogle.findAll({ 
                where, 
                attributes, 
                raw: true,
                include: [{
                    model: Role,
                    as: 'userGoogleRole'
                  }],
                group,
                order,
                limit, 
                offset
                }).then( users => {
                    const usersWithRole = users.map(user => {
                        user.role = {};
                        user.role['id'] = user['userGoogleRole.id'];
                        user.role['role'] = user['userGoogleRole.role'];
                        delete user['userGoogleRole.id'];
                        delete user['userGoogleRole.role'];
                        return user;
                    });
                    return usersWithRole;
                });
        } catch (e){
            console.log(e)
            throw errorsConst.aggregateErrorsApp.errorGetAllUser
        }
    },
    findAndCountUserGoogleQuery: async (query) => {
        try {
            let {
                where, 
                attributes = [ 'id', 'name', 'lastName', 'email', 'phoneNumber', 'state', 'img', 'google'], 
                group, 
                limit, 
                offset, 
                order
            } = query;
            const { rows, count: countUserGoogle } = await UserGoogle.findAndCountAll({
                where,
                attributes,
                raw: true,
                include: [{
                    model: Role,
                    as: 'userGoogleRole'
                  }],
                group,
                order,
                offset: Number(offset),
                limit: Number(limit)
            });
            const usersGoogle = rows.map( (user) => {
                user.role = {};
                user.role['id'] = user['userGoogleRole.id'];
                user.role['role'] = user['userGoogleRole.role'];
                delete user['userGoogleRole.id'];
                delete user['userGoogleRole.role'];
                return user;
            });
            return { usersGoogle, countUserGoogle }; 
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetAllUserGoogle
        }
    },
    createUserQuery: async (data) => {
        try {
            const userGoogle = await UserGoogle.findByPk(id);
            await userGoogle.update(data);
            return true
        } catch {
            throw errorsConst.aggregateErrorsApp.errorCreateUserGoogle
        }
    },
    updateDataUserGoogleQuery: async (where, update) => {
        try {
            return await UserGoogle.update(update, {
                where
            });
        } catch {
            throw errorsConst.aggregateErrorsApp.errorUpdateUserGoogle
        }
    }
}