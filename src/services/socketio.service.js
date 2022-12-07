import { io } from 'socket.io-client';

class SocketioService {
    socket;
    constructor() {}

    setupSocketConnection() {
        this.socket = io('http://localhost:3000', {
            auth: {
                token: 'test'
            }});
        this.socket.on("connect", connectedUsers => {
            this.socket.emit('newUser', JSON.parse(localStorage.getItem('currentUser')))
            console.log(connectedUsers)
        })
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketioService();