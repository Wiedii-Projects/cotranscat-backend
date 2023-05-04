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
      field: "numberDocument",
      allowNull: false,
      unique: 'uniqueUserCredentials',
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION'
    },
    name: {
      type: DataTypes.STRING(50),
      field: "name",
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      field: "lastName",
      allowNull: false
    },
    numberPhone: {
      type: DataTypes.STRING(12),
      field: "phoneNumber",
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      field: "state",
      defaultValue: true,
      allowNull: false
    },
    idIndicativePhone: {
      type: DataTypes.INTEGER,
      references: {
        model: 'indicativeNumber',
        key: 'id'
      }
    },
    idRole: {
      type: DataTypes.INTEGER,
      references: {
        model: 'role',
        key: 'id'
      },
      unique: 'uniqueUserCredentials',
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION'
    },
    idDocumentType: {
      type: DataTypes.INTEGER,
      references: {
        model: 'documentType',
        key: 'id'
      },
      unique: 'uniqueUserCredentials',
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION'
    }
  },
  {
    tableName: "user",
    indexes: [
      {
        unique: true,
        fields: ['idDocumentType', 'idRole', 'numberDocument'],
        name: 'uniqueUserCredentials'
      }
    ]
  }
);

module.exports = UserSchema;
