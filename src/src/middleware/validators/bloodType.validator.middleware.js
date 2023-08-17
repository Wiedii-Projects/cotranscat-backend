// Queries
const { sharedHelpers } = require('../../helpers/index.helpers');

// Helpers
const { bloodTypeQuery } = require('../../models/index.queries')

module.exports = {
    validateIdBloodType: async (req, id, data) => {
        try {
            const [bloodType] = await bloodTypeQuery.findBloodTypeQuery({ where: { id }});
            req.body[data] = bloodType
                ? sharedHelpers.decryptIdDataBase(bloodType.id)
                : false
        } catch (error) {
            req.body[data] = false;
        }
    }
}