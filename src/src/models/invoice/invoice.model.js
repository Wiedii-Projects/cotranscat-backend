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
        type: DataTypes.STRING(10),
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
      numberReference: {
        type: DataTypes.STRING(10),
        field: "numberReference",
        defaultValue: "",
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
    register.number = nextMaxNumber.toString().padStart(10, '0');
    register.date = new Date();
  });
  
  module.exports = InvoiceSchema;