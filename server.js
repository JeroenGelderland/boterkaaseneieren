import express from 'express';
import { Server } from 'socket.io'
import Game from './Game.js'
import { dirname } from 'path';

const __dirname = dirname('./')
console.log(__dirname)

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const server = express()
    .use(express.static(__dirname + '/public'))
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = new Server(server);


let game = new Game()

io.on('connection', (socket) => {

    const socket_id = socket.id

    let team = game.join(socket.id)

    if(team){
        io.to(socket_id).emit('team', team)
    }
 
    console.log('Client connected');

    socket.on('disconnect', () => {
        game.leave(socket_id)
        console.log('Client disconnected')
    });

    socket.on('place', (pos) => {
        if(game.place(pos, socket_id)){
            io.emit('refresh', game)
        }
    })

    io.emit('refresh', game)
});


