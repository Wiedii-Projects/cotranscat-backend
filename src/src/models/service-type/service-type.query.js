// Constants
const { errorsConst } = require("../../constants/index.constants");

// Models
const { ServiceType } = require("../index.models");

module.exports = {
    createServiceType: async (data) => {
        try {
            return await ServiceType.serviceType(data)
        } catch {
            throw errorsConst.serviceTypeErrors.queryErrors.createError;
        }
    },
    findServiceTypeQuery: async (query = {}) => {
        const { where } = query;
        try {
            const test =  await ServiceType.findAll({
                where,
                raw: true,
                nest:true
            });
            console.log(JSON.stringify(test, null, 4))
            return test
        } catch {
            throw errorsConst.serviceTypeErrors.queryErrors.findAllError
        }
    },
}