moment.locale('ru');

var app = new Vue({
    el: '.chat',
    data: {
        message: '',
        currentUserName:'',
        users: [],
        sendingLocation: false,
        msgs: []
    },
    methods: {
        sendMessage: function (e) {
            sendMessage(this.currentUserName, this.message, function () {
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
    const params = deparam(window.location.search);
    socket.emit('join', params, function (res) {
        if (res.error) {
            alert(res.error);
            window.location.href = '/';
        } else {
            app.currentUserName = params.name;
            app.users = res.body;
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('userJoined', function (userName) {
    console.log(userName);
    app.users.push(userName);
});

socket.on('userLeft', function (userName) {
    app.users.splice(app.users.findIndex(user => user === userName), 1);
    console.log(userName);
});

socket.on('newMessage', function (msg) {
    msg.formattedTime = moment(msg.createdAt).format('H:mm');
    app.msgs.push(msg);
    setTimeout(scrollToBottom, 0);
});

socket.on('newLocationMessage', function (msg) {
    const loc = msg.location;
    const locLink = `http://www.google.com/maps?q=${loc.latitude},${loc.longitude}`
    msg.formattedTime = moment(msg.createdAt).format('H:mm');
    app.msgs.push({ locLink, ...msg });
    scrollToBottom();
});

function sendMessage(from, text, callback) {
    socket.emit('createMessage', {
        from: from,
        text: text
    }, function (res) {
        if (res.error)
            console.error(res.error);
        else
            callback();
    });
}

function scrollToBottom() {
    const msgs = document.getElementsByClassName('chat__messages')[0];
    const newMessage = msgs.children[msgs.children.length - 1];

    const clientHeight = msgs.clientHeight;
    const scrollTop = msgs.scrollTop;
    const scrollHeight = msgs.scrollHeight;

    let newMessageHeight, lastMessageHeight, prevMessage;
    if (newMessage) {
        newMessageHeight = +window.getComputedStyle(newMessage, null).getPropertyValue("height").split("px")[0];
        prevMessage = newMessage.previousElementSibling;
    }
    if (prevMessage) {
        lastMessageHeight = +window.getComputedStyle(prevMessage, null).getPropertyValue("height").split("px")[0];
    }

    if (scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
        msgs.scrollTop = scrollHeight;
    }
}

function sendLocation(callback) {
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('sendLocationMessage', {
            from: app.currentUserName,
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