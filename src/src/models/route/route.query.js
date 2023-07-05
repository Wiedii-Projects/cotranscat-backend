// Constants
const { errorsConst } = require('../../constants/index.constants');

// Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { Route, Municipality, Headquarter } = require('../index.models');

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
    findHeadquarterByMunicipalitySourceQuery: async (query = {}) => {
        const { where } = query;
        try {
            const [headquarterFound] = await Route.findAll({
                where,
                include: [
                    {
                        model: Municipality,
                        as: 'MunicipalityDepart',
                        include: [
                            {
                                model: Headquarter,
                                as: 'MunicipalityHeadquarter'
                            }
                        ]
                    }
                ],
                raw: true,
                nest: true
            })

            const {
                MunicipalityDepart: { MunicipalityHeadquarter: { id, description, idMunicipality } }
            } = headquarterFound

            return {
                id: sharedHelpers.encryptIdDataBase(id),
                description,
                idMunicipality
            }
        } catch {
            throw errorsConst.routeErrors.queryErrors.findHeadquarterByMunicipalitySourceError
        }
    }
}