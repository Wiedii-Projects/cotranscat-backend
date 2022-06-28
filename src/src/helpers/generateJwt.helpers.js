const jwt = require('jsonwebtoken');
const { privateKey } = require('../config');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, privateKey, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                reject('Failed to generate token');
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}