// Constants
const { appConst } = require('../core/app.const')

// Libraries
const dotenv = require('dotenv');
const path = require('path');
const { Sequelize } = require('sequelize');

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

const dbNameServer = process.env.DB_NAME_SERVER;
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT;
const dbDatabase = process.env.DB_DATABASE;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const dbConnectionOptions = new Sequelize(
    dbDatabase, dbUser, dbPassword, {
        host: dbHost,
        dialect: dbNameServer,
        port: dbPort,
        define: {
            timestamps: false,
            freezeTableName: true,
            underscored: true
        },
        logging: false
      }
  );

module.exports = {
    nodeEnv,
    serverHost,
    serverPort,
    dbHost,
    privateKey,
    googleClientId,
    dbConnectionOptions,
    envFound,
    accountSid,
    authToken,
    twilioNumber
}