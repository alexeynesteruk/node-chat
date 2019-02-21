import * as path from "path";
import express from "express";
import http from "http";
import socketIO from "socket.io";
import { Message } from "./utils/message";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const _port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('New user connection');
    newUserJoining();

    function brodcastMessage(message: Message) {
        socket.broadcast.emit('newMessage', message)
    }

    function newUserJoining() {
        socket.emit('newMessage', new Message('Admin','Welcome to the chat app'));
        socket.broadcast.emit('newMessage',new Message('Admin','New user joined'));
    }

    socket.on('createMessage', (msg) => {
        console.log('New message recieved ', msg);
        brodcastMessage(new Message(msg.from, msg.text));
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(_port, () => {
    console.info(`Server is up on port ${_port}`);
});
