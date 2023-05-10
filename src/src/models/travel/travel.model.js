// DB Connections
const {
  dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");

const TravelSchema = dbConnectionOptions.define(
  "travel",
  {
    date: {
      type: DataTypes.DATEONLY,
      field: "date",
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      field: "time",
      allowNull: false,
    },
    idDriverVehicle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "driverVehicle",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "travel",
    indexes: [
      {
        unique: true,
        fields: ["date", "time", "idDriverVehicle"],
      },
    ],
  }
);

module.exports = TravelSchema;
