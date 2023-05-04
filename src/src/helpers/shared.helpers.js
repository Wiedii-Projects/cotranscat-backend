// Constants
const { dbConnectionOptions } = require("../constants/core/core-configurations.const");
const {
  coreConfigurationsConst
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
    initTransaction: async() => {
      return await dbConnectionOptions.transaction();
    }
}