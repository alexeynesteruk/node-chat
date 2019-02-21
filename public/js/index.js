moment.locale('ru');

var app = new Vue({
    el: '.chat',
    data: {
        message: '',
        sendingLocation: false,
        msgs: []
    },
    methods: {
        sendMessage: function (e) {
            sendMessage('User', this.message, function () {
                e.target.reset();
            });
            e.preventDefault();
        },
        sendLocation: function () {
            this.sendingLocation = true;
            sendLocation((function () {
                this.sendingLocation = false;
            }).bind(this));
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
    msg.formattedTime = moment(msg.createdAt).format('H:mm');
    app.msgs.push(msg);
});

socket.on('newLocationMessage', function (msg) {
    const loc = msg.location;
    const locLink = `http://www.google.com/maps?q=${loc.latitude},${loc.longitude}`
    msg.formattedTime = moment(msg.createdAt).format('H:mm');
    app.msgs.push({ locLink, ...msg });
});

function sendMessage(from, text, callback) {
    socket.emit('createMessage', {
        from: from,
        text: text
    }, function (message) {
        console.log(message);
        callback();
    });
}

function sendLocation(callback) {
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('sendLocationMessage', {
            from: 'USer1',
            location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        }, function (message) {
            callback();
            console.log(message);
        });
    }, function () {
        alert('Unable to fetch you location.');
        callback();
    });
}