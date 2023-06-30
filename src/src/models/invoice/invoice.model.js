// DB Connections
const {
    dbConnectionOptions,
  } = require("../../constants/core/core-configurations.const");
  
  // Libraries
  const { DataTypes } = require("sequelize");
  
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
      tableName: "invoice",
      indexes: [
        {
          unique: true,
          fields: ['number', 'codePrefix'],
          name: "uniqueInvoicePrefixByServiceType"
        }
      ]
    }
  );
  
  InvoiceSchema.beforeValidate(async(register) => {
    let maxNumber = await InvoiceSchema.max('number');
    const nextMaxNumber = maxNumber ? parseInt(maxNumber) + 1 : 1;
    register.number = nextMaxNumber.toString().padStart(8, '0');
    register.date = new Date();
  });
  
  module.exports = InvoiceSchema;