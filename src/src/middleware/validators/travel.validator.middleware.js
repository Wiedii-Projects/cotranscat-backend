// Queries
const { travelQuery } = require('./../../models/index.queries')

module.exports = {
    validateTravel: async (req, where) => {
        try {
            const [travel] = await travelQuery.findTravels(where)
            req.body.travel = travel
        } catch (error) {
            req.body.travel = false;
        }
    },
    validateTravelId: async (id, req) => {
        try {
            const [travel] = await travelQuery.findTravels({ id });
            req.body.travelExist = travel;
            req.body.idTravel = id;
        } catch {
            req.body.travelExist = false;
        }
    }
}