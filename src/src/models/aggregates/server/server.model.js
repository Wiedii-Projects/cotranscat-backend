// Constants
const { coreConfigurationsConst } = require('../../../constants/index.constants')

// Libraries
const express = require('express');
const cors = require('cors');

// DB Connections
const { mongoDBConnection } = require('./../../../connections/mongo-db.connection');

class ServerModel {
    constructor() {
        this.app = express();
        this.serverHost = coreConfigurationsConst.serverHost;
        this.serverPort = coreConfigurationsConst.serverPort;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
        }
        this.dbHost = coreConfigurationsConst.dbHost;
        this.db();
        this.middleware();
        this.routes();
    }

    async db() {
        await mongoDBConnection();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../../../routes/auth.routes'));
        this.app.use(this.paths.users, require('../../../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.serverPort, this.serverHost, () => {
            console.log(`Server listening on http://${this.serverHost}:${this.serverPort}`)
        })
    }
}

module.exports = ServerModel;