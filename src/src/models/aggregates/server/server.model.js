// Constants
const { coreConfigurationsConst } = require('../../../constants/index.constants')

// Crons
const { jobsBuilder } = require('../../../jobs/index.jobs');

// Libraries
const express = require('express');
const cors = require('cors');
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");


// DB Connections
const { mySqlDBConnection, mySqlDBSynchronization, mySqlDBDefaultDataCreation } = require('../../../connections/my-sql.connection');
const { redisDBConnection } = require('../../../connections/redis.connection');

// Queues
const { invoiceSynchronizationJobsQueue } = require('../../../connections/queues/sales.queues.connection');

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
            travel: '/api/travel',
            seller: '/api/seller',
            role: '/api/role',
            route: '/api/route',
            seat: '/api/seat',
            invoice: '/api/invoice',
            observation: '/api/observation',
            resolution: '/api/resolution',
            country: '/api/country',
            bloodType: '/api/bloodType',
            licenseCategory: '/api/licenseCategory',
            typeBodywork: '/api/typeBodywork',
            typeFuel: '/api/typeFuel',
            typeVehicle: '/api/typeVehicle',
            owner: '/api/owner',
        }
        this.dbHost = coreConfigurationsConst.dbHost;
        this.dbs();
        this.middleware();
        this.routes();
    }

    async dbs() {
        await mySqlDBConnection();
        await mySqlDBSynchronization();
        await mySqlDBDefaultDataCreation();
        await redisDBConnection()
        await jobsBuilder()

    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));

        const serverAdapter = new ExpressAdapter();
        const bullBoard = createBullBoard({
            queues: [new BullMQAdapter(invoiceSynchronizationJobsQueue)],
            serverAdapter: serverAdapter,
        });
        serverAdapter.setBasePath("/admin");

        this.app.use("/admin",serverAdapter.getRouter());

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
        this.app.use(this.paths.route, require('../../../routes/route.routes'));
        this.app.use(this.paths.seat, require('../../../routes/seat.routes'));
        this.app.use(this.paths.travel, require('../../../routes/travel.routes'));
        this.app.use(this.paths.invoice, require('../../../routes/invoice.routes'));
        this.app.use(this.paths.observation, require('../../../routes/observation.routes'));
        this.app.use(this.paths.resolution, require('../../../routes/resolution.routes'));
        this.app.use(this.paths.country, require('../../../routes/country.routes'));
        this.app.use(this.paths.bloodType, require('../../../routes/bloodType.routes'));
        this.app.use(this.paths.licenseCategory, require('../../../routes/licenseCategory.routes'));
        this.app.use(this.paths.typeBodywork, require('../../../routes/typeBodywork.routes'));
        this.app.use(this.paths.typeFuel, require('../../../routes/typeFuel.routes'));
        this.app.use(this.paths.typeVehicle, require('../../../routes/typeVehicle.routes'));
        this.app.use(this.paths.owner, require('../../../routes/owner.routes'));
    }

    listen() {
        this.app.listen(this.serverPort, this.serverHost, () => {
            console.log(`Server listening on http://${this.serverHost}:${this.serverPort}`)
        })
    }
}

module.exports = ServerModel;