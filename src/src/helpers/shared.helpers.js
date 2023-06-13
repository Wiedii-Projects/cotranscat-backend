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
  getInvoiceRegisterParametersByBankHelper: (typeService, headquarters) => {
    const { CUCUTA, TIBU } = salesConst.HEADQUARTERS
    const { PASSAGE, SHIPPING, MONEY_TRANSFER } = salesConst.TYPE_SERVICE

    const serviceMappings = {
      [PASSAGE]: {
        [TIBU]: {
          codeSale: salesConst.SALES_PREFIXES_CODE.TIBU_PASSAGES,
          codeService: salesConst.CODE_SERVICE_TYPE.PASSAGE
        },
        [CUCUTA]: {
          codeSale: salesConst.SALES_PREFIXES_CODE.CUCUTA_PASSAGES,
          codeService: salesConst.CODE_SERVICE_TYPE.PASSAGE
        }
      },
      [SHIPPING]: {
        [TIBU]: {
          codeSale: salesConst.SALES_PREFIXES_CODE.TIBU_SHIPPING,
          codeService: salesConst.CODE_SERVICE_TYPE.SHIPPING
        },
        [CUCUTA]: {
          codeSale: salesConst.SALES_PREFIXES_CODE.CUCUTA_SHIPPING,
          codeService: salesConst.CODE_SERVICE_TYPE.SHIPPING
        }
      },
      [MONEY_TRANSFER]: {
        TIBU: {
          codeSale: salesConst.SALES_PREFIXES_CODE.TIBU_MONEY_TRANSFER,
          codeService: salesConst.CODE_SERVICE_TYPE.MONEY_TRANSFER
        },
        [CUCUTA]: {
          codeSale: salesConst.SALES_PREFIXES_CODE.CUCUTA_MONEY_TRANSFER,
          codeService: salesConst.CODE_SERVICE_TYPE.MONEY_TRANSFER
        }
      }
    };

    const invoiceParams = {
      codeSale: salesConst.SALES_CODE.SALES_INVOICE
    };

    if (serviceMappings[typeService] && serviceMappings[typeService][headquarters]) {
      const { codeSale, codeService } = serviceMappings[typeService][headquarters];
      invoiceParams.prefix = codeSale;
      invoiceParams.code = codeService;

    } else {
      throw errorsConst.appErrors.InvalidTypeServiceOrHeadquarters;
    }

    return invoiceParams
   }
}