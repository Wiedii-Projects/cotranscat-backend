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
    idSeller
  }) => ({
    idClient: decryptIdDataBase(clientSend), 
    idServiceType, 
    price, 
    idPaymentMethod: decryptIdDataBase(idPaymentMethod), 
    codePrefix, 
    codeSale,
    idClient,
    idSeller: decryptIdDataBase(idSeller),
  }),
  extractInvoiceMoneyTransfer: ({
    amountMoney, cost, iva, idClientReceives
  }) => ({
    amountMoney, cost, iva, idClientReceives
  }),
  extractInvoiceShipping: ({
    depth, 
    width, 
    high, 
    weight, 
    declaredValue,
    insuranceCost, 
    costShipping,  
    content, 
    isHomeDelivery,
    idUnitMeasure,
    idShippingType,
    idClientReceives
  }) => ({
    depth, 
    width, 
    high, 
    weight, 
    declaredValue,
    insuranceCost, 
    costShipping,  
    content, 
    isHomeDelivery,
    idUnitMeasure: decryptIdDataBase(idUnitMeasure),
    idShippingType: decryptIdDataBase(idShippingType),
    idClientReceives
  }),
  formateDateTime: () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSecond = currentDate.getSeconds();

    const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:${currentSecond.toString().padStart(2, '0')}`;
    return [ currentDate, formattedTime ] 
  }
}