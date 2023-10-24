
const {SocketConnection} = require('./../socket/models/socket.model');

const socketConnection = SocketConnection.getInstance();

module.exports = {
    connectWebSocket: () => {
        const url = 'http://192.168.50.10:7001/passage';
        socketConnection.connect(url);
    }
}