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
    defaultUser: {
            numberDocument: "0000000000",
            name: "ADMIN", 
            lastName: "USER",
            numberPhone: "3052627084",
    },
    defaultAdmin: {
            email: 'admi@admin.co',
            nickName: 'userAdmin'
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
        { name: 'Chocó' },
        { name: 'Norte de Santander'}
    ],
    defaultPaymentMethod : [
        { name: 'Transferencia' },
        { name: 'Efectivo' },
        { name: 'Tarjeta Crédito' },
        { name: 'Crédito' },
        { name: 'Contraentrega' },
        { name: 'Crédito Cliente' }
    ],
    defaultMunicipality : [
        { idDepartment: "13" , name: 'Abrego' },
        { idDepartment: "13" , name: 'Arboledas' },
        { idDepartment: "13" , name: 'Bochalema' },
        { idDepartment: "13" , name: 'Bucarasica' },
        { idDepartment: "13" , name: 'Cachira' },
        { idDepartment: "13" , name: 'Cacota' },
        { idDepartment: "13" , name: 'Chinacota' },
        { idDepartment: "13" , name: 'Chitaga' },
        { idDepartment: "13" , name: 'Convencion' },
        { idDepartment: "13" , name: 'Cucutilla' },
        { idDepartment: "13" , name: 'Cucuta' },
        { idDepartment: "13" , name: 'Durania' },
        { idDepartment: "13" , name: 'El Carmen' },
        { idDepartment: "13" , name: 'El Tarra' },
        { idDepartment: "13" , name: 'El Zulia' },
        { idDepartment: "13" , name: 'Gramalote' },
        { idDepartment: "13" , name: 'Hacari' },
        { idDepartment: "13" , name: 'Herran' },
        { idDepartment: "13" , name: 'La Esperanza' },
        { idDepartment: "13" , name: 'La Playa' },
        { idDepartment: "13" , name: 'Labateca' },
        { idDepartment: "13" , name: 'Los Patios' },
        { idDepartment: "13" , name: 'Lourdes' },
        { idDepartment: "13" , name: 'Mutiscua' },
        { idDepartment: "13" , name: 'Ocana' },
        { idDepartment: "13" , name: 'Pamplona' },
        { idDepartment: "13" , name: 'Pamplonita' },
        { idDepartment: "13" , name: 'Puerto Santander' },
        { idDepartment: "13" , name: 'Ragonvalia' },
        { idDepartment: "13" , name: 'Salazar' },
        { idDepartment: "13" , name: 'San Calixto' },
        { idDepartment: "13" , name: 'San Cayetano' },
        { idDepartment: "13" , name: 'Santiago' },
        { idDepartment: "13" , name: 'Sardinata' },
        { idDepartment: "13" , name: 'Silos' },
        { idDepartment: "13" , name: 'Teorama' },
        { idDepartment: "13" , name: 'Tibu' },
        { idDepartment: "13" , name: 'Toledo' },
        { idDepartment: "13" , name: 'Villa Caro' },
        { idDepartment: "13" , name: 'Villa Del Rosario' }
    ],
    defaultUnitMeasure:[
        { name : "kg" },
        { name : "gr" }
    ],
    defaultShippingType:[
        {name : "Ropa, zapatos, accesorios"},
        { name : "Muebles y enseres" },
        { name : "Aparatos electrónicos ( hogar )" },
        { name : "Portátiles celulares u otros" },
        { name : "Insumos médicos" },
        { name : "Autopartes y repuestos" },
        { name : "Publicidad, papelería y otros" },
        { name : "Documentos" }
    ]
}