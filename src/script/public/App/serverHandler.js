// This script is to handle the communication between client and server
// All EventListener on html elements that send and recieve data from the server

// [The 'create_room', 'CONFIRM_enter_room' emit] There are (2) socket emits in script.js on "SetPlayerName_ConfirmButton", "click" Event

// User wants to enter a room by the "enter game button" 
// He first needs to set up ONLY HIS data. not for the game because he wants to enter an existing room
// With this Event he confirms his data and it checks if the room he wrote, exists
// If yes, he joins the room 
EnterCodeName_ConfirmBtn.addEventListener('click', () => {
    if (EnterGameCode_Input.value != null && EnterGameCode_Input.value != '' && EnterGameCode_Input.value != undefined) {
        // server stuff
        console.log(EnterGameCode_Input.value.trim());
        socket.emit('TRY_enter_room', EnterGameCode_Input.value.trim(), message => {

            // Handle callback message
            if (message[0] == 'room exists') { // room exists
                personal_GameData.EnterOnlineGame = true;
                personal_GameData.currGameID = message[1] // is the game id
                personal_GameData.role = 'user';

                // Initialize lobby display
                // GameID, FieldSize, PlayerTimer, InnerGameMode
                Lobby_GameCode_display.textContent = `Game Code: ${message[1]}`;
                Lobby_InnerGameMode.textContent = `${message[4]}`;
                Lobby_PlayerClock.textContent = `${message[3]} seconds`;
                Lobby_FieldSize.textContent = `${message[2]}x${message[2]}`;

                // Just for style and better user experience
                EnterGameCode_Input.value = null;
                OnlineGameLobby_alertText.style.display = 'none';
                OnlineGame_CodeName_PopUp.style.display = 'none';
                SetPlayerNamesPopUp.style.display = 'flex';
                SetClockList.style.display = 'none';
                SetGameModeList.style.display = 'none';
                SetGameData_Label[0].style.display = 'none';
                SetGameData_Label[1].style.display = 'none';
                SetPlayerNames_Header.style.height = '8%';
                // SetPlayerNamesPopUp.style.height = '60%';
                ConfirmName_Btn.style.height = '15%';
                Player1_IconInput.style.height = '60%';
                Player1_NameInput.style.height = '60%';
                // so the user can't start the game
                Lobby_startGame_btn.style.display = 'none';
                LobbyUserFooterInfo.style.display = 'block';
                // warn text 
                OnlineGame_NameWarnText[0].style.display = 'none';
                OnlineGame_NameWarnText[0].style.display = 'none';

                // for the user, the switch carets should not be visible
                // cause he has no rights to do so
                SwitchCaret.forEach(caret => {
                    caret.style.display = 'none';
                });

                // Aftet this the user only needs to set his user data (name, icon) and clicks confirm
                // So the next socket connection is at SetPlayerName_ConfirmButton in "script.js" with the "CONFIRM_enter_room" emit

            } else if (message[0] == 'no room found') { // no room found
                OnlineGameLobby_alertText.style.display = 'block';
                OnlineGameLobby_alertText.textContent = 'There is no room found!';

            } else if (message[0] == `You can't join`) { // room is full
                OnlineGameLobby_alertText.style.display = 'block';
                OnlineGameLobby_alertText.textContent = `You can't join this room`;
            };
        });

        // for better user experience 
        Player1_NameInput.value = null;
        Player1_IconInput.value = null;

    } else {
        return
    };
});

// if user is in the lobby and clicks the "x-icon" in the header of the pop up, he leaves the game 
// the "user" parameter checks if the user was just a user or the creater of the game
// If it's the creater who leaves, the room needs to be killed and the other user gets kicked out
Lobby_closeBtn.addEventListener('click', () => {
    // server
    socket.emit('user_left_lobby', personal_GameData.role, personal_GameData.currGameID, message => {
        // Do things after room was killed
        // The client isn't connected to any server so the "current id of the room" is null
        personal_GameData.role = 'user';
        personal_GameData.currGameID = null;
        personal_GameData.EnterOnlineGame = false;
    });

    // some things
    OnlineGame_Lobby.style.display = 'none';
    DarkLayer.style.display = 'none';
    OnlineGameLobby_alertText.style.display = 'none';
});

