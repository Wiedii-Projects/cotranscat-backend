// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");
const { nextLetter } = require("../../helpers/invoice.helpers");


const TicketSchema = dbConnectionOptions.define(
  "Ticket",
  {
    number: {
      type: DataTypes.STRING(5),
      field: "number",
      allowNull: false,
      defaultValue: null
    },
    code: {
      type: DataTypes.STRING(5),
      field: "code",
      allowNull: false
    },
    numberPhone: {
      type: DataTypes.STRING(12),
      field: "numberPhone",
      allowNull: true
    },
    passengerName: {
      type: DataTypes.STRING(100),
      field: "passengerName",
      allowNull: false
    }
  }
);

TicketSchema.beforeBulkCreate(async (registers) => {
  let maxLetter = await TicketSchema.max('code')||'PT A';
  let maxNumber = await TicketSchema.max('number', {
    where: {
      code: maxLetter
    }
  });
  let nextMaxNumber = maxNumber ? parseInt(maxNumber) + 1 : 1;
  
  for (const register of registers) {
    if(nextMaxNumber.toString().length > 5) {
      nextMaxNumber = 0;
      maxLetter = nextLetter(maxLetter);
    }
    register.code = maxLetter;
    register.number = nextMaxNumber.toString().padStart(5, '0');
    nextMaxNumber++;
  }
});

module.exports = TicketSchema;
