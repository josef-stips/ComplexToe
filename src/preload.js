// // server
// let express = require('express');
// let Wapp = express();
// let http = require('http');

// const server = http.createServer(Wapp);
// const port = 8000;

// let { Server } = require('socket.io');
// const io = new Server(server);

// Wapp.get('/', (req, res) => {
//     res.sendFile(__dirname, +'/src/index.html');
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     io.on('disconnect', () => {
//         console.log('a user disconnected');
//     });
// });

// server.listen(port, () => {
//     console.log(`listening on *:${port}`);
// });