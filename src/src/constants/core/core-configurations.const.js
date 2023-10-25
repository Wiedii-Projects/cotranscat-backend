// Constants
const { appConst } = require("./app.const");

// Libraries
const dotenv = require("dotenv");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { Sequelize } = require("sequelize");
const { RedisConnection } = require("bullmq");

const envFound = dotenv.config({
  path: path.resolve(__dirname, `../../../${process.env.APP_ENV}.env`),
});

if (envFound.error) {
  throw new Error(appConst.ENV_FILE_NOT_FOUND);
}
const nodeEnv = process.env.APP_ENV || "development";

const serverHost = process.env.SERVER_HOST || "localhost";
const serverPort = process.env.SERVER_PORT || 8082;

const privateKey = process.env.SECRET_OR_PRIVATE_KEY;

const dbNameServer = process.env.DB_NAME_SERVER;
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT;
const dbDatabase = process.env.DB_DATABASE;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const algorithmEncrypt = process.env.ALGORITHM_ENCRYPT;
const keyEncrypt = process.env.KEY_ENCRYPT;
const ivEncrypt = process.env.IV_ENCRYPT;

const saltBcrypt = bcryptjs.genSaltSync();

const option = {
  host: dbHost,
  dialect: dbNameServer,
  port: dbPort,
  define: {
    timestamps: false,
    freezeTableName: true,
    underscored: false
  },
  config: {
    path: "/src/src/config/config.json",
  },
  logging: false,
};

const dbConnectionOptions = new Sequelize(
  dbDatabase,
  dbUser,
  dbPassword,
  option
);

const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT

const serverHostApiTransactionalQueries = process.env.SERVER_HOST_API_TRANSACTIONAL_QUERIES;
const serverPortApiTransactionalQueries = process.env.SERVER_PORT_API_TRANSACTIONAL_QUERIES;

const domainApiTransactionalQueries = `http://${serverHostApiTransactionalQueries}:${serverPortApiTransactionalQueries}`

const redisDBConnectionOptions = {
  host: redisHost,
  port: redisPort
}

const redisConnectionInstanceBullMq = new RedisConnection(redisDBConnectionOptions);

const domainWebSocket = `http://${process.env.WEBSOCKET_HOST}:${process.env.WEBSOCKET_PORT}`

module.exports = {
  nodeEnv,
  serverHost,
  serverPort,
  dbHost,
  privateKey,
  dbConnectionOptions,
  envFound,
  accountSid,
  authToken,
  twilioNumber,
  algorithmEncrypt,
  keyEncrypt,
  ivEncrypt,
  saltBcrypt,
  domainApiTransactionalQueries,
  redisDBConnectionOptions,
  redisConnectionInstanceBullMq,
  domainWebSocket
};