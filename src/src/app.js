require('dotenv').config();
const { envFound } = require('./config');

if (envFound.parsed.NODE_ENV === 'production') {
    var apm = require('elastic-apm-node').start({
    serviceName: 'Node_Prototype',
    secretToken: '',
    serverUrl: 'https://elastic.wiedii.co:8200',
    environment: envFound
    });
}

const Server = require('./models/server.models');

const server = new Server();

server.listen();