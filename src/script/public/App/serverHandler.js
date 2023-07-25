// This script is to handle the communication between client and server
// All EventListener on html elements that send and recieve data from the server

// User wants to enter a room by the "enter game button" 
// He first needs to set up ONLY HIS data. not for the game because he wants to enter an existing room
// With this Event he confirms his data and it checks if the room he wrote, exists
// If yes, he joins the room 
EnterCodeName_ConfirmBtn.addEventListener('click', () => {
    if (EnterGameCode_Input.value != null && EnterGameCode_Input.value != '' && EnterGameCode_Input.value != undefined) {
        // server stuff
        console.log(EnterGameCode_Input.value);
        socket.emit('enter_room', EnterGameCode_Input.value, message => {

            // Handle callback message
            if (message == 'room exists') {
                OnlineGameSetUpData = true;

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

            } else if (message == 'room not found') {
                OnlineGameLobby_alertText.style.display = 'block';
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
    let GameCode = Lobby_GameCode_display.textContent;
    socket.emit('user_left_lobby', user, GameCode, message => {
        // Do things after room was killed
        // The client isn't connected to any server so the "current id of the room" is null
        current_gameID = null;
    });

    // some things
    OnlineGame_Lobby.style.display = 'none';
    DarkLayer.style.display = 'none';
    OnlineGameLobby_alertText.style.display = 'none';
});