// If user already entered a room and just needs to set up his player data, he can close the window with the "x" in the header
// When he closes the window, he gets kicked out of the room
SetPlayerNamesCloseBtn.addEventListener('click', () => {
    // in computer mode or in online mode but user wants to create a game
    SetPlayerNamesPopUp.style.display = 'none';
    DarkLayer.style.display = 'none';
    ConfirmName_Btn.style.height = '45%';
    SetPlayerNames_Header.style.height = '21%';

    if (personal_GameData.EnterOnlineGame) {
        socket.emit('user_left_lobby', personal_GameData.role, personal_GameData.currGameID, message => {
            // Do things after room was killed
            // The client isn't connected to any server now so the "current id of the room" is null
            personal_GameData.role = 'user';
            personal_GameData.currGameID = null;
            personal_GameData.EnterOnlineGame = false;
        });
    };
});

// Only the admin can start the game
Lobby_startGame_btn.addEventListener('click', () => {
    let fieldIndex = curr_field_ele.getAttribute('index');
    let xyAmount = Fields[fieldIndex].xyCellAmount; // 5, 10, 15, 20 ?

    // just a little change for better user experience
    Lobby_GameCode_display.style.userSelect = 'none';

    // First, send an emit to the server to inform it about it
    // The server sends a message to all clients in the lobby 
    socket.emit('request_StartGame', [personal_GameData.currGameID, xyAmount, curr_field_ele]);
});

// Leave Game button
leaveGame_btn.addEventListener('click', UserleavesGame);

// User leaves game on leave game btn event
function UserleavesGame() {
    // sound
    playBtn_Audio_2()

    GameField.style.display = 'none';
    gameModeFields_Div.style.display = 'flex';
    // lobbyHeader.style.display = 'flex';

    clearInterval(firstClock);
    clearInterval(secondClock);
    clearInterval(gameCounter);
    stopStatusTextInterval = true;

    // If in online mode
    if (curr_mode == GameMode[2].opponent) {
        // user left the game
        // Many things are happening in server.js on this emit
        socket.emit('user_left_lobby', personal_GameData.role, personal_GameData.currGameID, message => {
            // only if the user that left is not the admin
            if (personal_GameData.role == 'user') {
                // Do things after room was killed
                // The client isn't connected to any server now so the "current id of the room" is null
                personal_GameData.role = 'user';
                personal_GameData.currGameID = null;
                personal_GameData.EnterOnlineGame = false;
            };

            // play music
            PauseMusic();
            CreateMusicBars(audio); // error because javascript is as weird as usual 
        });
    } else {
        // play music
        PauseMusic();
        CreateMusicBars(audio); // error because javascript is as weird as usual
    };
};

// This message goes to all users in a room and gets callen when the admin of the room leaves it
socket.on('killed_room', () => {
    // server
    personal_GameData.role = 'user';
    personal_GameData.currGameID = null;
    personal_GameData.EnterOnlineGame = false;

    // some things
    OnlineGame_Lobby.style.display = 'none';
    SetPlayerNamesPopUp.style.display = 'none';
    DarkLayer.style.display = 'none';
    OnlineGameLobby_alertText.style.display = 'none';
});

// if they were in a game in the admin left the game
// When the admin leaves, he and all other clients are in the lobby again
socket.on('killed_game', () => {
    // leave game field
    GameField.style.display = 'none';
    // enter lobby
    OnlineGame_Lobby.style.display = 'flex';
    gameModeFields_Div.style.display = 'flex';
    DarkLayer.style.display = 'block';
    Lobby_GameCode_display.style.userSelect = 'text';

    // clear timer and stuff to prevent bugs
    clearInterval(firstClock);
    clearInterval(secondClock);
    clearInterval(gameCounter);
    stopStatusTextInterval = true;

    // play music
    PauseMusic();
    CreateMusicBars(audio); // error because javascript is as weird as usual 
});

// Admin created the game and now waits for the second player
socket.on('Admin_Created_And_Joined', message => {
    Lobby_first_player.textContent = `${message[0]} (You) - ${message[1].toUpperCase()}`;
    Lobby_second_player.textContent = 'waiting for second player..';
});

// When the second player wants to join the game, all other players in the room needs to see this
socket.on('SecondPlayer_Joined', message => {
    Lobby_second_player.textContent = `${message[0]} - ${message[1].toUpperCase()}`; // set name of second player for all in the room
});

