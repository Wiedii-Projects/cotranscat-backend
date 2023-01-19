// Queries
const { codeSMSQuery } = require('./../../models/index.queries')

module.exports = {
    validateCode: async (code, req) => {
    req.body.validCode = await codeSMSQuery.getCodeQuery(code, req.body.uid);
},
}