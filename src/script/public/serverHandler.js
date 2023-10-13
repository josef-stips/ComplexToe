// This script is to handle the communication between client and server
// All EventListener on html elements that send and recieve data from the servers
socket.on('connect', () => {
    console.log('connected!  ' + socket.id);

    closeAlertPopUpBtn.style.display = "block";
    alertPopUp.style.display = "none";
    DarkLayer.style.zIndex = "500";

    if (exploredItems_PopUp.style.display == "flex" || YouFoundItems_PopUp.style.display == "flex" || settingsWindow.style.display == "flex" || SetPlayerNamesPopUp.style.display == "flex" || YourNamePopUp_KI_Mode.style.display == "flex" || GameInfoPopUp.style.display == "flex" || ChooseWinner_popUp.style.display == "flex" || OnlineGame_iniPopUp.style.display == "flex" ||
        OnlineGame_CodeName_PopUp.style.display == "flex" || friendLeftGamePopUp.style.display == "flex" || animatedPopUp.style.display == "block" || userInfoPopUp.style.display == "flex" || UserGivesData_PopUp_name.style.display == "flex" || UserGivesData_PopUp_icon.style.display == "flex" || treasureBoxTimerPopUp.style.display == "flex" ||
        tradeX_PopUp.style.display == "flex" || Chat_PopUp.style.display == "flex" || GiveUpPopUp.style.display == "flex") {
        DarkLayer.style.display = "block";
    } else {
        DarkLayer.style.display = "none";
    };
});

socket.on('disconnect', reason => {
    console.log('disconnected  ' + socket.id);
    console.log('reason: ' + reason);

    DarkLayer.style.display = "block";
    alertPopUp.style.display = "flex";
    AlertText.textContent = "It looks like you're offline! Try to reconnect.";
    closeAlertPopUpBtn.style.display = "none";
    DarkLayer.style.zIndex = "93000";
});

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);

    DarkLayer.style.display = "block";
    alertPopUp.style.display = "flex";
    AlertText.textContent = "It looks like you're offline! Try to reconnect.";
    closeAlertPopUpBtn.style.display = "none";
    DarkLayer.style.zIndex = "93000";
});

// User wants to enter a room by the "enter game button" 
// He first needs to set up ONLY HIS data. not for the game because he wants to enter an existing room
// With this Event he confirms his data and it checks if the room he wrote, exists
// If yes, he joins the room 
EnterCodeName_ConfirmBtn.addEventListener('click', () => {
    EnterCodeName();
});