// When the normal user leaves the game, the admin needs to be informed by that
socket.on('INFORM_user_left_room', () => {
    // The admin sees this after the user left:
    Lobby_second_player.textContent = 'waiting for second player..';
});

// User just left the game but during a match
socket.on('INFORM_user_left_game', () => {
    // The admin sees this after the user left:
    Lobby_second_player.textContent = 'waiting for second player..';

    // clear timer and stuff to prevent bugs
    clearInterval(firstClock);
    clearInterval(secondClock);
    clearInterval(gameCounter);
    stopStatusTextInterval = true;

    // for the admin, he is in the lobby again
    if (personal_GameData.role == 'admin') {
        gameModeFields_Div.style.display = 'flex';
        OnlineGame_Lobby.style.display = 'flex';
        GameField.style.display = 'none';
        DarkLayer.style.display = 'block';
        friendLeftGamePopUp.style.display = 'flex';
        friendLeft_text.textContent = 'Your friend left the game';
        Lobby_GameCode_display.style.userSelect = 'text';

        // play music
        PauseMusic();
        CreateMusicBars(audio); // error because javascript is as weird as usual   
    };
});

// When the ADMIN leaves the game, the other user needs to be informed by that
// This message goes only to the other user
socket.on('INFORM_admin_left_room', () => {
    // server
    personal_GameData.role = 'user';
    personal_GameData.currGameID = null;
    personal_GameData.EnterOnlineGame = false;

    // some things
    OnlineGame_Lobby.style.display = 'none';
    DarkLayer.style.display = 'block';
    GameField.style.display = 'none';
    gameModeFields_Div.style.display = 'flex';
    SetPlayerNamesPopUp.style.display = 'none';
    OnlineGameLobby_alertText.style.display = 'none';
    friendLeftGamePopUp.style.display = 'flex';
    friendLeft_text.textContent = 'The admin disconnected from the game';

    // clear timer and stuff to prevent bugs
    clearInterval(firstClock);
    clearInterval(secondClock);
    clearInterval(gameCounter);
    stopStatusTextInterval = true;
});

// message to all clients that the game just started
socket.on('StartGame', (RoomData) => { // RoomData
    // simple things
    OnlineGame_Lobby.style.display = 'none';
    DarkLayer.style.display = 'none';

    // clear timer and stuff to prevent bugs
    clearInterval(firstClock);
    clearInterval(secondClock);
    clearInterval(gameCounter);
    stopStatusTextInterval = true;

    // game data
    let FieldIndex = RoomData['0']['game']['fieldIndex'];
    let FieldTitle = RoomData['0']['game']['fieldTitle'];
    let options = RoomData['0']['game']['options'];
    let currInnerGameMode = RoomData['0']['game']['InnerGameMode'];
    let PlayerTimer = RoomData['0']['game']['PlayerTimer'];
    // player data
    let player1 = RoomData['0']['players'][1].name;
    let player2 = RoomData['0']['players'][2].name;
    let player1_icon = RoomData['0']['players'][1].icon;
    let player2_icon = RoomData['0']['players'][2].icon;

    // initialize game
    // curr_field_ele = null;
    curr_innerGameMode = currInnerGameMode;

    initializeGame(curr_field_ele, 'OnlineMode', [FieldIndex, FieldTitle, options, player1, player2, player1_icon, player2_icon, PlayerTimer]);

    // play theme music 
    PauseMusic();
    CreateMusicBars(Fields[FieldIndex].theme_name);
});

// When admin starts game, all clients recieve the global availible options
socket.on('recieveGlobalOptions', message => {
    let Grid = [...cellGrid.children];

    // update old array with modified version
    options = message;

    // Anzahl der Elemente, die schwarz gefärbt werden sollen
    for (let i = 0; i < options.length; i++) {
        let el = options[i];

        if (el == '%%') {
            // Zufälliges Kind-Element auswählen und Hintergrundfarbe auf Schwarz setzen
            Grid[i].style.backgroundColor = "var(--font-color)";
            Grid[i].classList = "cell death-cell";
            Grid[i].removeEventListener('click', cellCicked);
            setTimeout(() => {
                Grid[i].textContent = null;
                el = '';

            }, 100);
        };
    };

    // This just deletes all '%%' from the options array that were used to block the
    // game cells by their index
    socket.emit('BoneyardFinalProcess', personal_GameData.currGameID);
});

