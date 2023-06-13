// Constants
const { salesConst } = require("../../../constants/index.constants");

module.exports = {
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
    defaultUser: [{
        numberDocument: "0000000000",
        name: "ADMIN", 
        lastName: "USER",
        numberPhone: "3052627084",
    },
    {
        numberDocument: "0000000001",
        name: "SELLER", 
        lastName: "USER",
        numberPhone: "3052627085",
    },
    {
        numberDocument: "0000000002",
        name: "CLIENT", 
        lastName: "USER",
        numberPhone: "3052627086",
    },
    {
        numberDocument: "0000000003",
        name: "DRIVER", 
        lastName: "USER",
        numberPhone: "3052627087",
    }],
    defaultAdmin: {
            email: 'admi@admin.co',
            nickName: 'userAdmin',
            password: process.env.PASSWORD_ADMIN_ROOT
    },
    defaultSeller: {
        email: 'seller@seller.co',
        nickName: 'userSeller',
        password: process.env.PASSWORD_ADMIN_ROOT
    },
    defaultDriver: {
        email: 'driver@driver.co',
        nickName: 'userDriver',
        password: process.env.PASSWORD_ADMIN_ROOT
    },
    defaultClient: {
        numberPhoneWhatsapp: '3052627086',
        email: 'client@client.co',
        address: "Mz 12 lote 8 palmeras alta"
    },
    defaultVehicle: {
        plate: "ABC001",
        mark: "Atos",
        model: "99",
        price: 35000,
        width: 5,
        height: 7
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
    ],
    defaultServiceType:[
        { type: 1 },
        { type: 2 },
        { type: 3 },
    ],
    defaultBank: [
        { code: "01", description: "Tibu general cash register", headquarterAssociated: salesConst.HEADQUARTERS.TIBU },
        { code: "02", description: "Cúcuta general cash register", headquarterAssociated: salesConst.HEADQUARTERS.CUCUTA}
    ],
    defaultHeadquarter: [
        { name: salesConst.HEADQUARTERS.TIBU },
        { name: salesConst.HEADQUARTERS.CUCUTA }
    ]
}