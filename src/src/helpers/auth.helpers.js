// Constants
const { errorsConst, coreConfigurationsConst } = require('../constants/index.constants');

// Libraries
const jwt = require('jsonwebtoken');

module.exports = {
    generateJWTHelper: async (id = '') => {
        return new Promise((res, rej) => {
            const payload = { id };
            jwt.sign(payload, coreConfigurationsConst.privateKey, {
                expiresIn: '4h'
            }, (error, token) => {
                if (error) {
                    rej(errorsConst.authErrors.queryErrors.generateJWTError)
                } else {
                    res(token)
                }
            })
        })
    }
}