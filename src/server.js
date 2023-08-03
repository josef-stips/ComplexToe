const { instrument } = require('@socket.io/admin-ui');

const path = require('path');
const http = require('http');
const express = require('express');

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

// dev
instrument(io, {
    auth: {
        type: "basic",
        username: "admin",
        password: "$2b$10$qoNcQaDE/Ri9B5Q40JQVHuWQV4Vzm6da8Tiwh50SIYiK/0N7CLYxG",
    },
    mode: 'production'
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
        //         1: { 'name': 'Josef', 'icon': 'X', 'role': 'admin', socket: '' },
        //         2: { 'name': 'Josef', 'icon': 'J', 'role': 'user', socket: '' },
        //         // socket is the id, auto-generated by socket.io
        //     },
        //     'game': {
        //         'options': [],
        //         'InnerGameMode': 'Boneyard',
        //         'xyCellAmount': 20,
        //         'globalGameTimer': 0,
        //         'PlayerTimer': 15,
        //         'IsPlaying': false,
        //         'fieldIndex': index of field to identify,
        //         'fieldTitle: title of the field,
        //         'GlobalGameInterval': {},
        //     },
        // },
    },
}; // !Important: The id of a room is always a number 

// Websocket 
io.on('connection', socket => {
    console.log('a user connected to the server ' + socket.id);

    // player disconnected from the lobby
    socket.on('disconnect', reason => {
        console.log('user disconnected from the server ' + socket.id);

        // Loops all rooms and checks if the disconnected client is in a server
        // It also checks if the client was an admin or user in the room
        for (const k in ServerData.RoomData) {
            if (ServerData.RoomData.hasOwnProperty(k)) {
                let el = ServerData.RoomData[k]; // all room data
                let room = parseInt(el['id']); // room id
                let isPlaying = el['game']['isPlaying'];

                // This code block checks if the socket that disconnected (for ex. it closed the app or has a poor internet connection)
                // is in this server by comparing its id with the socket id that is storaged in the room data object 
                if (socket.id == el['players'][1]['socket']) { // Check if user is admin
                    // delete room from server global room data object
                    delete ServerData.RoomData[room];

                    // delete the room from the server and inform the other player (user) in the room about it
                    io.to(el['players'][2]['socket']).emit('INFORM_admin_left_room');

                    // kicks out all player so the room gets deleted from the server
                    io.socketsLeave(room);

                    break;

                } else if (socket.id == el['players'][2]['socket']) { // Check if user is just a user
                    // inform the admin about the fact the user just left

                    // if in game
                    ServerData.RoomData[parseFloat(room)]['game']['globalGameTimer'] = 0;

                    // reset data of user in player room object
                    el['players'][2]['name'] = '';
                    el['players'][2]['icon'] = '';
                    el['players'][2]['role'] = 'user';
                    el['players'][2]['socket'] = '';

                    // if in game
                    if (!isPlaying) {
                        console.log("NOT in game")
                        io.to(el['players'][1]['socket']).emit('INFORM_user_left_room');

                        break;

                    } else if (isPlaying) { // if not in game
                        console.log("in game")
                        io.to(el['players'][1]['socket']).emit('INFORM_user_left_game');
                        isPlaying = false;

                        break;
                    };

                } else {
                    console.log("socket is not in this server")
                };
            };
        };
    });

    // create game room (lobby) and its game code
    socket.on('create_room', (GameData, callback) => { // create room with its id
        console.log(ServerData.Rooms, ServerData.RoomData)

        const min = 100000;
        const max = 999999;

        let roomID = createID(min, max);

        if (!ServerData.Rooms.includes(roomID)) {

            // Data handling
            ServerData.Rooms.push(roomID);

            // create Room data with its player and game data
            ServerData.RoomData[roomID] = {
                // identifier
                'id': roomID,
                // create game data for admin
                'players': {
                    1: { 'name': GameData[3], 'icon': GameData[4], 'role': 'admin', 'socket': socket.id }, // You who created the room
                    2: { 'name': '', 'icon': '', 'role': 'user', 'socket': '' } // Your friend who will join the room
                },
                // create a part of the game data to display in the lobby
                'game': {
                    'xyCellAmount': GameData[2],
                    'InnerGameMode': GameData[1],
                    'PlayerTimer': GameData[0],
                    // configure when admin starts game
                    'options': [],
                    'globalGameTimer': 0,
                    'IsPlaying': false,
                    'fieldIndex': GameData[5], // the html index of the field to identify
                    'fieldTitle': GameData[6], // the game title of the field
                },
            };

            // join room as admin because your the creator
            socket.join(roomID);
            console.log(roomID)

            // Inform and update the page of all other people who are clients of the room about the name of the admin
            io.to(roomID).emit('Admin_Created_And_Joined', [GameData[3], GameData[4]]); // PlayerData[0] => name of admin

        } else {
            createID(min, max);
        };

        callback(roomID);
    });

    // try to enter a room. If room exists, the player enters the room but still needs to confirm his user data
    socket.on('TRY_enter_room', (GameID, callback) => { // the id the user parsed into the input field

        if (ServerData.Rooms.includes(parseInt(GameID))) { // check if room exists

            // check if the room is full. (over 2 player => full)
            if (io.sockets.adapter.rooms.get(parseInt(GameID)).size == 1) {
                // join room
                socket.join(parseInt(GameID));

                // Game Data for the client
                let FieldSize = ServerData.RoomData[parseInt(GameID)]['game']['xyCellAmount'];
                let PlayerTimer = ServerData.RoomData[parseInt(GameID)]['game']['PlayerTimer'];
                let InnerGameMode = ServerData.RoomData[parseInt(GameID)]['game']['InnerGameMode'];

                // callback to client who wants to join
                callback(['room exists', GameID, FieldSize, PlayerTimer, InnerGameMode]);

            } else { // room is full
                callback([`You can't join`]);
            };

        } else if (!ServerData.Rooms.includes(parseInt(GameID))) { // room does not exists, alert user
            // callback to client who wants to join
            callback(['no room found']);
        };
    });

    // If the room existed, the user joined and setted up his data, this emit listener storages the data on the server
    // And it informs all player in the room about player 2 (user) and player 1 (admin)
    // data[0] = room id ; data[1] = player name ; data[2] = player icon
    socket.on('CONFIRM_enter_room', (data, callback) => {
        // Check if users name is equal to admins name
        if (data[1] == ServerData.RoomData[parseInt(data[0])]['players'][1]['name']) {
            callback('Choose a different name!');
            return;
        };

        // Check if users icon is equal to admins icon
        if (data[2] == ServerData.RoomData[parseInt(data[0])]['players'][1]['icon']) {
            callback('Choose a different icon!');
            return;
        };

        // save data in object
        // The 'role' is already declared when the room was created by the admin
        ServerData.RoomData[data[0]]['players'][2]['name'] = data[1]; // set user name
        ServerData.RoomData[data[0]]['players'][2]['icon'] = data[2]; // set user icon
        ServerData.RoomData[data[0]]['players'][2]['socket'] = socket.id; // set user socket.id

        // updates the html of all players in the room with the name of the second player
        io.to(parseInt(data[0])).emit('SecondPlayer_Joined', [data[1], data[2]]); // second parameter => icon of second player

        callback([data[1], ServerData.RoomData[parseInt(data[0])]['players'][1]['name'], ServerData.RoomData[parseInt(data[0])]['players'][1]['icon'], data[2]]);
    });

    // user leaves lobby. if admin leaves lobby => room gets killes and all users in there gets kicked out
    socket.on('user_left_lobby', (user, roomID, callback) => {
        // general things
        if (user == 'admin') {
            // Check if they were in a game playing tic tac toe or not
            let isPlaying = ServerData.RoomData[parseFloat(roomID)]['game']['isPlaying'];

            // set the global timer to default again
            ServerData.RoomData[parseFloat(roomID)]['game']['globalGameTimer'] = 0;

            // If they are in a game
            if (isPlaying) {
                // send message to the admin and especially to all other clients that the game is killed
                // so they are just in the lobby again
                // the room is still existing with all clients
                io.to(roomID).emit('killed_game');

                // They do not play anymore
                ServerData.RoomData[parseFloat(roomID)]['game']['isPlaying'] = false;

                return;
            };

            // if they are still in the lobby and the admin leaves
            if (!isPlaying) {
                // send a function to the other person of the room so their html updates properly
                io.to(roomID).emit('killed_room');

                // kicks out all player so the room gets deleted from the server
                io.socketsLeave(roomID);

                // Room gets deleted from the global room arrays "Rooms" and "RoomData" in the "ServerData" Object
                kill_room(parseInt(roomID));

                // callback to frontend
                callback('You killed the lobby');
            };

        } else if (user == 'user') { // user kicks himself from the lobby
            // Check if they were in a game playing tic tac toe or not
            let isPlaying = ServerData.RoomData[parseFloat(roomID)]['game']['isPlaying'];

            // If they were playing
            if (isPlaying) {
                // all user data needs to be deleted now
                // The 'role' is already declared when the room was created by the admin
                ServerData.RoomData[parseInt(roomID)]['players'][2]['name'] = ''; // delete user name
                ServerData.RoomData[parseInt(roomID)]['players'][2]['icon'] = ''; // delete user icon
                ServerData.RoomData[parseInt(roomID)]['players'][2]['socket'] = ''; // delete user socket.id

                // user just leaves
                socket.leave(parseInt(roomID));

                // Inform admin that user just left
                io.to(parseInt(roomID)).emit('INFORM_user_left_game');

                // update the value 'isPlaying' to false to say they are not playing
                ServerData.RoomData[parseFloat(roomID)]['game']['isPlaying'] = false;

                // callback to frontend to update the data of the user who left
                callback('You just left the game');

                return;
            };

            // If they were not playing
            if (!isPlaying) {
                // user just leaves
                socket.leave(parseInt(roomID));

                // inform all other players that you left
                io.to(parseInt(roomID)).emit('INFORM_user_left_room');

                // callback to frontend to update the data of the user who left
                callback('You just left the game');
            };
        };
    });

    // admin wants to start the game
    socket.on('request_StartGame', (Data) => {
        // If the lobby is full and the user confirmed his data 
        if (io.sockets.adapter.rooms.get(parseInt(Data[0])).size >= 2 && ServerData.RoomData[parseFloat(Data[0])]['players'][2]['name'] != '') { // Data[0] = room id

            // Set the global variable "isPlaying" to true to say that the users in this room are currently in a game
            ServerData.RoomData[parseFloat(Data[0])]['game']['isPlaying'] = true;
            // In online mode there is only one "options" array that represents the game field for all users in the game
            // Because of that, the "options" arrays needs to be created in the server and not locally in the "Game.js" file
            ServerData.RoomData[parseFloat(Data[0])]['game']['options'].length = 0; // reset 

            // create global game options
            for (i = 0; i < Data[1] * Data[1]; i++) { // Data[1] = xyCell_Amount , 5, 10, 15, 20 etc.
                ServerData.RoomData[parseFloat(Data[0])]['game']['options'].push("");
            };

            // set the global timer to default again
            ServerData.RoomData[parseFloat(Data[0])]['game']['globalGameTimer'] = 0;

            // sends all room data (game, player) to both clients so everything in the game is the same and synchronised
            io.to(parseInt(Data[0])).emit('StartGame', [ServerData.RoomData[parseFloat(Data[0])]]);
        };
    });

    // If the admin starts the game with the boneyard inner game mode,
    // this emit chooses random indexes of the options array and marks them 
    // data[0] = room ID, data[1] = result, data[2] = options, data[3] = xyCellAmount
    // result = random 2d array with numbers, options = represents game field in array
    socket.on('Global_Boneyard', (data, cb) => {
        // reset 
        // create global game options
        for (i = 0; i < data[3] * data[3]; i++) { // Data[1] = xyCell_Amount , 5, 10, 15, 20 etc.
            ServerData.RoomData[parseFloat(data[0])]['game']['options'].push("");
        };

        // process which marks random indexes of the options array that need to be blocked
        for (i = 0; i < data[1].length; i++) {
            let RIndex = Math.floor(Math.random() * data[1][i].length);
            let Index = data[1][i][RIndex]

            // options index value to unknown zeichen
            data[2][Index] = '%%';
        };

        // update global options array
        ServerData.RoomData[parseFloat(data[0])]['game']['options'] = data[2];
        // send modified global options array to every client in room
        io.to(parseInt(data[0])).emit('recieveGlobalOptions', ServerData.RoomData[parseFloat(data[0])]['game']['options']);
    });

    // Just a small thing so all '%%' character from the global options array are getting deleted
    socket.on('BoneyardFinalProcess', id => {
        let gOpt = ServerData.RoomData[parseFloat(id)]['game']['options'];

        for (let i = 0; i < gOpt.length; i++) {
            gOpt[i] = '';
        };
    });

    // Only the admin can reload the game
    // When he reloads, a message to all clients gets send
    socket.on('Reload_OnlineGame', (id, xyCellAmount) => {
        // set the global timer to default again
        ServerData.RoomData[parseFloat(id)]['game']['globalGameTimer'] = 0;

        // reset options
        ServerData.RoomData[parseFloat(id)]['game']['options'].length = 0; // reset 

        // create global game options
        for (i = 0; i < xyCellAmount * xyCellAmount; i++) { // Data[1] = xyCell_Amount , 5, 10, 15, 20 etc.
            ServerData.RoomData[parseFloat(id)]['game']['options'].push("");
        };

        // send message to all clients and updated options array
        io.to(parseInt(id)).emit('Reload_GlobalGame', ServerData.RoomData[parseFloat(id)]['game']['options']);
    });

    // Some client clicked on the board
    // data[0] = id, data[2] = cell Index, data[3] = player form (x,o,z etc.)
    socket.on('PlayerClicked', (data) => {
        ServerData.RoomData[parseFloat(data[0])]['game']['options'][data[2]] = data[3];

        // update player info on all clients which player can set next
        if (data[1] == 'admin') { // admin
            data[4] = false;

        } else { // user
            data[4] = true;
        };

        io.to(parseInt(data[0])).emit('player_clicked', [ServerData.RoomData[parseFloat(data[0])]['game']['options'], data[4]]);
    });

    // Bug fix for the single_CellBlock function in the checkWinner function when Player sets his form
    socket.on('resetOptions', (id, xyCellAmount, cb) => {
        ServerData.RoomData[parseFloat(id)]['game']['options'].length = 0; // reset 

        // create global game options
        for (i = 0; i < xyCellAmount * xyCellAmount; i++) { // Data[1] = xyCell_Amount , 5, 10, 15, 20 etc.
            ServerData.RoomData[parseFloat(id)]['game']['options'].push("");
        };

        cb(ServerData.RoomData[parseFloat(id)]['game']['options']);
    });

    // This is just an additional functionality of the "change player" function for the online mode
    // It displays "Your turn" for the player who's turn
    socket.on('changePlayer', (id, curr_name) => {
        io.to(parseInt(id)).emit('changePlayerTurnDisplay', curr_name);
    });

    // for the blocker combat inner game mode in online mode 
    socket.on('BlockerCombat', (id, options) => {
        // Random index
        var RIndex = Math.floor(Math.random() * options.length);

        ServerData.RoomData[parseFloat(id)]['game']['options'][RIndex] = '%%';

        io.to(parseInt(id)).emit('blockerCombat_action', ServerData.RoomData[parseFloat(id)]['game']['options']);
    });

    // just a major bug fix
    socket.on('BlockerCombatFinalProcess', (id, index) => {
        ServerData.RoomData[parseFloat(id)]['game']['options'][index] = '';
    });

    // admin calls ultimate win
    socket.on('Call_UltimateWin', (id, data) => {
        io.to(parseInt(id)).emit('global_UltimateWin', data[0], data[1], data[2]);
    });

    // admin calls global game timer which all clients recieve through this emit
    socket.on('globalTimer', id => {
        // set the global timer to default again
        ServerData.RoomData[parseFloat(id)]['game']['globalGameTimer'] = ServerData.RoomData[parseFloat(id)]['game']['globalGameTimer'] + 1;

        io.to(parseInt(id)).emit('display_GlobalGameTimer', ServerData.RoomData[parseFloat(id)]['game']['globalGameTimer']);
    });

    // admin calls player timer 1 which all clients recieve through this emit
    socket.on('INI_playerTimer1', id => {
        io.to(parseInt(id)).emit('playerTimer1');
    });

    // admin calls player timer 2 which all clients recieve through this emit
    socket.on('INI_playerTimer2', id => {
        io.to(parseInt(id)).emit('playerTimer2');
    });

    // admin changes game data in the lobby
    socket.on('Lobby_ChangeGameData', (id, display, SpecificData, Selection) => {
        io.to(parseInt(id)).emit('ChangeGameData', display, SpecificData, Selection);
    });

    // admin updates game data in lobby
    socket.on('updateGameData', (id, xyCellAmount, InnerGameMode, PlayerTimer, fieldIndex, fieldTitle) => {
        // root directory in object
        let root = ServerData.RoomData[parseInt(id)]['game'];

        // update propertys
        root['xyCellAmount'] = xyCellAmount;
        root['InnerGameMode'] = InnerGameMode;
        root['PlayerTimer'] = PlayerTimer;
        root['fieldIndex'] = fieldIndex;
        root['fieldTitle'] = fieldTitle;
    });
});

// generates ID for the room
const createID = (min, max) => { let = roomID = Math.floor(Math.random() * (max - min + 1)) + min; return roomID; };

// player kills room which he created before
// It gets killen from the costum Server Object "ServerData"
const kill_room = id => {
    const index = ServerData.Rooms.indexOf(id); // id : number

    // remove id from the "Rooms" array
    if (index !== -1) {
        // delete Room with its data from the global server data object
        ServerData.Rooms.splice(index, 1); // Delete room id from "Rooms" where all room ids gets storaged
        delete ServerData.RoomData[id]; // Delete room with all its data from the "RoomData" Object
    };
};