const socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('newMessage', function (msg) {
    console.log('New email', msg);
});

socket.emit('createMessage', {
    from:'me1@example.com',
    text:'Hey! How are you?',
    createAt:332
});