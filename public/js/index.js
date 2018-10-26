
const socket = io();

socket.on('connect', function () {
    console.log("Connected to server");
});

socket.on('newMessage', function(message) {
    const formatedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    const formatedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formatedTime
    });

    jQuery('#messages').append(html);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    const messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled');
    locationButton.text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');
    }, function() {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');
    });
});


