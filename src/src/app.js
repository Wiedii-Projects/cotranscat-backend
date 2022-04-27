var apm = require('elastic-apm-node').start({
serviceName: 'Node_Prototype_Mongo',
secretToken: '',
serverUrl: 'https://elastic.wiedii.co:8200',
environment: 'develop'
});
require('dotenv').config();
const Server = require('./models/server.models');

const server = new Server();

server.listen();