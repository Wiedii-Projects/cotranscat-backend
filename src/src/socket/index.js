
// Constants
const { domainWebSocket } = require('../constants/core/core-configurations.const');

// Models
const {SocketConnection} = require('./../socket/models/socket.model');

const socketConnection = SocketConnection.getInstance();

module.exports = {
    connectWebSocket: () => {
        const url = `${domainWebSocket}/passage`
        socketConnection.connect(url);
    }
}