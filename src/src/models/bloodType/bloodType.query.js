// Constants
const { errorsConst } = require('../../constants/index.constants');

//Helpers
const sharedHelpers = require('../../helpers/shared.helpers');

// Models
const { BloodType } = require('../index.models');

module.exports = {

    findBloodTypeQuery: async (query = {}) => {
        try {
            const { where } = query;
            return await BloodType.findAll({
                where,
                raw: true
            }).then(bloodType => bloodType.map(({ id, name }) => ({
                id: sharedHelpers.encryptIdDataBase(id),
                name
            })))
        } catch {
            throw errorsConst.bloodTypeErrors.queryErrors.findAllError
        }
    }
}