import { initSocket } from '../socket';
import { Socket } from 'socket.io-client';

describe('initSocket', () => {
    it('should return a socket connection', async () => {
        const namespace = 'test';
        const socket = await initSocket(namespace);

        expect(socket).toBeInstanceOf(Socket);
    });
});
