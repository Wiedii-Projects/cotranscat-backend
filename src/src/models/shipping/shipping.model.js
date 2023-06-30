// DB Connections
const {
    dbConnectionOptions,
} = require("../../constants/core/core-configurations.const");

// Libraries
const { DataTypes } = require("sequelize");
const { createShipmentTrackingQuery } = require("../shipment-tracking/shipment-tracking.query");
const { findTrackingStatusByChronologicalPositionOfGroup } = require("../tracking-status/tracking-status.query");
const trackingConst = require("../../constants/core/tracking.const");
const { decryptIdDataBase } = require("../../helpers/shared.helpers");


const ShippingSchema = dbConnectionOptions.define(
    "Shipping",
    {
        dateDeparture: {
            type: DataTypes.DATE,
            field: "dateDeparture"
        },
        timeDeparture: {
            type: DataTypes.TIME,
            field: "timeDeparture"
        },
        weight: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "weight",
            allowNull: false
        },
        depth: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "depth",
            allowNull: false
        },
        width: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "width",
            allowNull: false
        },
        high: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "high",
            allowNull: false
        },
        declaredValue: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "declaredValue",
            allowNull: false
        },
        insuranceCost: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "insuranceCost",
            allowNull: false
        },
        costShipping: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "costShipping",
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(100),
            field: "content",
            allowNull: false
        },
        isHomeDelivery: {
            type: DataTypes.TINYINT.UNSIGNED,
            field: "isHomeDelivery",
            allowNull: false,
        }
    },
    {
        tableName: "shipping"
    }
);

ShippingSchema.afterCreate(async(register, options) => {
    const { dataValues: { id: idShipping }} = register;
    const { id: idTrackingStatus } = await findTrackingStatusByChronologicalPositionOfGroup(
        trackingConst.TRACKING_STATUS.RECEIVED.VALUE_CONVENTION,  trackingConst.TRACKING_STATUS.RECEIVED.VALUE_STRING );
    await createShipmentTrackingQuery({ idShipping, idTrackingStatus: decryptIdDataBase(idTrackingStatus) }, { transaction: options.transaction });
});

module.exports = ShippingSchema;