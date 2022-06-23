const { OAuth2Client } = require('google-auth-library');
const { googleClientId } = require('../config');

const client = new OAuth2Client(googleClientId);

async function googleVerify(token = '') {
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
};

module.exports = {
    googleVerify
}