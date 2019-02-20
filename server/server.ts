import * as path from "path";
import express from "express";
import http from "http";
import socketIO from "socket.io";

const app = express();
const server = http.createServer(app); 
const io = socketIO(server);

const _port = process.env.PORT || 3000;

io.on('connection', (socket)=>{
    console.log('New user connection');

    socket.on('disconnect', ()=>{
        console.log('Client disconnected');
    })
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(_port,()=>{
    console.info(`Server is up on port ${_port}`);
});