// execute function enter code name through button click (code )
function EnterCodeName() {
    if (EnterGameCode_Input.value != null && EnterGameCode_Input.value != '' && EnterGameCode_Input.value != undefined) {
        // server stuff
        console.log(EnterGameCode_Input.value.trim());
        socket.emit('TRY_enter_room', EnterGameCode_Input.value.trim(), message => {

            // Handle callback message
            if (message[0] == 'room exists') { // room exists
                personal_GameData.EnterOnlineGame = true;
                personal_GameData.currGameID = message[1]; // the game id
                // if he joined as blocker, his role is blocker, otherwise as user
                console.log(message[5])
                if (message[5] == "thirdplayer") {
                    personal_GameData.role = 'blocker'
                    Player1_IconInput.style.display = "none";
                    document.querySelector(`[for="Player1_IconInput"]`).style.display = "none";

                } else {
                    personal_GameData.role = 'user';
                    lobby_third_player.style.display = "none";
                };

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
                SetGameData_Label[2].style.display = 'none';
                SetPlayerNames_Header.style.height = '8%';
                SetAllowedPatternsWrapper.style.display = 'none';
                UserSetPointsToWinGameInput.style.display = "none";
                Lobby_PointsToWin.contentEditable = "false";
                // SetPlayerNamesPopUp.style.height = '60%';
                ConfirmName_Btn.style.height = '15%';
                Player1_IconInput.style.height = '60%';
                Player1_NameInput.style.height = '60%';
                // so the user can't start the game
                Lobby_startGame_btn.style.display = 'none';
                LobbyUserFooterInfo.style.display = 'block';
                // warn text 
                OnlineGame_NameWarnText[0].style.display = 'none';
                OnlineGame_NameWarnText[1].style.display = 'none';

                // for the user, the switch carets should not be visible
                // cause he has no rights to do so
                SwitchCaret.forEach(caret => {
                    caret.style.display = 'none';
                });

                // so the user sees the current required amount of points to win a game in the lobby
                socket.emit("Request_PointsToWin", personal_GameData.currGameID, cb => {
                    points_to_win = cb;
                    Lobby_PointsToWin.textContent = cb;
                });

                // so the user sees the current allowed win patterns
                socket.emit("Request_AllowedPatterns", personal_GameData.currGameID, cb => { // cb: array with all names of the allowed patterns
                    console.log(cb);
                    // abstract data from the originall array with the names of all win patterns and copy it to own array
                    allowedPatternsFromUser = cb;
                    // blur all patterns
                    setPatternWrapperLobby.forEach(ele => {
                        ele.style.color = "#121518";

                        Array.from(ele.children[0].children).forEach(c => {
                            c.style.color = "#121518";
                        });

                        // unmark every check box
                        ele.children[1].setAttribute("active", "false");
                        ele.children[1].className = "fa-regular fa-square togglePatternBtnLobby";
                    });

                    // display of check boxes equal none so the user can't modify them, only the admin is expected to do it
                    togglePatternBtnLobby.forEach(el => el.style.display = "none");

                    // make availible patterns white
                    cb.forEach(p => {
                        setPatternWrapperLobby.forEach(el => {
                            if (el.classList[0] == p) {
                                Array.from(el.children[0].children).forEach(c => {
                                    c.style.color = "white";
                                });

                                // mark checkbox
                                el.children[1].setAttribute("active", "false");
                                el.children[1].className = "fa-regular fa-square-check togglePatternBtnLobby";
                            };
                        });
                    });
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

        // default data
        Player1_IconInput.style.color = localStorage.getItem('userInfoColor');
        if (localStorage.getItem('userInfoColor') == "var(--font-color)") {
            Player1_IconInput.style.color = "black";
        };

        if (localStorage.getItem('UserName')) {
            Player1_NameInput.value = localStorage.getItem('UserName');
            Player1_IconInput.value = localStorage.getItem('UserIcon');
        };

        if (localStorage.getItem('userInfoClass') != "empty") {
            Player1_IconInput.style.display = 'none';
            SkinInputDisplay.style.display = 'block';

            SkinInputDisplaySkin.className = 'fa-solid fa-' + localStorage.getItem('current_used_skin');

        } else { // player uses normal skin just with a color
            Player1_IconInput.style.display = 'block';
        };

    } else {
        return
    };
};

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

    // Check if player unlocked one of these fields
    locked_25x25();
    locked_30x30();
    locked_40x40();
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

// Only the admin can start the game, only for the admin this button is visible
Lobby_startGame_btn.addEventListener('click', () => {
    let fieldIndex = curr_field_ele.getAttribute('index');
    let xyAmount = Fields[fieldIndex].xyCellAmount; // 5, 10, 15, 20 ?

    // just a little change for better user experience
    Lobby_GameCode_display.style.userSelect = 'none';

    // First, send an emit to the server to inform it about it
    // The server sends a message to all clients in the lobby 
    socket.emit('request_StartGame', [personal_GameData.currGameID, xyAmount, curr_field_ele, allowedPatternsFromUser]);
});

// Leave Game button
leaveGame_btn.addEventListener('click', UserleavesGame);

// User leaves game on leave game btn event
function UserleavesGame(userWonInAdvantureMode, LevelIndex_AdvantureMode) {
    // sound
    playBtn_Audio_2();

    if (personal_GameData.role == 'admin') {
        GameField.style.display = 'none';
        gameModeFields_Div.style.display = 'flex';
        // lobbyHeader.style.display = 'flex';

    } else {

        DarkLayer.style.backgroundColor = 'black';
        DarkLayer.style.display = 'block';
        DarkLayer.style.transition = 'opacity 0.1s ease-in';
        DarkLayer.style.opacity = '0';

        setTimeout(() => {
            DarkLayer.style.opacity = '1';
            setTimeout(() => {
                GameField.style.display = 'none';

                if (!inAdvantureMode) {
                    gameModeFields_Div.style.display = 'flex';
                } else {
                    AdvantureMap.style.display = 'flex';
                };
                // lobbyHeader.style.display = 'flex';
            }, 100);
        }, 100);

        setTimeout(() => {
            DarkLayer.style.opacity = '0';

            setTimeout(() => {
                DarkLayer.style.display = 'none';
                DarkLayer.style.transition = 'none';
                DarkLayer.style.opacity = '1';
                DarkLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.87)';
            }, 400);
        }, 400);
    };

    clearInterval(firstClock);
    clearInterval(secondClock);
    clearInterval(gameCounter);
    clearInterval(eye_attack_interval_global);
    clearInterval(sun_attack_interval_global);
    sun_attack_interval_global = null;
    eye_attack_interval_global = null;
    firstClock = null;
    secondClock = null;
    gameCounter = null;
    stopStatusTextInterval = true;

    // If in online mode
    if (curr_mode == GameMode[2].opponent) {
        // user left the game
        // Many things are happening in server.js on this emit
        socket.emit('user_left_lobby', personal_GameData.role, personal_GameData.currGameID, message => {
            // only if the user that left is not the admin
            if (personal_GameData.role == 'user' || personal_GameData.role == "blocker") {
                // Do things after room was killed
                // The client isn't connected to any server now so the "current id of the room" is null
                personal_GameData.role = 'user';
                personal_GameData.currGameID = null;
                personal_GameData.EnterOnlineGame = false;
            };

            clearInterval(gameCounter);
            gameCounter = null;
            stopStatusTextInterval = true;

            // play music
            PauseMusic();
            if (bossModeIsActive) {
                CreateMusicBars(boss_theme);
            } else {
                CreateMusicBars(audio); // error because javascript is as weird as usual
            };
        });
    } else {
        // bug fix
        setTimeout(() => {
            if (inAdvantureMode) {
                lobbyHeader.style.borderBottom = '3px solid var(--font-color)';
            };

            // user won a level in advanture mode
            console.log(inAdvantureMode, userWonInAdvantureMode, LevelIndex_AdvantureMode)
            if (inAdvantureMode && userWonInAdvantureMode == true) {
                UserWon_AdvantureLevel(LevelIndex_AdvantureMode);
            } else {
                // for floating level item animation in map
                conqueredLevels();
            }
        }, 200);

        // play music
        PauseMusic();
        if (bossModeIsActive) {
            CreateMusicBars(boss_theme);
        } else {
            if (inAdvantureMode) {
                CreateMusicBars(mapSound);
            } else {
                CreateMusicBars(audio); // error because javascript is as weird as usual
            };
        };
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
    // close pop ups if there where any open
    settingsWindow.style.display = "none";
    userInfoPopUp.style.display = "none";
    GameInfoPopUp.style.display = "none";
    GiveUpPopUp.style.display = "none";

    // clear timer and stuff to prevent bugs
    killPlayerClocks();
    clearInterval(gameCounter);
    stopStatusTextInterval = true;

    // play music
    PauseMusic();
    CreateMusicBars(audio); // error because javascript is as weird as usual 
});

// Admin created the game and now waits for the second player
socket.on('Admin_Created_And_Joined', message => {
    console.log(message)
    if (message[1] != 'fontawesome') { // everything's normal
        Lobby_first_player.textContent = `${message[0]} (You) - ${message[1].toUpperCase()}`;
        Lobby_first_player.style.color = localStorage.getItem('userInfoColor');

        if (document.querySelector('.Temporary_IconSpan')) {
            document.querySelector('.Temporary_IconSpan').remove();
        };

    } else {
        let span = document.createElement('span');
        span.className = message[2]; // example: "fa-solid fa-chess-rook"
        span.classList.add("Temporary_IconSpan");
        Lobby_first_player.style.color = "white";

        Lobby_first_player.textContent = `${message[0]} (You) - `;
        Lobby_first_player.appendChild(span);
    };

    Lobby_second_player.textContent = 'waiting for second player..';

    // if a third player can play
    if (message[3]) {
        lobby_third_player.style.display = 'block';
        lobby_third_player.textContent = 'waiting for the blocker..';

    } else {
        lobby_third_player.style.display = 'none';
    };
});

// When the second player wants to join the game, all other players in the room needs to see this
socket.on('SecondPlayer_Joined', message => {
    console.log(message);
    // when it is not "empty" the player uses an advanced skin
    if (message[2] != "empty") {
        // create span element for second player where the advanced skin can be displayed
        let span = document.createElement('span');
        span.className = message[2]; // example: "fa-solid fa-chess-rook"
        span.classList.add("Temporary_IconSpan2");
        Lobby_second_player.style.color = "white";

        // set name of second player for all in the room
        personal_GameData.role == "user" ? Lobby_second_player.textContent = Lobby_second_player.textContent = `${message[0]} (You) - ` : Lobby_second_player.textContent = `${message[0]} - `;

        Lobby_second_player.appendChild(span);

    } else { // uses normal skin with color or just white color
        personal_GameData.role == "user" ? Lobby_second_player.textContent = `${message[0]} (You) - ${message[1].toUpperCase()}` : Lobby_second_player.textContent = `${message[0]} - ${message[1].toUpperCase()}`;
        // set name of second player for all in the room    
        Lobby_second_player.style.color = message[3];

        if (document.querySelector('.Temporary_IconSpan2')) {
            document.querySelector('.Temporary_IconSpan2').remove();
        };
    };

    // if the request comes not from the third player or third player name is not defined
    if (message[5] == undefined || message[5] == '') {
        // display things for third player if required
        if (message[4]) {
            lobby_third_player.style.display = "block";
            lobby_third_player.textContent = "waiting for the blocker..";
        } else {
            lobby_third_player.style.display = "none";
        };
    };

    // if the second player rejoins and the third player is still there
    if (message[5] != "" && message[5] != 'thirdPlayer_RequestsData') {
        lobby_third_player.style.display = "block";
        personal_GameData.role == "blocker" ? lobby_third_player.textContent = `Blocker: ${message[5]} (You)` : lobby_third_player.textContent = `Blocker: ${message[5]}`;
    };
});

// third player joins
socket.on('ThirdPlayer_Joined', message => {
    console.log(message);

    // display things for third player if required
    personal_GameData.role == "blocker" ? lobby_third_player.textContent = `Blocker: ${message[0]} (You)` : lobby_third_player.textContent = `Blocker: ${message[0]}`;

    socket.emit('thirdplayer_requests_SecondPlayerData', [parseInt(personal_GameData.currGameID)]);
});

// When the normal user leaves the game, the other player need to be informed by that
socket.on('INFORM_user_left_room', () => {
    // The other players see this after the user left:
    Lobby_second_player.textContent = 'waiting for second player..';
    Lobby_second_player.style.color = "white";
});

// When the third player (blocker) leaves the game, the other player need to be informed by that
socket.on('INFORM_blocker_left_room', () => {
    // The other players see this after the user left:
    lobby_third_player.textContent = 'waiting for blocker..';
});

// User just left the game but during a match
socket.on('INFORM_user_left_game', () => {
    // The admin sees this after the user left:
    Lobby_second_player.textContent = 'waiting for second player..';
    Lobby_second_player.style.color = "white";

    // close pop ups if there where any open
    settingsWindow.style.display = "none";
    userInfoPopUp.style.display = "none";
    GameInfoPopUp.style.display = "none";
    GiveUpPopUp.style.display = "none";

    // clear timer and stuff to prevent bugs
    clearInterval(firstClock);
    clearInterval(secondClock);
    clearInterval(gameCounter);
    stopStatusTextInterval = true;

    // for the admin, he is in the lobby again
    if (personal_GameData.role == 'admin' || personal_GameData.role == "blocker") {
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

// The third player (blocker) left the game but during a match
socket.on('INFORM_blocker_left_game', () => {
    // The admin sees this after the user left:
    lobby_third_player.textContent = 'waiting for blocker..';

    // clear timer and stuff to prevent bugs
    clearInterval(firstClock);
    clearInterval(secondClock);
    clearInterval(gameCounter);
    stopStatusTextInterval = true;

    // for the admin, he is in the lobby again
    if (personal_GameData.role == 'admin' || personal_GameData.role == 'user') {
        gameModeFields_Div.style.display = 'flex';
        OnlineGame_Lobby.style.display = 'flex';
        GameField.style.display = 'none';
        DarkLayer.style.display = 'block';
        friendLeftGamePopUp.style.display = 'flex';
        friendLeft_text.textContent = 'The blocker left the game';
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
    clearInterval(gameCounter);
    stopStatusTextInterval = true;
});

// message to all clients that the game just started
socket.on('StartGame', (RoomData) => { // RoomData
    // simple things
    OnlineGame_Lobby.style.display = 'none';
    DarkLayer.style.display = 'none';

    // better user experience, you can call them bug fixes:
    ChatMain.textContent = null;
    openedChat = false;
    recievedUnseenMessages = 0;
    if (document.querySelector(".notification-icon")) {
        document.querySelector(".notification-icon").remove();
    };

    // clear timer and stuff to prevent bugs
    killPlayerClocks();
    clearInterval(gameCounter);
    stopStatusTextInterval = true;

    // many data about the room from the database
    // game data
    let FieldIndex = RoomData[0].fieldIndex;
    let FieldTitle = RoomData[0].fieldTitle;
    let options = JSON.parse(RoomData[0].Fieldoptions);
    let currInnerGameMode = RoomData[0].InnerGameMode;
    let PlayerTimer = RoomData[0].PlayerTimer;
    // player data
    let player1 = RoomData[0].player1_name;
    let player2 = RoomData[0].player2_name;
    let player1_icon = RoomData[0].player1_icon;
    let player2_icon = RoomData[0].player2_icon;
    let player3_name = RoomData[0].player3_name;

    let player1_advancedIcon = RoomData[0].player1_advancedIcon;
    let player2_advancedIcon = RoomData[0].player2_advancedIcon;
    let player1_SkinColor = RoomData[0].player1_SkinColor;
    let player2_SkinColor = RoomData[0].player2_SkinColor;

    // initialize game
    curr_innerGameMode = currInnerGameMode;
    // allowed patterns
    let allowed_patterns = JSON.parse(RoomData[0].win_patterns); // array
    allowedPatternsFromUser = allowed_patterns; // make it global for single user
    // required points to win a game
    let required_points_to_win = parseInt(Lobby_PointsToWin.textContent);
    console.log(required_points_to_win);

    // initialize game with given data
    initializeGame(curr_field_ele, 'OnlineMode', [FieldIndex, FieldTitle, options, player1, player2, player1_icon, player2_icon,
        PlayerTimer, player1_advancedIcon, player2_advancedIcon, player1_SkinColor, player2_SkinColor, player3_name
    ], allowed_patterns, undefined, required_points_to_win);

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

// InnerGameMode_NegativeSwitcher.addEventListener('click', function a() {
//     if (curr_innerGameMode != "Blocker Combat") {
//         SwitchToSelection(3, -1, Lobby_InnerGameMode);

//     } else {
//         InnerGameMode_NegativeSwitcher.style.transition = "none";
//         InnerGameMode_NegativeSwitcher.style.color = "red";

//         setTimeout(() => {
//             InnerGameMode_NegativeSwitcher.style.transition = "color 0.05s ease-in-out";
//             InnerGameMode_NegativeSwitcher.style.color = "white";
//         }, 50);
//     };
// });

// InnerGameMode_PositiveSwitcher.addEventListener('click', function a() {
//     if (curr_innerGameMode != "Blocker Combat") {
//         SwitchToSelection(3, +1, Lobby_InnerGameMode);

//     } else {
//         InnerGameMode_PositiveSwitcher.style.transition = "none";
//         InnerGameMode_PositiveSwitcher.style.color = "red";

//         setTimeout(() => {
//             InnerGameMode_PositiveSwitcher.style.transition = "color 0.05s ease-in-out";
//             InnerGameMode_PositiveSwitcher.style.color = "white";
//         }, 50);
//     };
// });

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
    var user_unlocked_Advanced_fields_online = true;

    // Check which game data selecetion to change
    switch (Selection) {
        case 1: // Fieldsize
            if (DataFields[SpecificData] == undefined) {
                DataFields['25x25'] = document.querySelector('#twentyfivextwentyfive');
                DataFields['30x30'] = document.querySelector('#thirtyxthirty');
                DataFields['40x40'] = document.querySelector('#fortyxforty');
                user_unlocked_Advanced_fields_online = false;
            };

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

    console.log(personal_GameData.currGameID, xyCell_Amount, curr_innerGameMode, curr_selected_PlayerClock, fieldIndex, fieldTitle);

    if (personal_GameData.role == "admin") // update global propertys !only admin can do it to prevent stupid ass bugs dude
        socket.emit('updateGameData', personal_GameData.currGameID, xyCell_Amount, curr_innerGameMode, curr_selected_PlayerClock, fieldIndex, fieldTitle);

    // delete advanced data fields again if generated
    if (!user_unlocked_Advanced_fields_online) {
        delete DataFields['25x25'];
        delete DataFields['30x30'];
        delete DataFields['40x40'];
    };
});

// admin is in lobby and changes the required amount of points to win a game
Lobby_PointsToWin.addEventListener('keyup', (e) => {
    if (e.code === "Backspace" && Lobby_PointsToWin.textContent == "") {
        e.preventDefault();
        return;
    };

    if (e.code === "Space") {
        e.preventDefault();
    };

    socket.emit("AdminChangesPointsToWin_InLobby", personal_GameData.currGameID, Lobby_PointsToWin.textContent);
});

// admin changed the required amount of points in lobby: update value for all in the lobby
socket.on("AdminChanged_PointsToWin", value => {
    points_to_win = value;
    Lobby_PointsToWin.textContent = value;
});

// check if the player already was in the game once
socket.on('CheckIfPlayerAlreadyExists', () => {
    if (localStorage.getItem('PlayerOpenedThisGameAtleastOnceInHisLife')) {
        socket.emit("PlayerAlreadyExists", localStorage.getItem("PlayerID"), localStorage.getItem('treasureIsAvailible'));

    } else {
        socket.emit("PlayerNotExisted");
        localStorage.setItem('PlayerOpenedThisGameAtleastOnceInHisLife', true);
    };
});

// server generates random player id if he is the first time in this game
socket.on("RandomPlayerID_generated", id => {
    console.log(id)
    localStorage.setItem("PlayerID", id);
});

// online game chat button
OnlineChat_btn.addEventListener('click', () => {
    Chat_PopUp.style.display = "flex";
    DarkLayer.style.display = "block";

    openedChat = true;
    recievedUnseenMessages = 0;
    if (document.querySelector(".notification-icon")) {
        document.querySelector(".notification-icon").remove();
    };

    // Name of other player
    personal_GameData.role == "admin" ? ChatTitle.textContent = `A chat between you and ${PlayerData[2].PlayerName}` : ChatTitle.textContent = `A chat between you and ${PlayerData[1].PlayerName}`;
});

// close chat pop up
closeChat_btn.addEventListener('click', () => {
    Chat_PopUp.style.display = "none";
    DarkLayer.style.display = "none";

    openedChat = false;
});

// send message on enter
ChatMessage.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        sendMessageEvent();
    };
});

// user wants to send a message
Submit_chatMessageBtn.addEventListener('click', () => {
    sendMessageEvent();
});

// user wants to send message on event
function sendMessageEvent() {
    if (ChatMessage.value != "") {
        sendTextMessage(ChatMessage.value);
        ChatMessage.value = null;
    };
};

// create text message on submit button
function sendTextMessage(text) {
    // send message to server, server sends it to the other players
    socket.emit("sendMessage", text, personalname, personal_GameData.currGameID); // message and name 
};

// recieve message
socket.on("recieveMessage", (message, from) => {
    let span = document.createElement('span');
    let p = document.createElement('p');
    let span2 = document.createElement('span');
    let div = document.createElement('div');
    div.className = "messageWrapper recievedMessage";
    span2.className = "messageFrom";
    personalname == from ? span2.textContent = `${from} (You)` : span2.textContent = from;
    p.textContent = message;
    p.className = "messageText";
    span.className = "message";

    // add message to main field of pop up
    span.appendChild(p);
    div.appendChild(span2);
    div.appendChild(span);
    ChatMain.appendChild(div);

    // Go to the very bottom of the chat to see message 
    ChatMain.scrollTop = ChatMain.scrollHeight;

    !openedChat ? createNotificationIcon() : console.log("lol");
});

// create an icon with a number that shows how many messages the user recieved from the other user that he has not seen yet
function createNotificationIcon() {
    if (document.querySelector(".notification-icon")) {
        document.querySelector(".notification-icon").textContent = recievedUnseenMessages;
    } else {
        recievedUnseenMessages++;
        let div = document.createElement('div');
        div.className = "notification-icon";
        div.textContent = recievedUnseenMessages;
        OnlineChat_btn.appendChild(div);
    };
};