// Constants
const { appConst } = require("../constants/index.constants");
const { dbConnectionOptions } = require("../constants/core/core-configurations.const");

const mySqlDBConnection = async () => {
    try {
        await dbConnectionOptions.authenticate();
        console.log(appConst.CONNECTION_BD_SUCCESS)
    } catch (error) {
        throw new Error(appConst.CONNECTION_BD_ERROR);
    }
}

module.exports = {
    mySqlDBConnection
}