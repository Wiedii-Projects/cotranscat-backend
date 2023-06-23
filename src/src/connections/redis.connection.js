// Constants
const { redisDBConnectionOptions } = require('../constants/core/core-configurations.const');

// Libraries
const { createClient } = require('redis');

module.exports = {
    redisDBConnection: async () => {
        const clientRedis = await createClient({
            socket: redisDBConnectionOptions
        });
        clientRedis.on("error", (err) => {
            console.log("Redis connection error: " + err);
        });

        clientRedis.on("connect", () => {
            console.log("Redis connection successfully");
        });

        await clientRedis.connect();
    }
}