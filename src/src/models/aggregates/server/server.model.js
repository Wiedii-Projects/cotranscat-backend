// Constants
const { coreConfigurationsConst } = require('../../../constants/index.constants')

// Libraries
const express = require('express');
const cors = require('cors');

// DB Connections
const { mySqlDBConnection, mySqlDBSynchronization, mySqlDBDefaultDataCreation } = require('../../../connections/my-sql.connection');

class ServerModel {
    constructor() {
        this.app = express();
        this.serverHost = coreConfigurationsConst.serverHost;
        this.serverPort = coreConfigurationsConst.serverPort;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            documentType: '/api/documentType',
            indicativeNumber: '/api/indicativeNumber',
            department: '/api/department',
            municipality:'/api/municipality',
            paymentMethod: '/api/paymentMethod',
            unitMeasure: '/api/unitMeasure',
            shippingType: '/api/shippingType',
            vehicle: '/api/vehicle',
            admin: '/api/admin',
            client: '/api/client',
            driver: '/api/driver',
            coordinator: '/api/coordinator',
            functionality: '/api/functionality',
            seller: '/api/seller',
            role: '/api/role'
        }
        this.dbHost = coreConfigurationsConst.dbHost;
        this.db();
        this.middleware();
        this.routes();
    }

    async db() {
        await mySqlDBConnection();
        await mySqlDBSynchronization();
        await mySqlDBDefaultDataCreation();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../../../routes/auth.routes'));
        this.app.use(this.paths.users, require('../../../routes/user.routes'));
        this.app.use(this.paths.documentType, require('../../../routes/document-type.routes'));
        this.app.use(this.paths.indicativeNumber, require('../../../routes/indicative-number.routes'));
        this.app.use(this.paths.department, require('../../../routes/department.routes'));
        this.app.use(this.paths.municipality, require('../../../routes/municipality.routes'));
        this.app.use(this.paths.paymentMethod, require('../../../routes/payment-method.routes'));
        this.app.use(this.paths.unitMeasure, require('../../../routes/unit-measure.routes'));
        this.app.use(this.paths.shippingType, require('../../../routes/shipping-type.routes'));
        this.app.use(this.paths.vehicle, require('../../../routes/vehicle.routes'));
        this.app.use(this.paths.admin, require('../../../routes/admin.routes'));
        this.app.use(this.paths.coordinator, require('../../../routes/coordinator.routes'));
        this.app.use(this.paths.driver, require('../../../routes/driver.routes'));
        this.app.use(this.paths.client, require('../../../routes/client.routes'));
        this.app.use(this.paths.functionality, require('../../../routes/functionality.routes'));
        this.app.use(this.paths.seller, require('../../../routes/seller.routes'));
        this.app.use(this.paths.role, require('../../../routes/role.routes'));
    }

    listen() {
        this.app.listen(this.serverPort, this.serverHost, () => {
            console.log(`Server listening on http://${this.serverHost}:${this.serverPort}`)
        })
    }
}

module.exports = ServerModel;