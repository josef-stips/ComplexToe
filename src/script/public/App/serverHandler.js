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

                Lobby_GameCode_display.textContent = `Game Code: ${message[1]}`;

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
                SetPlayerNamesPopUp.style.height = '60%';
                ConfirmName_Btn.style.height = '15%';
                Player1_IconInput.style.height = '60%';
                Player1_NameInput.style.height = '60%';

                // Aftet this th user only needs to set his user data (name, icon) and clicks confirm
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

// Admin created the game and now waits for the second player
socket.on('Admin_Created_And_Joined', message => {
    Lobby_first_player.textContent = message + ' (You)';
    Lobby_second_player.textContent = 'waiting for second player..';
});

// When the second player wants to join the game, all other players in the room needs to see this
socket.on('SecondPlayer_Joined', message => {
    Lobby_second_player.textContent = message[0]; // set name of second player for all in the room
});

// When the normal user leaves the game, the admin needs to be informed by that
socket.on('INFORM_user_left_room', () => {
    // The admin sees this after the user left:
    Lobby_second_player.textContent = 'waiting for second player..';
});