// Constants
const { errorsConst, coreConfigurationsConst } = require('../constants/index.constants');

// Libraries
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = {
    encryptPasswordHelper: async (password) => {
        try {
            const salt = bcryptjs.genSaltSync();
            return bcryptjs.hashSync(password, salt);
        } catch {
            throw errorsConst.authErrors.queryErrors.encryptPasswordError
        }
    },
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