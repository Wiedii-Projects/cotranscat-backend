// Constants
const { appConst } = require('../core/app.const')

// Libraries
const dotenv = require('dotenv');
const path = require('path');

const envFound = dotenv.config({
    path: path.resolve(__dirname, `../../../${process.env.APP_ENV}.env`),
});

if (envFound.error) {
    throw new Error(appConst.ENV_FILE_NOT_FOUND);
}
const nodeEnv = process.env.APP_ENV || 'development';

const serverHost = process.env.SERVER_HOST || 'localhost';
const serverPort = process.env.SERVER_PORT || 8082;

const privateKey = process.env.SECRET_OR_PRIVATE_KEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT;
const dbDatabase = process.env.DB_DATABASE;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

let mongoConnection = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;

(nodeEnv === 'develop' || nodeEnv === 'production')
    ? mongoConnection += `?authSource=admin&socketTimeoutMS=500&wTimeoutMS=500&connectTimeoutMS=500`
    : '';

module.exports = {
    nodeEnv,
    serverHost,
    serverPort,
    dbHost,
    privateKey,
    googleClientId,
    mongoConnection,
    envFound,
    accountSid,
    authToken,
    twilioNumber
}