const { decryptIdDataBase } = require("./shared.helpers");

module.exports = {
  nextLetter: (letter) => {
      const lastChar = letter.slice(-1); 
      const nextCharCode = lastChar.charCodeAt(0) + 1; 
      const nextChar = String.fromCharCode(nextCharCode); 
      const remainingChars = letter.slice(0, -1); 
      return remainingChars + nextChar; 
  },
  extractInvoice: ({
    idServiceType, 
    price, 
    clientSend,
    idPaymentMethod, 
    codePrefix, 
    codeSale,
    idClient,
    idSeller,
    number
  }) => ({
    idClient: decryptIdDataBase(clientSend), 
    idServiceType, 
    price, 
    idPaymentMethod: decryptIdDataBase(idPaymentMethod), 
    codePrefix, 
    codeSale,
    idClient,
    idSeller: decryptIdDataBase(idSeller),
    number
  }),
  extractInvoiceMoneyTransfer: ({
    amountMoney, cost, iva, idClientReceives, idInvoice
  }) => ({
    amountMoney, cost, iva, idClientReceives, idInvoice
  })
}