var app = new Vue({
    el: '#app',
    data: { 
        message: '',
        msgs:[]
    },
    methods: {
        sendMessage: function (e) {
            sendMessage('User', this.message);
            e.preventDefault();
            e.target.reset();
        }
    }
})

const socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('newMessage', function (msg) {
    app.msgs.unshift(msg);
});

function sendMessage(from, text) {
    socket.emit('createMessage', {
        from: from,
        text: text
    }, function (message) {
        console.log(message);
    });
}