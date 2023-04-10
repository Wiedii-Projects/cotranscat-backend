const { encryptPasswordHelper } = require("../../../helpers/auth.helpers");


module.exports = {
    defaultRole: [ 
        { 
            role: "ADMIN_ROLE"
        }, 
        { 
            role: "USER_ROLE" 
        }, 
        { 
            role: "CLIENT_ROLE" 
        } 
    ],
    defaultDocumentType: [ 
        { 
            name: "C.C." 
        }, 
        { 
            name: "T.I." 
        }, 
        { 
            name: "C.E."
        }, 
        { 
            name: "P.P.T." 
        }, 
        { 
            name: "S.C." 
        }, 
        { 
            name: "R.C." 
        } 
    ],
    defaultCallSign: [
        {
          callSignNumber: "+57",
          callSignCountry: "Colombia"
        },
        {
          callSignNumber: "+58",
          callSignCountry: "Venezuela"
        },
        {
          callSignNumber: "+1",
          callSignCountry: "Estados Unidos"
        },
        {
          callSignNumber: "+52",
          callSignCountry: "México"
        },
        {
          callSignNumber: "+1",
          callSignCountry: "Canadá"
        }
    ],
    defaultAdmin: { 
            numberDocument: "0000000000", 
            name: "ADMIN", 
            lastName: "USER", 
            phoneNumber: "3052627084"
    }
}