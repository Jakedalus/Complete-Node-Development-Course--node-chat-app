
const socket = io();

function scrollToBottom () {
    // Selectors
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');

    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function () {
    const params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
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
    scrollToBottom();
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
    scrollToBottom();
});

socket.on('updateUserList', function (users) {
    const ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    const messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
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


