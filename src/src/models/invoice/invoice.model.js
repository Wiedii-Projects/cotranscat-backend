// Constants
const { errorsConst, salesConst } = require("../../constants/index.constants");

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
      synchronizationType: {
          type: DataTypes.INTEGER.UNSIGNED,
          field: 'synchronizationType',
          allowNull: false
      },
      idResolution: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "resolution",
          key: "id",
        }
      },
      observation: {
        type: DataTypes.STRING,
        field: "observation",
        defaultValue: ""
      }
    },
    {
      tableName: "invoice",
      indexes: [
        {
          unique: true,
          fields: ['number', 'idResolution'],
          name: "uniqueInvoicePrefixByServiceType"
        }
      ]
    }
  );
  
  InvoiceSchema.beforeValidate(async(register) => {
    register.date = new Date();
  });

  InvoiceSchema.afterCreate(async(register, options) => {
    const { dataValues : { id: idInvoice } } = register;
    switch (options.type) {
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