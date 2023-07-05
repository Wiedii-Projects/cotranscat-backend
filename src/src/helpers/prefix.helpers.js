const sharedHelpers = require("./shared.helpers");

module.exports = {
    extractPrefixDataHelper: ({ idServiceType, idBank, TNSPrefix, currentConsecutive, idHeadquarter }) => ({ 
        idServiceType, idBank: sharedHelpers.decryptIdDataBase(idBank), code: TNSPrefix, 
        currentConsecutive, idHeadquarter: sharedHelpers.decryptIdDataBase(idHeadquarter)
    }),
}