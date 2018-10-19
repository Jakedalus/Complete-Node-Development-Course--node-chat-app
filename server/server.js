const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newMessage', {
        from: 'Jake',
        text: 'Aw hell yea',
        createdAt: 123
    });

    socket.on('createMessage', (msg) => {
        console.log('createMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});




app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});