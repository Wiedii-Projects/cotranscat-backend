// Configuration environment
const { googleClientId, privateKey } = require('../config');

// Constants
const constants = require('./../constants/index')

// Libraries
const bcryptjs = require("bcryptjs");
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(googleClientId);

module.exports = {
    encryptPasswordHelper: async (password) => {
        const salt = bcryptjs.genSaltSync();
        return bcryptjs.hashSync(password, salt);
    },
    googleVerifyHelper: async (token = '') => {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: googleClientId,
        });
        const { name, picture, email } = ticket.getPayload();

        return {
            name,
            picture,
            email
        };
    },
    generateJWTHelper: (uid = '') => {
        return new Promise((resolve, reject) => {
            const payload = { uid };
            jwt.sign(payload, privateKey, {
                expiresIn: '4h'
            }, (error, token) => {
                if (error) {
                    reject(constants.authConst.FAILED_TO_GENERATE_TOKEN);
                } else {
                    resolve(token);
                }
            })
        })
    }
}