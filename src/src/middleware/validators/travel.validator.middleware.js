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
    }
}