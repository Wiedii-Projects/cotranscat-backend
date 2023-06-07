// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");
const { nextLetter } = require("../../helpers/invoice.helpers");
const { decryptIdDataBase } = require("../../helpers/shared.helpers");
const Seat = require("../seat/seat.model");


const TicketSchema = dbConnectionOptions.define(
  "Ticket",
  {
    number: {
      type: DataTypes.STRING(5),
      field: "number",
      allowNull: false
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
      allowNull: true
    },
    idSeat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "seat",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
      tableName: "ticket",
  }
);

TicketSchema.beforeBulkCreate(async (registers, options) => {
  let maxLetter = await TicketSchema.max('code')||'PT A';
  let maxNumber = await TicketSchema.max('number', {
    where: {
      code: maxLetter
    }
  });
  let nextMaxNumber = maxNumber ? parseInt(maxNumber) + 1 : 1;
  
  for (const register of registers) {
    register.idSeat =  decryptIdDataBase(register.idSeat);
    register.idInvoice = options.invoice;
    await Seat.update({ state: 1, price: options.price }, { where: { id: register.idSeat }, transaction: options.transaction });
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
