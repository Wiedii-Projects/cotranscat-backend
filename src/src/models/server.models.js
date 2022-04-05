const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../loaders/mongoose.loaders');
const { port, dbHost } = require('../config');

class Server {
    constructor() {
        this.app = express();
        this.port = port;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
        }
        this.dbHost = dbHost;
        this.db();
        this.middlewares();
        this.routes();
    }

    async db() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.users, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, this.dbHost, () => {
            console.log(`Server listening on http://${this.dbHost}:${this.port}`)
        })
    }
}

module.exports = Server;