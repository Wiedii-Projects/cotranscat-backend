const { functionalityQuery } = require('./../../models/index.queries');

module.exports = {

    validateFunctionality: async (where, req) => {
        try {
            const [functionality] = await functionalityQuery.findFunctionalitiesQuery({where});
            req.body.functionality = functionality
        } catch (error) {
            req.body.functionality = false;
        }
    }
}