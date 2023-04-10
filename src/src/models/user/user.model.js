// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const UserSchema = dbConnectionOptions.define(
  "User",
  {
    numberDocument: {
      type: DataTypes.STRING(20),
      unique: true,
      field: "numberDocument",
      required: [true, "The number document is required"],
    },
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      required: [true, "The name is required"],
    },
    lastName: {
      type: DataTypes.STRING(50),
      field: "lastName",
      required: [true, "The last name is required"],
    },
    numberPhone: {
      type: DataTypes.STRING(12),
      field: "phoneNumber",
      required: [true, "The phone Number is required"],
    },
    numberPhoneWhatsApp: {
      type: DataTypes.STRING(12),
      field: "phoneNumber",
      required: [true, "The whatsApp phoneNumber is required"],
    },
    email: {
      type: DataTypes.STRING(100),
      field: "email",
      defaultValue: null,
    },
    img: {
      type: DataTypes.STRING,
      field: "img",
      defaultValue: "",
    },
    state: {
      type: DataTypes.BOOLEAN,
      field: "state",
      defaultValue: true,
    },
    password: {
      type: DataTypes.STRING,
      field: "password",
      defaultValue: null,
    },
    address: {
      type: DataTypes.STRING,
      field: "address",
      defaultValue: "",
    }
  },
  {
    tableName: "user",
  }
);

module.exports = UserSchema;
