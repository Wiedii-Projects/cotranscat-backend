// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
const { createMoneyTransferQuery } = require("../money-transfer/money-transfer.query");
const { TYPE_SERVICE } = require("../../constants/core/sales.const");
const { createShippingQuery } = require("../shipping/shipping.query");
const { createNewTicketQuery } = require("../ticket/ticket.query");
const { errorsConst } = require("../../constants/index.constants");
  
  const InvoiceSchema = dbConnectionOptions.define(
    "Invoice",
    {
      number: {
        type: DataTypes.STRING(8),
        field: "number",
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        field: "date",
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        field: "price",
        allowNull: false
      },
      isSynchronized: {
        type: DataTypes.BOOLEAN,
        field: "isSynchronized",
        defaultValue: false,
        allowNull: false
      },
      codeSale: {
          type: DataTypes.STRING(2),
          field: "codeSale",
          allowNull: false
      },
      codePrefix: {
          type: DataTypes.STRING(2),
          field: "codePrefix",
          allowNull: false
      }
    },
    {
      tableName: "invoice"
    }
  );
  
  InvoiceSchema.beforeValidate(async(register) => {
    let maxNumber = await InvoiceSchema.max('number');
    const nextMaxNumber = maxNumber ? parseInt(maxNumber) + 1 : 1;
    register.number = nextMaxNumber.toString().padStart(8, '0');
    register.date = new Date();
  });

  InvoiceSchema.afterCreate(async(register, options) => {
    const { dataValues : { id: idInvoice, idServiceType } } = register;
    switch (idServiceType) {
      case TYPE_SERVICE.MONEY_TRANSFER.VALUE_CONVENTION:
        await createMoneyTransferQuery({ ...options.moneyTransfer, idInvoice }, { transaction: options.transaction });
        break;
      case TYPE_SERVICE.PASSAGE.VALUE_CONVENTION:
        await createNewTicketQuery( options.tickets, { price: options.price, idInvoice, transaction: options.transaction});
        break;
      case TYPE_SERVICE.SHIPPING.VALUE_CONVENTION:
        await createShippingQuery({ ...options.shipping, idInvoice }, { transaction: options.transaction });
        break;
      default:
        throw(errorsConst.invoiceErrors.queryErrors.createError);
    }
    
  });
  
  module.exports = InvoiceSchema;