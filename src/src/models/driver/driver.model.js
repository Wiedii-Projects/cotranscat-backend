// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

const DriverSchema = dbConnectionOptions.define(
  "driver",
  {
    nickName: {
      type: DataTypes.STRING(100),
      unique: true,
      field: "nickName",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      field: "email",
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(75),
      field: "password",
      allowNull: false,
      set(value) {
        // Hash to automatically store encrypted passwords in the database
        const salt = bcryptjs.genSaltSync();
        this.setDataValue("password", bcryptjs.hashSync(value, salt));
      },
    },
  },
  {
    tableName: "driver",
  }
);

DriverSchema.removeAttribute("id");

module.exports = DriverSchema;
