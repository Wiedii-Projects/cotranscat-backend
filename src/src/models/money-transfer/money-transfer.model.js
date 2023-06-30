// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

//helpers
const { decryptIdDataBase } = require("../../helpers/shared.helpers");

//Query
const { createMoneyTransferTrackerQuery } = require("../money-transfer-tracker/money-transfer-tracker.query");
const { findTrackingStatusByChronologicalPositionOfGroup } = require("../tracking-status/tracking-status.query");

// Libraries
const { DataTypes } = require("sequelize");

// Constants
const trackingConst = require("../../constants/core/tracking.const");


const MoneyTransferSchema = dbConnectionOptions.define(
    "MoneyTransfer",
    {
        amountMoney: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'amountMoney',
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'cost',
            allowNull: false
        },
        iva: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'iva',
            allowNull: false
        },
    },
    {
        tableName: "moneyTransfer"
    }
);

MoneyTransferSchema.afterCreate(async(register, options) => {
    const { dataValues: { id: idMoneyTransfer }} = register;
    const { id: idTrackingStatus } = await findTrackingStatusByChronologicalPositionOfGroup( 
        trackingConst.TRACKING_STATUS.RECEIVED.VALUE_CONVENTION, trackingConst.TRACKING_STATUS.RECEIVED.VALUE_STRING );
    await createMoneyTransferTrackerQuery({ idMoneyTransfer, idTrackingStatus: decryptIdDataBase(idTrackingStatus) }, { transaction: options.transaction });
});

module.exports = MoneyTransferSchema;