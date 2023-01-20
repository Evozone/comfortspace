const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-Type, Authorization'
    );
    next();
});

app.get('/', (req, res) => {
    res.send('Hello! This is oktobenotok backend.');
});

server.listen(PORT, () => {
    console.log(
        'Hello! This is oktobenotok backend, listening on port - ',
        PORT
    );
});
