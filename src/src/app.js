// Configuration environment
const { coreConfigurationsConst } = require('./constants/index');

// Libraries
require('dotenv').config();

if (coreConfigurationsConst.envFound.parsed.NODE_ENV === 'production') {
    var apm = require('elastic-apm-node').start({
    serviceName: 'Node_Prototype',
    secretToken: '',
    serverUrl: 'https://elastic.wiedii.co:8200',
    environment: coreConfigurationsConst.envFound
    });
}

const Server = require('./models/aggregates/server/server.model');

const server = new Server();

server.listen();
