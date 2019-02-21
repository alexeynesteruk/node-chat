var app = new Vue({
    el: '#app',
    data: {
        message: '',
        msgs: []
    },
    methods: {
        sendMessage: function (e) {
            sendMessage('User', this.message);
            e.preventDefault();
            e.target.reset();
        },
        sendLocation
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

socket.on('newLocationMessage', function (msg) {
    const loc = msg.location;
    const locLink = `http://www.google.com/maps?q=${loc.latitude},${loc.longitude}`
    app.msgs.unshift({ locLink, from: msg.from });
});

function sendMessage(from, text) {
    socket.emit('createMessage', {
        from: from,
        text: text
    }, function (message) {
        console.log(message);
    });
}

function sendLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('sendLocationMessage', {
            from: 'USer1',
            location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        }, function (message) {
            console.log(message);
        });
    }, function () {
        alert('Unable to fetch you location.');
    });
}