// When the blocker combat inner game mode is activated and a player sets his form
// The global blocker combat function sends the result from server.js to all clients
socket.on('blockerCombat_action', Goptions => {
    let Grid = [...cellGrid.children];

    // update old array with modified version
    options = Goptions;

    for (let i = 0; i < options.length; i++) {
        let el = options[i];

        // update Grid
        if (Grid[i].classList.length <= 1 && el == '%%') {
            Grid[i].textContent = null;
            Grid[i].classList = "cell death-cell";
            Grid[i].style.backgroundColor = "var(--font-color)";
            Grid[i].removeEventListener('click', cellCicked);

            // This just deletes all '%%' from the options array that were used to block the
            // game cells by their index
            socket.emit('BlockerCombatFinalProcess', personal_GameData.currGameID, i);

            break;
        };
    };
});

// carets
Fieldsize_NegativeSwitcher.addEventListener('click', function a() {
    SwitchToSelection(1, -1, Lobby_FieldSize);
});

Fieldsize_PositiveSwitcher.addEventListener('click', function a() {
    SwitchToSelection(1, +1, Lobby_FieldSize);
});

PlayerClock_NegativeSwitcher.addEventListener('click', function a() {
    SwitchToSelection(2, -1, Lobby_PlayerClock);
});

PlayerClock_PositiveSwitcher.addEventListener('click', function a() {
    SwitchToSelection(2, +1, Lobby_PlayerClock);
});

InnerGameMode_NegativeSwitcher.addEventListener('click', function a() {
    SwitchToSelection(3, -1, Lobby_InnerGameMode);
});

InnerGameMode_PositiveSwitcher.addEventListener('click', function a() {
    SwitchToSelection(3, +1, Lobby_InnerGameMode);
});

// The user can switch between the different game data selections through carets
// This function gets triggered by caret click event
// Selection: What game data selection does the user want to change#
// to: Does the user click the right or left caret? Negative value: left (decrease), Positive value: right (increase)
function SwitchToSelection(Selection, to, display) {
    // variables to alter
    let curr_value = display.textContent;
    let curr_directory = LobbyDataSelections[Selection]
    let origin = 0;
    let highest = 0;
    let lowest = 1;
    let SpecificData = '';

    // Check current origin (What data the player already selected)
    // so the value can be increa- or decreased by there
    for (const k in curr_directory) {
        if (Object.hasOwnProperty.call(curr_directory, k)) {
            const el = curr_directory[k];

            // if curr selected property is equal to property in object, origin is the index of that curr selected property
            if (el == curr_value) {
                origin = parseInt(k);
            };

            // property with highest index
            highest = parseInt(k);
        };
    };

    let newIndex = origin + to

    if (newIndex > highest || newIndex < lowest) return;
    // else
    SpecificData = LobbyDataSelections[Selection][origin + to]

    // send message to server so the data gets updated for all clients
    socket.emit('Lobby_ChangeGameData', personal_GameData.currGameID, display, SpecificData, Selection);
};

// alter game data for every client
// emit comes from the server obviously
socket.on('ChangeGameData', (display, SpecificData, Selection) => {
    // variables
    let fieldIndex = curr_field_ele.getAttribute('index');
    let fieldTitle = curr_field_ele.getAttribute('title');
    let xyCell_Amount = Fields[fieldIndex].xyCellAmount;

    // Check which game data selecetion to change
    switch (Selection) {
        case 1: // Fieldsize
            curr_field_ele = DataFields[SpecificData];

            fieldIndex = curr_field_ele.getAttribute('index');
            fieldTitle = curr_field_ele.getAttribute('title');
            xyCell_Amount = Fields[fieldIndex].xyCellAmount;

            // update lobby game data display
            Lobby_FieldSize.textContent = SpecificData;

            break;

        case 2: // Player clock
            curr_selected_PlayerClock = PlayerClockData[SpecificData];

            // update lobby game data display
            Lobby_PlayerClock.textContent = SpecificData;

            break;

        case 3: // Inner game mode
            curr_innerGameMode = SpecificData

            // update lobby game data display
            Lobby_InnerGameMode.textContent = SpecificData;
            break;
    };

    // update global propertys
    socket.emit('updateGameData', personal_GameData.currGameID, xyCell_Amount, curr_innerGameMode, curr_selected_PlayerClock, fieldIndex, fieldTitle)
});