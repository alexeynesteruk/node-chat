import * as path from "path";
import express from "express";
import http from "http";
import socketIO from "socket.io";
import { Message } from "./utils/messages/textMessage/message";
import { LocationMessage } from "./utils/messages/locationMessage/locationMessage";
import {Validators} from"./utils/validators/validators";

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

    function brodcastLocation(locationMessage: LocationMessage) {
        socket.broadcast.emit('newLocationMessage', locationMessage)
    }

    function newUserJoining() {
        socket.emit('newMessage', new Message('Admin', 'Welcome to the chat app'));
        socket.broadcast.emit('newMessage', new Message('Admin', 'New user joined'));
    }

    socket.on('join', (params, callback) => {
        if(!Validators.isNonEmptyString(params.name) || !Validators.isNonEmptyString(params.room))
        {
            callback('Name and room name are require');
        }
        callback();
    })

    socket.on('createMessage', (msg, callback) => {
        console.log('New message recieved ', msg);
        brodcastMessage(new Message(msg.from, msg.text));
        callback('You message was sent');
    });

    socket.on('sendLocationMessage', (msg, callback) => {
        let location = new LocationMessage(msg.from, msg.location);
        console.log('New location recieved ');
        brodcastLocation(location);
        callback('You location was sent');
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(_port, () => {
    console.info(`Server is up on port ${_port}`);
});
