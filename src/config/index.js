const dotenv = require('dotenv');

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

const port = process.env.PORT;
const privateKey = process.env.SECRETORPRIVATEKEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;

module.exports = {
    port,
    privateKey,
    googleClientId
}