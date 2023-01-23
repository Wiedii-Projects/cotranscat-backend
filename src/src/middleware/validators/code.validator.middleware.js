// Queries
const { codeSMSQuery } = require('./../../models/index.queries')

module.exports = {
    validateCode: async (code, req) => {
        const { user } = req.body
        try {
            req.body.validCode = await codeSMSQuery.getCodeQuery(code, user.id);
        } catch {
            req.body.validCode = false
        }
},
}