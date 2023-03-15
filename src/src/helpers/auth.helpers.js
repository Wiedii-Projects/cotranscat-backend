// Constants
const { errorsConst, coreConfigurationsConst } = require('../constants/index.constants');

// Libraries
const bcryptjs = require("bcryptjs");
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');


const client = new OAuth2Client(coreConfigurationsConst.googleClientId);

module.exports = {
    encryptPasswordHelper: async (password) => {
        try {
            const salt = bcryptjs.genSaltSync();
            return bcryptjs.hashSync(password, salt);
        } catch {
            throw errorsConst.aggregateErrorsApp.errorEncryptPassword
        }
    },
    googleVerifyHelper: async (token = '') => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: coreConfigurationsConst.googleClientId,
            });
            const { name, picture, email } = ticket.getPayload();

            return {
                name,
                picture,
                email
            };
        } catch {
            throw errorsConst.aggregateErrorsApp.errorVerifyTokenGoogle
        }
    },
    generateJWTHelper: async (id = '') => {
        return new Promise((res, rej) => {
            const payload = { id };
            jwt.sign(payload, coreConfigurationsConst.privateKey, {
                expiresIn: '4h'
            }, (error, token) => {
                if (error) {
                    rej(errorsConst.aggregateErrorsApp.errorGenerateJWT)
                } else {
                    res(token)
                }
            })
        })
    }
}