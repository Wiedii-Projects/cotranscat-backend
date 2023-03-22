// Constants
const { appConst } = require("../constants/index.constants");
const { dbConnectionOptions } = require("../constants/core/core-configurations.const");
const RoleSchema = require("../models/role/role.model");

const mySqlDBConnection = async () => {
    try {
        await dbConnectionOptions.authenticate();
        console.log(appConst.CONNECTION_BD_SUCCESS)
    } catch {
        throw new Error(appConst.CONNECTION_BD_ERROR);
    }
}

const mySqlDBSynchronization = async() => {
    try {
        await dbConnectionOptions.sync();
        console.log(appConst.SYNCHRONIZATION_BD_SUCCESS);
    } catch {
        console.log(appConst.SYNCHRONIZATION_BD_ERROR);
    }
}

const mySqlDBDefaultDataCreation = async () => {
    try {
        if(await RoleSchema.count()==0) [{ role: 'ADMIN_ROLE' }, { role: 'USER_ROLE' }].map( async(element) =>  await RoleSchema.create(element));
        console.log(appConst.DEFAULT_DATA_CREATION_SUCCESS);
    } catch {
        console.log(appConst.DEFAULT_DATA_CREATION_ERROR)
    }
};

module.exports = {
    mySqlDBConnection,
    mySqlDBSynchronization,
    mySqlDBDefaultDataCreation
}