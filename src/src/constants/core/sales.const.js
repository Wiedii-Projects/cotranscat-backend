module.exports = {
    SALES_CODE : {
        SALES_INVOICE: "FV"
    },
    HEADQUARTERS: {
        TIBU: "TIBU",
        CUCUTA: "CUCUTA"
    },
    TYPE_SERVICE: {
        PASSAGE: {
            VALUE_STRING: "PASSAGE",
            VALUE_CONVENTION: 2
        },
        SHIPPING: {
            VALUE_STRING: "SHIPPING",
            VALUE_CONVENTION: 3
        },
        MONEY_TRANSFER:{
            VALUE_STRING: "MONEY_TRANSFER",
            VALUE_CONVENTION: 1
        }
    },
    TYPE_SYNCHRONIZATION_INVOICES: {
        ONLY_CREATE_INVOICE: 1,
        ONLY_CANCEL_INVOICE: 2,
        CREATION_AND_CANCELLATION_INVOICE: 3
    },
    PREFIX_MANIFEST: {
        HEADQUARTER_TIBU: "TI",
        HEADQUARTER_CUCUTA: "CU"
    }
}