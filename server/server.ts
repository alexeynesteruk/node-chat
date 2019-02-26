import * as path from "path";
import express from "express";
import http from "http";
import socketIO from "socket.io";
import { Message } from "./models/textMessage/message";
import { LocationMessage } from "./models/locationMessage/locationMessage";
import { Validators } from "./utils/validators/validators";
import { UserStore } from "./models/userStore/UserStore";
import { User } from "./models/user/User";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const _users = new UserStore();

const _port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('New user connection');

    function brodcastMessageToRoom(room: string, message: Message) {
        io.to(room).emit('newMessage', message);
        console.info(`Message: ${JSON.stringify(message, undefined, '\t')} was sent to room: ${room}`);
    }

    function brodcastLocation(room: string, locationMessage: LocationMessage) {
        io.to(room).emit('newLocationMessage', locationMessage)
        console.info(`Location: ${JSON.stringify(locationMessage, undefined, '\t')} was sent to room: ${room}`);
    }

    function newUserJoining(name: string, room: string) {
        const user = new User(socket.id, name, room)
        _users.removeUser(socket.id);
        _users.addUser(user);
        socket.emit('newMessage', new Message('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(user.room).emit('newMessage', new Message('Admin', `${user.name} joined`));
        socket.broadcast.to(user.room).emit('userJoined', user.name);
    }

    socket.on('join', (params, callback) => {
        if (!Validators.isNonEmptyString(params.name) || !Validators.isNonEmptyString(params.room)) {
            callback('Name and room name are require');
        }

        socket.join(params.room);
        newUserJoining(params.name, params.room);

        callback({ body: _users.getUserNameListByRoom(params.room) });
    })

    socket.on('createMessage', (msg, callback) => {
        const user = _users.getUser(socket.id);

        if (user && Validators.isNonEmptyString(msg.text)) {
            brodcastMessageToRoom(user.room, new Message(msg.from, msg.text));
            callback({});
        }
        else {
            callback({ error: `Can't send your message` });
        }
    });

    socket.on('sendLocationMessage', (msg, callback) => {
        const location = new LocationMessage(msg.from, msg.location);
        const user = _users.getUser(socket.id);
        brodcastLocation(user.room, location);
        callback({ body: 'You location was sent' });
    });

    socket.on('disconnect', () => {
        const user = _users.removeUser(socket.id);
        io.to(user.room).emit('userLeft', user.name);
        socket.broadcast.to(user.room).emit('newMessage', new Message('Admin', `${user.name} has left`));
        console.log('Client disconnected');
    })
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(_port, () => {
    console.info(`Server is up on port ${_port}`);
});
