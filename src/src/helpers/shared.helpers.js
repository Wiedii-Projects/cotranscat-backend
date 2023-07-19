// Constants
const { dbConnectionOptions } = require("../constants/core/core-configurations.const");
const {
  coreConfigurationsConst, errorsConst, salesConst
} = require("../constants/index.constants");

// Libraries
const crypto = require('crypto');

// Initialization constants encrypt
const iv = Buffer.alloc(16);
const ivLength = Math.min(iv.length, coreConfigurationsConst.ivEncrypt.length);
iv.write(coreConfigurationsConst.ivEncrypt.slice(0, ivLength));

const key = Buffer.alloc(32);
const keyLength = Math.min(key.length, coreConfigurationsConst.keyEncrypt.length);
key.write(coreConfigurationsConst.keyEncrypt.slice(0, keyLength));

module.exports = {
  decryptIdDataBase: (token) => {
    try {
      const decipher = crypto.createDecipheriv(coreConfigurationsConst.algorithmEncrypt, key, iv);
      let decrypted = decipher.update(token, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return parseInt(decrypted);
    } catch {
      return false;
    }
  },
  encryptIdDataBase: (value) => {
    const cipher = crypto.createCipheriv(coreConfigurationsConst.algorithmEncrypt, key, iv);
    let encrypted = cipher.update(value.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  },
  initTransaction: async () => {
    return await dbConnectionOptions.transaction();
  },
  getNextConsecutiveLetterHelper: (letter) => {
    if (!letter || letter.length !== 1) throw errorsConst.appErrors.letterIsRequired;
    
    let isUpperCaseLetter = true
    if (letter.match(/[a-z]/)) isUpperCaseLetter = false

    typeStandardLetter = isUpperCaseLetter ? 65 : 97

    const letterCode = letter.charCodeAt(0);
    const nextLetterCode = ((letterCode - typeStandardLetter + 1) % 26) + typeStandardLetter;
    const nextLetter = String.fromCharCode(nextLetterCode);

    return nextLetter;
  },
  getDateNow: () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSecond = currentDate.getSeconds();
        
    const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:${currentSecond.toString().padStart(2, '0')}`;
    return formattedTime;
  },
  getPrefixAndInvoiceNumberNewRegister: async (resolutionsFound) => {
    try {

      if (resolutionsFound.length === 0) throw errorsConst.invoiceErrors.thereAreNoActiveResolutions

      const resolutionSelected = resolutionsFound.find((resolutionElement) => {
        if (resolutionElement.finalRange > resolutionElement.currentConsecutive) return resolutionElement
      })
      if (!resolutionSelected) throw errorsConst.invoiceErrors.resolutionsAlreadyUsedAllPrefixes

      let nextNumberConsecutiveInvoice = parseInt(resolutionSelected.currentConsecutive) + 1

      return {
        numberFormatted: nextNumberConsecutiveInvoice.toString().padStart(8, '0'),
        numberRaw: nextNumberConsecutiveInvoice,
        idPrefix: resolutionSelected.idPrefix,
        idResolution: resolutionSelected.idResolution
      }
    }
    catch (error) {
      throw error;
    }
  }
}