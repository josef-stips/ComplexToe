// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
//     app.quit();
// }

// let windows = new Set();

// const createWindow = () => {
//     // Create the browser window.
//     const window = new BrowserWindow({
//         width: 800,
//         height: 600,
//         fullscreen: true,
//         // autoHideMenuBar: true,
//         webPreferences: {
//             preload: path.join(__dirname, 'preload.js'),
//         },
//     });

//     windows.add(window)

//     window.on("closed", () => {
//         windows.delete(window);
//         window = null;
//     });

//     // and load the index.html of the app.
//     window.loadFile(path.join(__dirname, '/script/public/index.html'));

//     // Open the DevTools.
//     window.webContents.openDevTools();
// };

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     // On OS X it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     // if (BrowserWindow.getAllWindows().length === 0) {
//     //     createWindow();
//     // }

//     if (windows.size === 0) {
//         createWindow();
//     };
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// const { app, BrowserWindow } = require('electron');

// server
const { instrument } = require('@socket.io/admin-ui');

const path = require('path');
const http = require('http');
const express = require('express');
const bcrypt = require('bcrypt');

const App = express();
const server = http.createServer(App);
const PORT = process.env.PORT || 3000;

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
    },
});

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash('ComplexToeServer', salt, function(err, hash) {
//         // Store hash in your password DB.
//         console.log(hash);
//     });
// });

// dev
instrument(io, {
    auth: {
        type: "basic",
        username: "admin",
        password: "$2b$10$qoNcQaDE/Ri9B5Q40JQVHuWQV4Vzm6da8Tiwh50SIYiK/0N7CLYxG",
    },
    mode: 'development'
});

// server listen
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

App.use(express.static(path.join(__dirname, '/script/public')));

// Server data
// There are two objects for rooms
// In "Rooms" there are all room ids and in "RoomData" for each room the data 
let ServerData = {
    Rooms: [
        // Example:
        // '123456',
    ],

    // For each room the data
    RoomData: {
        // Example:
        // '123456': {
        //     'id': 123456,
        //     'players': {
        //         1: { 'name': 'Josef', 'icon': 'X', 'role': 'admin' },
        //         2: { 'name': 'Josef', 'icon': 'J', 'role': 'user' },
        //     },
        // }
    }
};

// Websocket 
io.on('connection', socket => {
    console.log('a user connected ' + socket.id);

    // player disconnected from the lobby
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // create game room (lobby) and its game code
    socket.on('create_room', (callback) => { // create room with its id

        const min = 100000;
        const max = 999999;

        let roomID = createID(min, max);

        if (!ServerData.Rooms.includes(roomID)) {
            ServerData.Rooms.push(roomID);
            socket.join(roomID);

        } else {
            createID(min, max);
        };

        console.log(roomID);
        callback(roomID);
    });

    // try to enter a room
    socket.on('enter_room', (id, callback) => { // the id the user parsed into the input field

        if (ServerData.Rooms.includes(parseInt(id))) { // room exists
            console.log('room exists');

            socket.join(parseInt(id));

            // callback to client who wants to join
            callback('room exists');

        } else { // room does not exists, alert user
            console.log('no room found')

            // callback to client who wants to join
            callback('no room found');
        };
    });

    // player kills room which he created before
    socket.on('kill_room', (id) => {
        const index = ServerData.Rooms.indexOf(id);

        // remove id from the "Rooms" array
        if (index !== -1) {
            ServerData.Rooms.splice(index, 1);

            console.log(ServerData.Rooms)
        };
    });

    // user leaves lobby. if admin leaves lobby => room gets killes and all users in there gets kicked out
    socket.on('user_left_lobby', (user, roomID, callback) => {
        if (user == 'admin') {
            // room gets deleted
            console.log(`Room: ${roomID}, gets deleted`);
            socket.emit('kill_room', roomID);

            callback('You killed the lobby');

        } else if (user == 'user') { // user kicks himself from the lobby
            console.log('user left the game');

            socket.leave(roomID);
            callback('You just left the game');
        };
    });
});

// generates ID for the room
const createID = (min, max) => { let = roomID = Math.floor(Math.random() * (max - min + 1)) + min; return roomID; };