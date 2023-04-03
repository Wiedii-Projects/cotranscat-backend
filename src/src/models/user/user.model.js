// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const UserSchema = dbConnectionOptions.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      field: "name",
      required: [true, "The name is required"],
    },
    lastName: {
      type: DataTypes.STRING,
      field: "lastName",
      required: [true, "The last name is required"],
    },
    email: {
      type: DataTypes.STRING,
      field: "email",
      required: [true, "Mail is required"],
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: "phoneNumber",
      required: [true, "The phoneNumber is required"],
    },
    password: {
      type: DataTypes.STRING,
      field: "password",
      required: [true, "Password is required"],
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
    google: {
      type: DataTypes.BOOLEAN,
      field: "google",
      defaultValue: false,
    },
  },
  {
    tableName: "user",
  }
);

module.exports = UserSchema;
