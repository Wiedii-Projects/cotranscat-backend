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
    manifestNumber: {
        type: DataTypes.STRING(12),
        field: 'manifestNumber',
        allowNull: false
    },
    manifestObservation: {
        type: DataTypes.STRING,
        field: "manifestObservation",
        defaultValue: ""
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

TravelSchema.beforeValidate(async(register) => {
  let maxNumber = await TravelSchema.max('manifestNumber');
  const nextMaxNumber = maxNumber ? parseInt(maxNumber) + 1 : 1;
  register.manifestNumber = nextMaxNumber.toString().padStart(12, '0');
});

module.exports = TravelSchema;
