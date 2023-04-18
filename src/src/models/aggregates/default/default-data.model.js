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
    defaultIndicativeNumber: [
        {
          number: "+57",
          country: "Colombia"
        },
        {
          number: "+58",
          country: "Venezuela"
        },
        {
          number: "+1",
          country: "Estados Unidos"
        },
        {
          number: "+52",
          country: "México"
        },
        {
          number: "+1",
          country: "Canadá"
        }
    ],
    defaultAdmin: { 
            numberDocument: "0000000000", 
            name: "ADMIN", 
            lastName: "USER", 
            phoneNumber: "3052627084",
            email: "admi@admin.co"
    },
    defaultDepartment : [
        { name: 'Amazonas' },
        { name: 'Antioquia' },
        { name: 'Arauca' },
        { name: 'Atlántico' },
        { name: 'Bolívar' },
        { name: 'Boyacá' },
        { name: 'Caldas' },
        { name: 'Caquetá' },
        { name: 'Casanare' },
        { name: 'Cauca' },
        { name: 'Cesar' },
        { name: 'Chocó' }
    ]
}