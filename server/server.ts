import * as path from "path";
import express from "express";
import http from "http";
import socketIO from "socket.io";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const _port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('New user connection');
    newUserJoining();

    function brodcastMessage(message: { from: string, text: string, createsAt: number }) {
        socket.broadcast.emit('newMessage', message)
    }

    function newUserJoining() {
        socket.emit('newMessage', { from: 'Admin', text: 'Welcome to the chat app', createsAt: Date.now() });
        socket.broadcast.emit('newMessage', { from: 'Admin', text: 'New user joined', createsAt: Date.now() });
    }

    socket.on('createMessage', (msg) => {
        console.log('New message recieved ', msg);
        msg.createsAt = Date.now();
        brodcastMessage(msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(_port, () => {
    console.info(`Server is up on port ${_port}`);
});
