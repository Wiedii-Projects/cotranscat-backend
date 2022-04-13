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
const dbPort = process.env.DB_PORT;
const port = process.env.PORT || 8082;
const privateKey = process.env.SECRET_OR_PRIVATE_KEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const dbConnection = process.env.DB_CONNECTION;
const dbDatabase = process.env.DB_DATABASE;

const mongoConnection = `${dbConnection}://${dbHost}:${dbPort}/${dbDatabase}`;

module.exports = {
    nodeEnv,
    dbHost,
    port,
    privateKey,
    googleClientId,
    mongoConnection
}