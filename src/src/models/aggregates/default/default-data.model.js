// Constants
const { salesConst, trackingStatusConst } = require("../../../constants/index.constants");

module.exports = {
    defaultDocumentType: [ 
        { 
            name: "C.C.", code: "C"
        }, 
        { 
            name: "T.I.", code: "T"
        }, 
        { 
            name: "C.E.", code: "E"
        }, 
        { 
            name: "P.P.T.", code: "P"
        }, 
        { 
            name: "S.C.", code: "S"
        }, 
        { 
            name: "R.C.", code: "R"
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
          number: "+2",
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
    },
    {
        numberDocument: "0000000004",
        name: "OWNER", 
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
        password: process.env.PASSWORD_ADMIN_ROOT,
        dateOfBirth: '1999-09-01',
        address: 'Manzana xxx lote xxx palmxxe',
        licenseNumber: '12344321',
        dateOfLicenseIssuance: '2020-01-05',
        dateExpirationLicense: '2026-01-04',
        transitAgency: 'agencia de transito xx',
        restriction: 'debe usar lentes a la hora de conducir'
    },
    defaultOwner: {
        email: 'owner@owner.co',
        address: 'Manzana xxx lote xxx palmxxe',
        numberPhoneWhatsapp: "3052627087"
    },
    defaultStateVehicle: [
        { id: 1, type: 0 },
        { id: 2, type: 1 },
        { id: 3, type: 2 },
    ],
    defaultClient: {
        numberPhoneWhatsapp: '3052627086',
        email: 'client@client.co',
        address: "Mz 12 lote 8 palmeras alta"
    },
    defaultVehicle: [{
        plate: "ABC001",
        mark: "Atos",
        model: "99",
        price: 35000,
        width: 5,
        height: 7,
        idMunicipality: 1,
        code: "393",
        internalNumber: "11012",
        idTypeBodywork: 1,
        idTypeFuel: 2,
        idTypeVehicle: 3,
        code: '123',
        mileage: '1000000',
        motorNumber: '321',
        rerecordingMotor: true,
        chassisNumber: '12344',
        rerecordingChassis: false,
        serialNumber: '44123',
        rerecordingSerialNumber: true,
        SOATExpiration: '2000-02-16',
        mechanicalTechnicianExpiration: '2023-02-16',
        SOATPhoto: '',
        mechanicalTechnicianPhoto: '',
        propertyCardPhoto: '',
    },
    {
        plate: "ABC002",
        mark: "Atos",
        model: "99",
        price: 35000,
        width: 5,
        height: 7,
        idMunicipality: 1,
        code: "102",
        internalNumber: "11011",
        idTypeBodywork: 4,
        idTypeFuel: 4,
        idTypeVehicle: 4,
        code: '1231',
        mileage: '10000001',
        motorNumber: '3211',
        rerecordingMotor: true,
        chassisNumber: '123441',
        rerecordingChassis: false,
        serialNumber: '441231',
        rerecordingSerialNumber: true,
        SOATExpiration: '2008-02-16',
        mechanicalTechnicianExpiration: '2027-02-16',
        SOATPhoto: '',
        mechanicalTechnicianPhoto: '',
        propertyCardPhoto: '',
    }],
    defaultBloodType: [
        { id: 1, name: 'Tipo A+'},
        { id: 2, name: 'Tipo A-'},
        { id: 3, name: 'Tipo O+'},
        { id: 4, name: 'Tipo O-'},
        { id: 5, name: 'Tipo B+'},
        { id: 6, name: 'Tipo B-'},
        { id: 7, name: 'Tipo AB+'},
        { id: 8, name: 'Tipo AB-'}
    ],
    defaultLicenseCategory: [
        { id: 1, name: 'A1'},
        { id: 2, name: 'A2'},
        { id: 3, name: 'B1'},
        { id: 4, name: 'B2'},
        { id: 5, name: 'B3'},
        { id: 6, name: 'C1'},
        { id: 7, name: 'C2'},
        { id: 8, name: 'C3'}
    ],
    defaultCountry: [
        { id: 1, name: 'Colombia'},
        { id: 2, name: 'Venezuela'},
        { id: 3, name: 'Ecuador'},
    ],
    defaultDepartment : [
        { id: 1, idCountry: "1", name: 'Amazonas' },
        { id: 2, idCountry: "1", name: 'Antioquia' },
        { id: 3, idCountry: "1", name: 'Arauca' },
        { id: 4, idCountry: "1", name: 'Atlántico' },
        { id: 5, idCountry: "1", name: 'Bolívar' },
        { id: 6, idCountry: "1", name: 'Boyacá' },
        { id: 7, idCountry: "1", name: 'Caldas' },
        { id: 8, idCountry: "1", name: 'Caquetá' },
        { id: 9, idCountry: "1", name: 'Casanare' },
        { id: 10, idCountry: "1", name: 'Chocó' },
        { id: 11, idCountry: "1", name: 'Cauca' },
        { id: 12, idCountry: "1", name: 'Cesar' },
        { id: 13, idCountry: "1", name: 'Norte de Santander'}
    ],
    defaultPaymentMethod : [
        { id: 1, name: 'Transferencia' },
        { id: 2, name: 'Efectivo' },
        { id: 3, name: 'Crédito' },
        { id: 4, name: 'Contraentrega' }
    ],
    defaultMunicipality : [
        {  id: 1, idDepartment: "13" , name: 'Abrego' },
        {  id: 2, idDepartment: "13" , name: 'Arboledas' },
        {  id: 3, idDepartment: "13" , name: 'Bochalema' },
        {  id: 4, idDepartment: "13" , name: 'Bucarasica' },
        {  id: 5, idDepartment: "13" , name: 'Cachira' },
        {  id: 6, idDepartment: "13" , name: 'Cacota' },
        {  id: 7, idDepartment: "13" , name: 'Chinacota' },
        {  id: 8, idDepartment: "13" , name: 'Chitaga' },
        {  id: 9, idDepartment: "13" , name: 'Convencion' },
        {  id: 10, idDepartment: "13" , name: 'Cucutilla' },
        {  id: 11, idDepartment: "13" , name: 'Cucuta' },
        {  id: 12, idDepartment: "13" , name: 'Durania' },
        {  id: 13, idDepartment: "13" , name: 'El Carmen' },
        {  id: 14, idDepartment: "13" , name: 'El Tarra' },
        {  id: 15, idDepartment: "13" , name: 'El Zulia' },
        {  id: 16, idDepartment: "13" , name: 'Gramalote' },
        {  id: 17, idDepartment: "13" , name: 'Hacari' },
        {  id: 18, idDepartment: "13" , name: 'Herran' },
        {  id: 19, idDepartment: "13" , name: 'La Esperanza' },
        {  id: 20, idDepartment: "13" , name: 'La Playa' },
        {  id: 21, idDepartment: "13" , name: 'Labateca' },
        {  id: 22, idDepartment: "13" , name: 'Los Patios' },
        {  id: 23, idDepartment: "13" , name: 'Lourdes' },
        {  id: 24, idDepartment: "13" , name: 'Mutiscua' },
        {  id: 25, idDepartment: "13" , name: 'Ocana' },
        {  id: 26, idDepartment: "13" , name: 'Pamplona' },
        {  id: 27, idDepartment: "13" , name: 'Pamplonita' },
        {  id: 28, idDepartment: "13" , name: 'Puerto Santander' },
        {  id: 29, idDepartment: "13" , name: 'Ragonvalia' },
        {  id: 30, idDepartment: "13" , name: 'Salazar' },
        {  id: 31, idDepartment: "13" , name: 'San Calixto' },
        {  id: 32, idDepartment: "13" , name: 'San Cayetano' },
        {  id: 33, idDepartment: "13" , name: 'Santiago' },
        {  id: 34, idDepartment: "13" , name: 'Sardinata' },
        {  id: 35, idDepartment: "13" , name: 'Silos' },
        {  id: 36, idDepartment: "13" , name: 'Teorama' },
        {  id: 37, idDepartment: "13" , name: 'Tibu' },
        {  id: 38, idDepartment: "13" , name: 'Toledo' },
        {  id: 39, idDepartment: "13" , name: 'Villa Caro' },
        {  id: 40, idDepartment: "13" , name: 'Villa Del Rosario' }
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
        { type: salesConst.TYPE_SERVICE.MONEY_TRANSFER.VALUE_CONVENTION, code: "IMPGIRCU" },
        { type: salesConst.TYPE_SERVICE.PASSAGE.VALUE_CONVENTION, code: "PASTIQ" },
        { type: salesConst.TYPE_SERVICE.SHIPPING.VALUE_CONVENTION, code: "PORREM" },
    ],
    defaultBank: [
        { id: 1, code: "02", description: "Cúcuta general cash register", idMunicipality: 11 },
        { id: 2, code: "01", description: "Tibu general cash register", idMunicipality: 37 }
    ],
    defaultHeadquarter: [
        { description: salesConst.HEADQUARTERS.TIBU, idMunicipality: 37 },
        { description: salesConst.HEADQUARTERS.CUCUTA, idMunicipality: 11 }
    ],
    defaultTrackingStatus : [
        { chronologicalPosition: trackingStatusConst.TRACKING_STATUS.RECEIVED.VALUE_CONVENTION, name: trackingStatusConst.TRACKING_STATUS.RECEIVED.VALUE_STRING, description: "" }
    ],
    defaultTypeBodywork: [
        { name: 'Sedán', id: 1 },
        { name: 'Hatchback', id: 2 },
        { name: 'SUV', id: 3 },
        { name: 'Crossover', id: 4 },
        { name: 'Todoterreno', id: 5 }
    ],
    defaultTypeFuel: [
        { name: 'Gasolina', id: 1 },
        { name: 'Diésel', id: 2 },
        { name: 'Etanol', id: 3 },
        { name: 'Biodiésel', id: 4 },
        { name: 'Gas natural comprimido (GNC)', id: 5 }
    ],
    defaultTypeVehicle: [
        { name: 'Automóvil de pasajeros', id: 1 },
        { name: 'Autobús', id: 2 },
        { name: 'Camioneta', id: 3 },
        { name: 'Autobús escolar', id: 4 },
        { name: 'Vehículo todoterreno (ATV)', id: 5 }
    ]
}