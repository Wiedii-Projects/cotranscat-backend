const sharedHelpers = require("./shared.helpers");

module.exports = {
    extractPrefixDataHelper: ({ idServiceType, idBank, TNSPrefix, currentConsecutive, idHeadquarter, isElectronic }) => ({ 
        idServiceType, idBank: sharedHelpers.decryptIdDataBase(idBank), code: TNSPrefix, 
        currentConsecutive, idHeadquarter: sharedHelpers.decryptIdDataBase(idHeadquarter), isElectronic
    }),
}