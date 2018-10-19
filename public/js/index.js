
const socket = io();

socket.on('connect', function () {
    console.log("Connected to server");

    socket.emit('createMessage', {
        from: 'Johnny',
        text: 'nm u'
    });
});

socket.on('newMessage', function(msg) {
    console.log("New message", msg);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


