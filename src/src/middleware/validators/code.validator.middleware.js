// Queries
const { codeSMSQuery } = require('./../../models/index.queries')

module.exports = {
    validateCode: async (where, req) => {
        try {
            req.body.validCode = await codeSMSQuery.findCodeQuery({ where });
        } catch {
            req.body.validCode = false
        }
},
}