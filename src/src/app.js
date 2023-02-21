// Constants
const { coreConfigurationsConst } = require('./constants/index.constants');

// Libraries
require('dotenv').config();

// Models
const { ServerModel } = require('./models/index.models');

if (coreConfigurationsConst.envFound.parsed.APP_ENV === 'production') {
    var apm = require('elastic-apm-node').start({
    serviceName: 'Node_Prototype',
    secretToken: '',
    serverUrl: 'https://elastic.wiedii.co:8200',
    environment: coreConfigurationsConst.envFound
    });
}

const server = new ServerModel();

server.listen();
