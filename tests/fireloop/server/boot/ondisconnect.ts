import { BootScript } from '@mean-expert/boot-script';

interface Socket { token: { userId: string } }

@BootScript()
class OnDisconnect {

    constructor(public app: any) {
        app.on('socket-disconnect', (socket: Socket) => this.handler(socket));
    }

    handler(socket: Socket): void {
        if (socket.token && socket.token.userId) {
            console.log('An authenticated user has been disconnected:', socket.token.userId);
        } else {
            console.log('An anonymous user has been disconnected');
        }
    }
}

module.exports = OnDisconnect;