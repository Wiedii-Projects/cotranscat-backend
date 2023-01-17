// Config
const { serverPort, serverHost, dbHost } = require('../../../config');

// Libraries
const express = require('express');
const cors = require('cors');

// Loaders
const { dbConnection } = require('../../../loaders/mongoose.loaders');

class Server {
    constructor() {
        this.app = express();
        this.serverHost = serverHost;
        this.serverPort = serverPort;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
        }
        this.dbHost = dbHost;
        this.db();
        this.middleware();
        this.routes();
    }

    async db() {
        await dbConnection();
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

module.exports = Server;