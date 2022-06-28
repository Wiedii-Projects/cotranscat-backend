const generateJWT = require('./generateJwt.helpers');
const googleVerify = require('./googleVerify.helpers');

module.exports = {
    ...generateJWT,
    ...googleVerify
}