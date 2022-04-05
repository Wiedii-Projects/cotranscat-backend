const dotenv = require('dotenv');
const path = require('path');

const envFound = dotenv.config({
    path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`),
});

if (envFound.error) {
    throw new Error("Couldn't find .env file");
}
const nodeEnv = process.env.NODE_ENV || 'development';
const dbHost = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 8082;
const privateKey = process.env.SECRETORPRIVATEKEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;

module.exports = {
    nodeEnv,
    dbHost,
    port,
    privateKey,
    googleClientId
}