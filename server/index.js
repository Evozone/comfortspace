const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');

const userRouter = require('./routes/user.js');
const blogsRouter = require('./routes/blog.js');
const roomsRouter = require('./routes/room.js');
const chatRouter = require('./routes/chat.js');
const messageRouter = require('./routes/message.js');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use('/api/user', userRouter);
app.use('/api/blog', blogsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/rooms', roomsRouter);

app.get('/mtoken', (req, res) => {
    var app_access_key = process.env.HMS_ACCESS_KEY;
    var app_secret = process.env.HMS_SECRET_APP;
    try {
        const token = jwt.sign(
            {
                access_key: app_access_key,
                type: 'management',
                version: 2,
                iat: Math.floor(Date.now() / 1000),
                nbf: Math.floor(Date.now() / 1000),
            },
            app_secret,
            {
                algorithm: 'HS256',
                expiresIn: '1h',
                jwtid: uuid4(),
            }
        );
        res.status(200).json({
            success: true,
            data: {
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
});

app.get('/', (req, res) => {
    res.send('Hello to Oktobenotok API');
});

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.log(`${error} did not connect`));

const server = app.listen(PORT, () =>
    console.log(
        'Hello! This is oktobenotok backend, listening on port - ',
        PORT
    )
);

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLIENT_URL,
    },
});

let online_users = [];
io.on('connection', (socket) => {
    socket.on('join', ({ newUserId, onlineStatus }) => {
        if (!online_users.some((user) => user.userId === newUserId)) {
            online_users.push({
                userId: newUserId,
                socketId: socket.id,
                onlineStatus,
            });
            console.log('New User Connected', online_users);
        }
        io.emit('online_users', online_users);
    });

    socket.on('send_message', (data) => {
        const { receiverId, senderId } = data;
        const user = online_users.find((user) => user.userId === receiverId);
        const self = online_users.find((user) => user.userId === senderId);
        if (user) {
            io.to(user.socketId).emit('recieve_message', data);
            io.to(user.socketId).emit('recieve_notification', data);
        }
        if (self) {
            io.to(self.socketId).emit('update_user_chats', data);
        }
    });

    socket.on('start_typing', (data) => {
        console.log('start typing', data);
        const { receiverId } = data;
        const user = online_users.find((user) => user.userId === receiverId);
        console.log('user', user);
        if (user) {
            io.to(user.socketId).emit('typing_status', data);
        }
    });

    socket.on('stop_typing', (data) => {
        const { receiverId } = data;
        const user = online_users.find((user) => user.userId === receiverId);
        if (user) {
            io.to(user.socketId).emit('typing_status', data);
        }
    });

    socket.on('disconnect', () => {
        online_users = online_users.filter(
            (user) => user.socketId !== socket.id
        );
        console.log('User Disconnected', online_users);
        io.emit('online_users', online_users);
    });
});
