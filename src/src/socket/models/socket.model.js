const socketIOClient = require('socket.io-client');

class SocketConnection {
    constructor() {
        this.socket = null;
    }

    static getInstance() {
        if (!SocketConnection.instance) {
            SocketConnection.instance = new SocketConnection();
        }
        return SocketConnection.instance;
    }

    connect(url) {
        this.socket = socketIOClient(url);

        this.socket.on('connect', () => {
            console.log('Connected to the server!');
        });
        
        this.socket.on('disconnect', () => {
            console.log('Disconnected from the server');
            this.socket = null;
        });
    }

    seatsSelectedEvent(message) {
        if (this.socket)
            this.socket.emit('@@passage/SEATS_SELECTED', message);
    }

    restoringChairAvailable(message) {
        if (this.socket) 
            this.socket.emit('@@passage/SEATS_AVAILABLE', message);
    }
}

module.exports = { SocketConnection };