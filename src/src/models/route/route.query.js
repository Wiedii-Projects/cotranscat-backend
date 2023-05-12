// Constants
const { errorsConst } = require('../../constants/index.constants');
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Route, Municipality } = require('../index.models');

module.exports = {
    createRouteQuery: async (where) => {
        try {
            return await Route.findOrCreate({where})
        } catch {
            throw errorsConst.routeErrors.queryErrors.createError
        }
    },
    findRouteQuery: async (query = {}) => {
        const { where } = query;
        try {
            return await Route.findAll({
                where,
                raw: true,
                include:[
                    {model: Municipality, as: 'MunicipalityDepart'},
                    {model: Municipality, as: 'MunicipalityArrive'}
                ],
                nest:true
            }).then(route => route.map(({ id, MunicipalityDepart, MunicipalityArrive  }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name : `${MunicipalityDepart.name} - ${MunicipalityArrive.name}`
            })))
        } catch {
            throw errorsConst.routeErrors.queryErrors.findAllError
        }
    },
}