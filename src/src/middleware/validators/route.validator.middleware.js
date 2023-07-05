

// Helpers
const { routeQuery } = require('./../../models/index.queries')

module.exports = {
    validateRoute: async (req, query) => {
        try {
            const [route] = await routeQuery.findRouteQuery(query);
            req.body.route = route
        } catch (error) {
            req.body.route = route;
        }
    },
    validateHeadquarterByRouteSource: async (req, query) => {
        try {
            const headquarter = await routeQuery.findHeadquarterByMunicipalitySourceQuery(query);
            req.body.headquarter = headquarter.id ? headquarter : false
        } catch (error) {
            req.body.headquarter = false;
        }
    }
}