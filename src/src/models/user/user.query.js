// Constants
const { errorsConst } = require('../../constants/index.constants');

// Models
const { User, Role } = require('./../index.models');

// Helpers
const { encryptIdDataBase } = require('../../helpers/shared.helpers');

module.exports = {
    findAndCountUserQuery: async (query) => {
        let {
            where,
            attributes = ['id', 'name', 'lastName', 'email', 'phoneNumber', 'state', 'img'],
            group,
            limit,
            offset,
            order
        } = query;
        try {
            return await User.findAndCountAll({
                where,
                attributes,
                raw: true,
                include: [{
                    model: Role,
                    as: 'UserRole'
                }],
                nest: true,
                group,
                order,
                offset,
                limit
            }).then(({ rows, count }) => ({
                users: rows.map(({ UserRole, id, ...user }) => ({
                    id: encryptIdDataBase(id),
                    ...user,
                    role: {
                        ...UserRole,
                        id: encryptIdDataBase(UserRole.id),
                    }
                })),
                count
            }))
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetAllUser
        }
    },
    findUserQuery: async (query) => {
        try {
            const {
                where,
                attributes = ['id', 'name', 'lastName', 'email', 'phoneNumber', 'state', 'img'],
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
                    as: 'UserRole'
                }],
                nest: true,
                group,
                order,
                limit,
                offset
            }).then(users => (users.map(({ UserRole, id, ...user }) => ({
                id: encryptIdDataBase(id),
                ...user,
                role: {
                    ...UserRole,
                    id: encryptIdDataBase(UserRole.id),
                }
            }))
            ));
        } catch {
            throw errorsConst.aggregateErrorsApp.errorGetAllUser
        }
    },
    createNewUserQuery: async (where) => {
        try {
            return await User.findOrCreate({ where });
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