express = require('express')
socketIO = require('socket.io')

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {

    const socket_id = socket.id

    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));

    socket.on('click', () => {
        io.to(socket_id).emit('time', new Date().toTimeString())
    });
});

