import { io } from 'socket.io-client';

class SocketioService {
    socket;
    constructor() {}

    setupSocketConnection(currentUser, room) {
        this.socket = io('http://localhost:3000', {
            auth: {
                token: 'test'
            }});
        this.socket.on("connect", connectedUsers => {
            this.socket.emit('join', room, JSON.parse(currentUser))

        })
    }
    disconnect(currentUser, room) {
        if (this.socket) {

            this.socket.disconnect();
        }
    }
}

export default new SocketioService();