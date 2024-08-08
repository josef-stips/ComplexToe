// Enter Game
function EnterGame() {
    NxN_field.forEach(field => {
        field.addEventListener('click', f => {
            // different functions for different fields
            if (f.target.getAttribute('field') == "25x25" && localStorage.getItem('onlineMatches-won') < 5) {
                click_locked_25();

            } else if (f.target.getAttribute('field') == "30x30" && localStorage.getItem('onlineMatches-won') < 10) {
                click_locked_30();

            } else if (f.target.getAttribute('field') == "40x40" && localStorage.getItem('onlineMatches-won') < 30) {
                click_locked_40();

            } else {
                Click_NxN(f);
            };
        });
    });
};
EnterGame();

function click_locked_25() {
    locked_25x25();
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    AlertText.textContent = "You need to win 5 online matches to unlock this field";
};

function click_locked_30() {
    locked_30x30();
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    AlertText.textContent = "You need to win 10 online matches to unlock this field";
};

function click_locked_40() {
    locked_40x40();
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    AlertText.textContent = "You need to win 30 online matches to unlock this field";
};

// User click a NxN field button
function Click_NxN(f) {
    let target = f.target;

    // if user selected random field
    if (target.id == "random_Field") {
        // generate random number and choose the random choosed field by its index
        const randomNumber = Math.floor(Math.random() * parseInt(Object.keys(DataFields).length)) + 1;

        // Switch-Statement zur Verarbeitung der generierten Zahl
        switch (randomNumber) {
            case 1:
                target = DataFields['5x5'];
                break;
            case 2:
                target = DataFields['10x10'];
                break;
            case 3:
                target = DataFields['15x15'];
                break;
            case 4:
                target = DataFields['20x20'];
                break;
            case 5:
                target = DataFields['25x25'];
                break;
            case 6:
                target = DataFields['30x30'];
                break;
            case 7:
                target = DataFields['40x40'];
                break;
        };
    };

    UserClicksNxNDefaultSettings();

    // reset previously made changes by the user
    resetUserChoosedAllowedPatterns();

    if (curr_mode == GameMode[3].opponent) { // Computer Friend Mode
        UserClicksOfflineModeCard(target);
    };

    if (curr_mode == GameMode[1].opponent) { // KI Mode

        DisplayPopUp_PopAnimation(YourNamePopUp_KI_Mode, "flex", true);
        YourName_Input_KI_mode.value = "";
        Your_IconInput.value = "";
        Your_IconInput.style.color = localStorage.getItem('userInfoColor');
        // other important data
        curr_name1 = null;
        curr_name2 = null;
        curr_field_ele = target;

        // default data
        if (localStorage.getItem('UserName')) {
            YourName_Input_KI_mode.value = localStorage.getItem('UserName');
            Your_IconInput.style.color = localStorage.getItem('userInfoColor');
        };
    };

    if (curr_mode == GameMode[2].opponent) { // Online Game mode

        // console.log(target, target.getAttribute("field"))

        if (target.getAttribute('field') == "25x25" && localStorage.getItem('onlineMatches-won') >= 5 ||
            target.getAttribute('field') == "30x30" && localStorage.getItem('onlineMatches-won') >= 10 ||
            target.getAttribute('field') == "40x40" && localStorage.getItem('onlineMatches-won') >= 30 ||
            target.getAttribute('field') == "20x20" || target.getAttribute('field') == "15x15" || target.getAttribute('field') == "10x10" ||
            target.getAttribute('field') == "5x5" && localStorage.getItem('onlineMatches-won') >= -1) {

            curr_field_ele = target;

            InitGameDataForPopUp();
        };
    };
};

const InitGameDataForPopUp = (DisplayIniPopUp) => {
    // Initialize Inputs from pop up

    // (DisplayIniPopUp == undefined) ? DisplayPopUp_PopAnimation(OnlineGame_iniPopUp, "flex", true): DisplayPopUp_PopAnimation(SetPlayerNamesPopUp, "flex", true); legacy code
    DisplayPopUp_PopAnimation(SetPlayerNamesPopUp, "flex", true);

    Player2_NameInput.style.display = 'none';
    Player2_IconInput.style.display = 'none';
    Player1_NameInput.style.height = '50%';
    Player1_IconInput.style.height = '50%';

    // default data
    if (localStorage.getItem('UserName')) {
        Player1_NameInput.value = localStorage.getItem('UserName');
        Player1_IconInput.value = localStorage.getItem('UserIcon');
    };

    // console.log(curr_field_ele);

    // User shouldn't play 40x40 field with 5 second player clock
    if (curr_field_ele.getAttribute("field") == "40x40") {
        document.querySelector("#SetClockListItem-5sec").style.display = "none";
        delete PlayerClockData["5 seconds"];

        LobbyDataSelections = {
            "1": {
                "1": "5x5",
                "2": "10x10",
                "3": "15x15",
                "4": "20x20",
                "5": "25x25",
                "6": "30x30",
                "7": "40x40"
            },
            "2": {
                "1": "15 seconds",
                "2": "30 seconds",
                "3": "50 seconds",
                "4": "70 seconds"
            },
            "3": {
                "1": "Boneyard",
                "2": "Blocker Combat",
                "3": "Free Fight"
            }
        }

    } else {
        document.querySelector("#SetClockListItem-5sec").style.display = "block";
        PlayerClockData["5 seconds"] = 5;
        LobbyDataSelections["2"]["1"] = "5 seconds";

        LobbyDataSelections = {
            "1": {
                "1": "5x5",
                "2": "10x10",
                "3": "15x15",
                "4": "20x20",
                "5": "25x25",
                "6": "30x30",
                "7": "40x40"
            },
            "2": {
                "1": "5 seconds",
                "2": "15 seconds",
                "3": "30 seconds",
                "4": "50 seconds",
                "5": "70 seconds"
            },
            "3": {
                "1": "Boneyard",
                "2": "Blocker Combat",
                "3": "Free Fight"
            }
        }
    };
};

const UserClicksNxNDefaultSettings = (readonly) => {
    killAllDrawnCells = false;

    Player1_IconInput.style.color = localStorage.getItem('userInfoColor');
    Player1_IconInput.style.display = "block";

    // warn text for online game mode
    OnlineGame_NameWarnText[0].style.display = 'none';
    OnlineGame_NameWarnText[1].style.display = 'none';
    BlockerCombat_OnlineGameWarnText.style.display = "none";

    // for skins in online mode
    SkinInputDisplay.style.display = 'none';

    if (readonly) {
        SetAllowedPatternsWrapper.style.display = 'none';
        // SetGameModeList.style.display = 'none';
        // SetGameData_Label[2].style.display = "none";
        // document.querySelector(`[for="Player1_IconInput"]`).style.display = "none";
        document.querySelector(`[for="Player1_ClockInput"]`).style.display = "none";
        document.querySelector(".SetGameData_Label").style.display = "none";
        // document.querySelector(".SetPlayerNames-IconInput").style.marginTop = "2em";
        document.querySelector(".SetPlayerNames-InputArea").style.gap = "1.3em";
        UserSetPointsToWinGameInput.style.display = "none";
        SetClockList.style.display = 'none';

    } else if (readonly == undefined) {
        SetAllowedPatternsWrapper.style.display = 'flex';
        SetGameModeList.style.display = 'flex';
        SetGameData_Label[2].style.display = "block";
        document.querySelector(`[for="Player1_IconInput"]`).style.display = "block";
        document.querySelector(`[for="Player1_ClockInput"]`).style.display = "block";
        document.querySelector(".SetGameData_Label").style.display = "block";
        document.querySelector(".SetPlayerNames-IconInput").style.marginTop = "0";
        document.querySelector(".SetPlayerNames-InputArea").style.gap = "0.9em";
        UserSetPointsToWinGameInput.style.display = "block";
        SetClockList.style.display = 'flex';
        SetPlayerNames_AdditionalSettings.style.display = "flex";
    };
};

const UserClicksOfflineModeCard = (target) => {
    DisplayPopUp_PopAnimation(SetPlayerNamesPopUp, "flex", true);
    Player2_NameInput.style.display = 'block';
    Player2_IconInput.style.display = 'block';
    Player1_IconInput.style.display = 'block';

    curr_name1 = null;
    curr_name2 = null;
    curr_field_ele = target;

    // Initialize Inputs from pop up
    DisableGameModeItems();
    DisablePlayerClockItems();
    Player1_NameInput.value = "";
    Player2_NameInput.value = "";
    Player1_IconInput.value = "X";
    Player2_IconInput.value = "O";

    // default data
    Player1_IconInput.style.color = localStorage.getItem('userInfoColor');

    if (localStorage.getItem('UserName')) {
        Player1_NameInput.value = localStorage.getItem('UserName');
        Player1_IconInput.value = localStorage.getItem('UserIcon');
    };

    if (localStorage.getItem('userInfoClass') != "empty") {
        Player1_IconInput.style.display = 'none';
        SkinInputDisplay.style.display = 'block';

        SkinInputDisplaySkin.className = 'fa-solid fa-' + localStorage.getItem('current_used_skin');
    };
};

// When the user unlocks a specific field, the click event for this field needs to be unlocked
function Click_single_NxN(e) {
    SetClockList.style.display = 'flex';
    SetGameModeList.style.display = 'flex';
    Player1_IconInput.style.color = localStorage.getItem('userInfoColor');

    // warn text for online game mode
    OnlineGame_NameWarnText[0].style.display = 'none';
    OnlineGame_NameWarnText[0].style.display = 'none';

    // for skins in online mode
    SkinInputDisplay.style.display = 'none';

    if (curr_mode == GameMode[2].opponent) { // Online Game mode

        curr_field_ele = e.target;

        // Initialize Inputs from pop up
        DarkLayer.style.display = 'block';
        DisplayPopUp_PopAnimation(SetPlayerNamesPopUp, "flex", true);
        Player2_NameInput.style.display = 'none';
        Player2_IconInput.style.display = 'none';
        Player1_NameInput.style.height = '50%';
        Player1_IconInput.style.height = '50%';
    };

    if (curr_mode == GameMode[3].opponent) { // Computer Friend Mode

        SetPlayerNamesPopUp.style.display = 'flex';
        DarkLayer.style.display = 'block';
        Player2_NameInput.style.display = 'block';
        Player2_IconInput.style.display = 'block';
        Player1_IconInput.style.display = 'block';

        curr_name1 = null;
        curr_name2 = null;
        curr_field_ele = e.target;

        // Initialize Inputs from pop up
        DisableGameModeItems();
        DisablePlayerClockItems();
        Player1_NameInput.value = "";
        Player2_NameInput.value = "";
        Player1_IconInput.value = "X";
        Player2_IconInput.value = "O";
    };

    // default data
    if (localStorage.getItem('UserName')) {
        Player1_NameInput.value = localStorage.getItem('UserName');
        Player1_IconInput.value = localStorage.getItem('UserIcon');
    };
};

// From the Confirm Button of the "create game button" in the SetUpGameData Window
// User set all the game data for the game and his own player data. The confirm button calls this function
// Room gets created and the creater gets joined in "index.js"
function UserCreateRoom(readOnlyLevel, Data1, Data2, UserName, thirdplayerRequired, PointsToWinGame, patterns) {
    let Check = SetGameData_CheckConfirm();

    // if Player1 Namefield and Player2 Namefield isn't empty etc., initialize Game
    if (Player1_NameInput.value != "" &&
        Player1_IconInput.value != "" &&
        Check[0] == true && Check[1] == true && !PlayingInCreatedLevel || PlayingInCreatedLevel &&
        Player1_NameInput.value != "" && Player1_IconInput.value != "" && Check[1] == true && creative_level_instance.Settings["playertimer"][creative_level_instance.selectedLevel[3]]) {
        // server
        let fieldIndex = curr_field_ele.getAttribute('index');
        let fieldTitle = curr_field_ele.getAttribute('title');

        if (fieldIndex == null || fieldTitle == null) {
            CloseSetGameDataPopUp();

            AlertText.textContent = "Try again..";
            alertPopUp.style.display = "flex";
            DarkLayer.style.display = "block";
            return;
        };

        try {
            var xyCell_Amount = Fields[fieldIndex].xyCellAmount;

        } catch (error) {
            CloseSetGameDataPopUp();

            AlertText.textContent = "Try again..";
            alertPopUp.style.display = "flex";
            DarkLayer.style.display = "block";
            return;
        };

        if (localStorage.getItem('userInfoClass') == "empty") { // user doesn't use an advanced skin => everything's normal
            curr_form1 = Player1_IconInput.value.toUpperCase();

        } else { // user uses an advanced skin => change things
            curr_form1 = "fontawesome"; // later it will check if it has this value and do the required things
        };

        // costum x and y
        let costumX;
        let costumY;

        let costumPatterns;
        let costumIcon;

        console.log(PointsToWinGame);

        // set data: either extern data or intern data
        if (Data1) Check[2] = Data1;
        if (Data2) Check[3] = Data2;
        if (UserName) Player1_NameInput.value = UserName;
        if (thirdplayerRequired) thirdPlayer_required = thirdplayerRequired;
        if (PointsToWinGame) UserSetPointsToWinGameInput.value = PointsToWinGame;
        if (patterns) allowedPatternsFromUser = patterns;

        if (PlayingInCreatedLevel) {
            Check[2] = creative_level_instance.Settings["playertimer"][creative_level_instance.selectedLevel[3]];

            // set up x and y coordinates. case: default field is choosen
            if (creative_level_instance.selectedLevel[16] == {}) {
                costumX = creative_level_instance.Settings.cellgrid[creative_level_instance.selectedLevel[7]];
                costumY = creative_level_instance.Settings.cellgrid[creative_level_instance.selectedLevel[7]];

            } else {
                costumX = creative_level_instance.selectedLevel[16]["x"];
                costumY = creative_level_instance.selectedLevel[16]["y"];
            };

            if (costumX == undefined || costumY == undefined) {
                costumX = xyCell_Amount;
                costumY = xyCell_Amount;
            };

            costumPatterns = creative_level_instance.selectedLevel[15];

            allowedPatternsFromUser = creative_level_instance.selectedLevel[6];

            costumIcon = creative_level_instance.Settings.levelicon[creative_level_instance.selectedLevel[4]];

            fieldTitle = creative_level_instance.selectedLevel[8];

            UserSetPointsToWinGameInput.value = creative_level_instance.selectedLevel[2];

            if (creative_level_instance.selectedLevel[5] != 0) {
                curr_music_name = document.querySelector(`[src="${creative_level_instance.Settings["bgmusic"][creative_level_instance.selectedLevel[5]]}"]`).id;

            };
        } else {
            curr_music_name = Fields[fieldIndex].theme_name.id;
        };

        console.log(UserSetPointsToWinGameInput.value, PointsToWinGame, costumX, costumY, costumIcon, curr_music_name);

        // GameData: Sends PlayerClock, InnerGameMode and xyCellAmount ; PlayerData: sends player name and icon => requests room id 
        socket.emit('create_room', [Check[2], Check[3], xyCell_Amount, Player1_NameInput.value, curr_form1, fieldIndex, fieldTitle, localStorage.getItem('userInfoClass'),
            localStorage.getItem('userInfoColor'), thirdPlayer_required, UserSetPointsToWinGameInput.value, allowedPatternsFromUser, [costumX, costumY], costumPatterns, costumIcon, killAllDrawnCells,
            Number(localStorage.getItem("PlayerID")), Number(localStorage.getItem('ELO')), curr_music_name
        ], message => {

            Lobby_GameCode_display.textContent = `Game Code: ${message}`;
            Lobby_GameCode_display.style.userSelect = 'text';

            // set up personal_GameData
            personal_GameData.currGameID = message;
            personal_GameData.EnterOnlineGame = false;
            personal_GameData.role = 'admin';

            Lobby_startGame_btn.style.display = 'block';
            LobbyUserFooterInfo.style.display = 'none';
        });

        // general stuff
        DisplayPopUp_PopAnimation(OnlineGame_Lobby, "flex", false);
        SetPlayerNamesPopUp.style.display = 'none';
        Lobby_PointsToWin.contentEditable = "true";
        DarkLayer.style.display = "none";

        // initialize game with the right values
        curr_name1 = Player1_NameInput.value;
        curr_name2 = Player2_NameInput.value;
        curr_form2 = Player2_IconInput.value.toUpperCase();
        curr_innerGameMode = Check[3]; // Inner Game
        curr_selected_PlayerClock = Check[2]; // Player Clock

        // initialize lobby display
        Lobby_InnerGameMode.textContent = `${Check[3]}`;
        Lobby_PlayerClock.textContent = `${Check[2]} seconds`;
        Lobby_FieldSize.textContent = !PlayingInCreatedLevel ? `${xyCell_Amount}x${xyCell_Amount}` : `${costumX}x${costumY}`;
        Lobby_PointsToWin.textContent = UserSetPointsToWinGameInput.value;

        // initialize allowed patterns in lobby for the creator: admin
        setPatternWrapperLobby.forEach(ele => {
            ele.style.color = "#121518";

            Array.from(ele.children[0].children).forEach(c => {
                c.style.color = "#121518";
            });

            ele.children[1].setAttribute("active", "false");
            ele.children[1].className = "fa-regular fa-square togglePatternBtnLobby";
        });

        allowedPatternsFromUser.forEach(p => {
            setPatternWrapperLobby.forEach(el => {
                if (el.classList[0] == p) {
                    el.style.color = "white";

                    el.children[1].setAttribute("active", "true");
                    el.children[1].className = "fa-regular fa-square-check togglePatternBtnLobby";

                    Array.from(el.children[0].children).forEach(c => {
                        c.style.color = "white";
                    });
                };
            });
        });

        allow_players_watch_el.style.display = "flex";

        // admin and no player is allowed to change the data from the level
        if (readOnlyLevel) {
            SwitchCaret.forEach(caret => {
                caret.style.display = 'none';
            });
            togglePatternBtnLobby.forEach(el => el.style.display = "none");
            Lobby_PointsToWin.contentEditable = false;

        } else {
            togglePatternBtnLobby.forEach(el => el.style.display = "flex");
            SwitchCaret.forEach(caret => {
                caret.style.display = 'flex';
            });
        };

    } else {
        return;
    };
};

// set player data confirm button
SetPlayerName_ConfirmButton.addEventListener('click', () => {
    SetPlayerData_ConfirmEvent();
});

// user tries to ENTER a game in online mode
const UserTriesToEnterOnlineGame = () => {
    // If user entered his name and which form he wants to use in the game
    if (Player1_IconInput.value != "" && Player1_NameInput.value != "" && personal_GameData.role == "user" ||
        // or second condition: user joins as blocker so he only needs to pass his name
        Player1_NameInput.value != "" && personal_GameData.role == "blocker") {
        // console.log(personal_GameData.role)

        socket.emit('CONFIRM_enter_room', [personal_GameData.currGameID, Player1_NameInput.value.trim(), Player1_IconInput.value.trim(),
            localStorage.getItem('userInfoClass'), localStorage.getItem('userInfoColor'), personal_GameData.role, Number(localStorage.getItem("PlayerID")), Number(localStorage.getItem('ELO'))
        ], (m) => {
            // If user name is equal to admins name
            if (m == 'Choose a different name!') {
                OnlineGame_NameWarnText[1].style.display = 'none';
                OnlineGame_NameWarnText[0].style.display = 'block';
            };

            // If user icon is equal to admins icon
            if (m == 'Choose a different icon!') {
                OnlineGame_NameWarnText[0].style.display = 'none';
                OnlineGame_NameWarnText[1].style.display = 'block';
            };

            // user can finally enters the online game lobby
            if (m != 'Choose a different name!' && m != 'Choose a different icon!') {
                UserEntersOnlineGame(m);
            };
        });
    };
};

// User enters online game
const UserEntersOnlineGame = (m) => {
    // initialize game with the right values
    curr_name1 = Player1_NameInput.value;
    curr_form1 = Player1_IconInput.value.toUpperCase();

    // set name of first player
    Lobby_XPlayerNameDisplay[1].textContent = `${m[1]}`;

    // m[2] icon of first player
    // This code block is just so the second player who joins the lobby sees the icon of the first player in the right way
    if (m[2] == "fontawesome") {
        // remove previous advanced icon if there was one
        if (document.querySelector('.Temporary_IconSpan1')) document.querySelector('.Temporary_IconSpan1').remove();

        // reset text of first player icon if there was one
        Lobby_first_player.textContent = null;

        // admin uses an advanced skin => create span element which displays advanced icon. You can just delete this icon later (like in the else code below)
        let span = document.createElement('span');
        span.className = m[5]; // example: "fa-solid fa-chess-rook"
        span.classList.add("Temporary_IconSpan1");
        Lobby_first_player.style.color = "white";

        Lobby_first_player.appendChild(span);

    } else { // admin uses a normal or color skin, everything's alright
        Lobby_first_player.textContent = `${m[2].toUpperCase()}`; // set icon of first player
        Lobby_first_player.style.color = m[6]; // color of first player's skin

        // remove advanced icon if there was one
        if (document.querySelector('.Temporary_IconSpan1')) document.querySelector('.Temporary_IconSpan1').remove();
    };

    // bug fixes
    OnlineGame_NameWarnText[0].style.display = 'none';
    OnlineGame_NameWarnText[0].style.display = 'none';

    // general stuff
    OnlineGame_Lobby.style.display = 'flex';
    SetPlayerNamesPopUp.style.display = 'none';
    DarkLayer.style.display = "none";
};

// user tries to start the game
function SetPlayerData_ConfirmEvent() {
    if (curr_mode == GameMode[2].opponent) { // online mode
        // if user wants to enter an online game
        if (personal_GameData.EnterOnlineGame) {
            // console.log(personal_GameData.EnterOnlineGame)
            UserTriesToEnterOnlineGame();

        } else { // user wants to create an online game
            if (PlayingInCreatedLevel) {
                UserCreateRoom(true);
            } else {
                UserCreateRoom();
            };
        };

    } else { // computer mode

        let Check = SetGameData_CheckConfirm();

        if (curr_mode == GameMode[1].opponent) {
            SetGameData_BotMode(Check);
            return;
        };

        // costum x and y
        let costumX;
        let costumY;

        let costum_patterns;

        // check if this is user created level
        if (PlayingInCreatedLevel) {
            Check[0] = true;
            Check[2] = creative_level_instance.Settings.playertimer[creative_level_instance.selectedLevel[3]];
            UserSetPointsToWinGameInput.value = creative_level_instance.selectedLevel[2];
            allowedPatternsFromUser = creative_level_instance.selectedLevel[6];

            // set up x and y coordinates. case: default field is choosen
            if (creative_level_instance.selectedLevel[16] == {}) {
                costumX = creative_level_instance.Settings.cellgrid[creative_level_instance.selectedLevel[7]];
                costumY = creative_level_instance.Settings.cellgrid[creative_level_instance.selectedLevel[7]];

            } else {
                costumX = creative_level_instance.selectedLevel[16]["x"];
                costumY = creative_level_instance.selectedLevel[16]["y"];
            };

            costum_patterns = creative_level_instance.selectedLevel[15];
        };

        // if Player1 Namefield and Player2 Namefield isn't empty etc., initialize Game
        if (Player1_NameInput.value != "" && Player2_NameInput.value != "" && Player1_NameInput.value != Player2_NameInput.value &&
            Player1_IconInput.value != "" && Player2_IconInput.value != "" && Player1_IconInput.value != Player2_IconInput.value &&
            Check[0] == true && Check[1] == true) {

            // general stuff
            SetPlayerNamesPopUp.style.display = 'none';

            // initialize game with the right values
            let fieldIndex = curr_field_ele.getAttribute('index');
            curr_name1 = Player1_NameInput.value;
            curr_name2 = Player2_NameInput.value;
            curr_form1 = Player1_IconInput.value.toUpperCase();
            curr_form2 = Player2_IconInput.value.toUpperCase();
            curr_innerGameMode = Check[3]; // Inner Game
            curr_selected_PlayerClock = Check[2]; // Player Clock

            DarkLayer.style.display = 'none';
            online_level_scene.style.display = 'none';

            // play theme music 
            PauseMusic();
            if (PlayingInCreatedLevel) {
                if (creative_level_instance.selectedLevel[5] != 0) {
                    curr_music_name = document.querySelector(`[src="${creative_level_instance.Settings["bgmusic"][creative_level_instance.selectedLevel[5]]}"]`);
                    // CreateMusicBars(curr_music_name);
                };

            } else {
                curr_music_name = Fields[fieldIndex].theme_name;
                // CreateMusicBars(curr_music_name);
            };

            initializeGame(curr_field_ele, undefined, undefined, allowedPatternsFromUser, undefined, UserSetPointsToWinGameInput.value, undefined, undefined, [costumX, costumY], costum_patterns);

        } else {
            return;
        };
    };
};

function SetGameData_BotMode(Check) {
    if (Player1_NameInput.value != "" && Player1_IconInput.value != "" && Player1_IconInput.value != "Y" && Check[1] == true) {

        let fieldIndex = curr_field_ele.getAttribute('index');
        curr_mode = GameMode[1].opponent;
        curr_name1 = MapLevel_NameInput.value;
        curr_name2 = 'The unknown'; // Bot
        curr_form1 = Player1_NameInput.value.toUpperCase();
        curr_form2 = 'Y'; // Bot        
        curr_innerGameMode = Check[3];

        // costum x and y
        let costumX;
        let costumY;

        // check if this is user created level
        if (PlayingInCreatedLevel) {
            Check[0] = true;
            Check[2] = creative_level_instance.Settings.playertimer[creative_level_instance.selectedLevel[3]];
            UserSetPointsToWinGameInput.value = creative_level_instance.selectedLevel[2];
            allowedPatternsFromUser = creative_level_instance.selectedLevel[6];

            // set up x and y coordinates. case: default field is choosen
            if (creative_level_instance.selectedLevel[16] == {}) {
                costumX = creative_level_instance.Settings.cellgrid[creative_level_instance.selectedLevel[7]];
                costumY = creative_level_instance.Settings.cellgrid[creative_level_instance.selectedLevel[7]];

            } else {
                costumX = creative_level_instance.selectedLevel[16]["x"];
                costumY = creative_level_instance.selectedLevel[16]["y"];
            };
        };

        DarkLayer.style.display = 'none';
        online_level_scene.style.display = 'none';
        SetPlayerNamesPopUp.style.display = 'none';

        // play theme music 
        PauseMusic();
        if (PlayingInCreatedLevel) {
            if (creative_level_instance.selectedLevel[5] != 0) {
                curr_music_name = document.querySelector(`[src="${creative_level_instance.Settings["bgmusic"][creative_level_instance.selectedLevel[5]]}"]`);
            };

        } else {
            curr_music_name = Fields[fieldIndex].theme_name;
        };

        console.log(allowedPatternsFromUser);

        initializeGame(curr_field_ele, undefined, undefined, allowedPatternsFromUser, undefined, UserSetPointsToWinGameInput.value, undefined, undefined, [costumX, costumY]);
    };
};

// If you play against a bot in the KI Mode
SetPlayerName_confBTN_KIMode.addEventListener('click', () => {
    CreateGame_KIMode();
});

// create and start game in KI Mode
function CreateGame_KIMode() {
    if (YourName_Input_KI_mode.value != "" && Your_IconInput.value != "") {
        // html stuff
        YourNamePopUp_KI_Mode.style.display = 'none';
        DarkLayer.style.display = 'none';

        // initialize game with the right values
        let fieldIndex = curr_field_ele.getAttribute('index');
        curr_name1 = YourName_Input_KI_mode.value;
        curr_name2 = 'Bot';
        curr_form1 = Your_IconInput.value;
        curr_form2 = 'O' // Bot    

        // play theme music 
        PauseMusic();
        curr_music_name = Fields[fieldIndex].theme_name;
        // CreateMusicBars();

        initializeGame(curr_field_ele, undefined, undefined, JSON.parse(localStorage.getItem('unlocked_mapLevels'))[1][6]);
    };
};

// If player clicks confirm button check if he selected the clock and Inner game mode
const SetGameData_CheckConfirm = () => {
    let Check1 = false;
    let Check2 = false;
    let Clock = "";
    let InnerGameMode = "";

    Array.from(SetClockList.children).forEach(e => {
        if (e.getAttribute('selected') == "true") {
            Check1 = true;
            Clock = e.getAttribute('value');
        };
    });

    Array.from(SetGameModeList.children).forEach(e => {
        if (e.getAttribute('selected') == "true") {
            Check2 = true;
            InnerGameMode = e.children[0].children[0].textContent;
        };
    });

    return [Check1, Check2, Clock, InnerGameMode];
};

// open set up game data pop up with online game code
function setUpOnlineGame(from) {
    if (from == 'create') {
        // other
        SetPlayerNamesPopUp.style.display = 'flex';
        DarkLayer.style.display = 'block';

        curr_name1 = null;
        curr_name2 = null;

        // Initialize Inputs from pop up
        DisableGameModeItems();
        DisablePlayerClockItems();
        Player1_NameInput.value = "";
        Player2_NameInput.value = "";
        Player1_IconInput.value = "X";
        Player2_IconInput.value = "O";
        SetGameData_Label[0].style.display = 'block';
        SetGameData_Label[1].style.display = 'block';
        OnlineGame_NameWarnText[0].style.display = 'none';
        OnlineGame_NameWarnText[0].style.display = 'none';
        SkinInputDisplay.style.display = 'none';
        Player1_IconInput.style.display = 'block';
        BlockerCombat_OnlineGameWarnText.style.display = "none";

        // for better user experience 
        resetUserChoosedAllowedPatterns();

        // default data
        Player1_IconInput.style.color = localStorage.getItem('userInfoColor');

        if (localStorage.getItem('UserName')) {
            Player1_NameInput.value = localStorage.getItem('UserName');
            Player1_IconInput.value = localStorage.getItem('UserIcon');
        };

        if (localStorage.getItem('userInfoClass') != "empty") {
            Player1_IconInput.style.display = 'none';
            SkinInputDisplay.style.display = 'block';

            SkinInputDisplaySkin.className = 'fa-solid fa-' + localStorage.getItem('current_used_skin');
        };

    } else if (from == 'enter') {
        DisplayPopUp_PopAnimation(OnlineGame_CodeName_PopUp, "flex", true);
        // bug fix
        EnterGameCode_Input.value = null;
        OnlineGameLobby_alertText.style.display = 'none';
    };
};

// reset the settings the user previously made in the set data pop up to start the game
function resetUserChoosedAllowedPatterns() {
    SetAllowedPatternsWrapper.style.scrollBottom = SetAllowedPatternsWrapper.style.scrollHeight;

    RandomAllowedWinCombinations_Btn.className = "fa-regular fa-square RandomAllowedWinCombinations_Btn";
    RandomAllowedWinCombinations_Btn.setAttribute('activated', "false");

    setPatternWrapper.forEach(ele => {
        ele.style.display = 'flex';
        ele.style.color = "white";
        [...ele.children[0].children].forEach(c => {
            c.style.color = "white";
        });
        ele.children[1].className = "fa-regular fa-square-check togglePatternBtn";
        ele.children[1].setAttribute("active", "true");
    });
    allowedPatternsFromUser = ["hor", "vert", "dia", "dia2", "L1", "L2", "L3", "L4",
        "W1", "W2", "W3", "W4", "star", "diamond", "branch1", "branch2", "branch3", "branch4", "special1", "special2"
    ];
};

// when player wants to create/start a game and passes the required data
// he can choose which patterns should be allowed in the game and which not
// on: toggle button event
togglePatternBtn.forEach(el => {
    el.addEventListener('click', e => {
        switch (e.target.getAttribute("active")) {
            case "true":
                e.target.className = "fa-regular fa-square togglePatternBtn";
                e.target.setAttribute("active", "false");

                // if pattern has the same class name as the check box button attribute value (if name is the same) =>disable it
                SetPatternGrid.forEach(ele => {
                    if (ele.classList[1] == e.target.getAttribute("for-pattern")) {
                        // example: hor
                        allowedPatternsFromUser = allowedPatternsFromUser.filter(item => item !== ele.classList[1]);
                    };
                });

                // change color to grey so the disability of the pattern is more displayed to the user
                setPatternWrapper.forEach(ele => {
                    if (ele.classList[1] == e.target.getAttribute("for-pattern")) {
                        ele.style.color = "#121518";

                        Array.from(ele.children[0].children).forEach(c => {
                            c.style.color = "#121518";
                        });
                    };
                });
                break;

            case "false":
                e.target.className = "fa-regular fa-square-check togglePatternBtn";
                e.target.setAttribute("active", "true");

                // if pattern has the same class name as the check box button attribute value (if name is the same) =>disable it
                SetPatternGrid.forEach(ele => {
                    if (ele.classList[1] == e.target.getAttribute("for-pattern")) {
                        let alreadyExists = false;
                        for (const i of allowedPatternsFromUser) {
                            if (i == ele.classList[1]) {
                                alreadyExists = true;
                                break;
                            };
                        };
                        if (!alreadyExists) {
                            allowedPatternsFromUser.push(ele.classList[1]);
                        };
                    };
                });

                // change color to grey so the disability of the pattern is more displayed to the user
                setPatternWrapper.forEach(ele => {
                    if (ele.classList[1] == e.target.getAttribute("for-pattern")) {
                        ele.style.color = "white";

                        [...ele.children[0].children].forEach(c => {
                            c.style.color = "white";
                        });
                    };
                });
                break;
        };
    });
});

// random allowed win combinations button , toggle!
RandomAllowedWinCombinations_Btn.addEventListener('click', () => {
    switch (RandomAllowedWinCombinations_Btn.getAttribute('activated')) {
        case "true":
            RandomAllowedWinCombinations_Btn.className = "fa-regular fa-square RandomAllowedWinCombinations_Btn";
            RandomAllowedWinCombinations_Btn.setAttribute('activated', "false");

            resetUserChoosedAllowedPatterns();
            break;

        case "false":
            RandomAllowedWinCombinations_Btn.className = "fa-regular fa-square-check RandomAllowedWinCombinations_Btn";
            RandomAllowedWinCombinations_Btn.setAttribute('activated', "true");

            let amountToRemove = Math.floor(Math.random() * 19);
            SetRandomAllowedWinCombinations(allowedPatternsFromUser, amountToRemove);
            break;
    };
});

// execute the random wc's
function SetRandomAllowedWinCombinations(arr, numToRemove) {
    for (let i = 0; i < numToRemove; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        arr.splice(randomIndex, 1);
    };

    // display everything to none
    setPatternWrapper.forEach(e => {

        // if construction as bug prevention
        !e.parentElement.parentElement.classList.contains("workbench_AllowedPatternsList") && (e.style.display = 'none');
        return;
    });

    [...setPatternWrapper].map(e => {

        allowedPatternsFromUser.forEach(p => {
            if (e.classList[1] == p) {
                e.style.display = "flex";
            };
        });
    });
};

// for allowed patterns in lobby
togglePatternBtnLobby.forEach(btn => {
    btn.addEventListener('click', e => {
        switch (e.target.getAttribute("active")) {
            case "true":
                e.target.className = "fa-regular fa-square togglePatternBtnLobby";
                e.target.setAttribute("active", "false");

                // if pattern has the same class name as the check box button attribute value (if name is the same) =>disable it
                SetPatternGridLobby.forEach(ele => {
                    if (ele.classList[0] == e.target.getAttribute("for-pattern")) {
                        // example: hor
                        allowedPatternsFromUser = allowedPatternsFromUser.filter(item => item !== ele.classList[0]);

                        // update for all users
                        socket.emit("Admin_AlterAllowedPatterns", personal_GameData.currGameID, allowedPatternsFromUser);
                    };
                });

                // change color to grey so the disability of the pattern is more displayed to the user
                setPatternWrapperLobby.forEach(ele => {
                    if (ele.classList[0] == e.target.getAttribute("for-pattern")) {
                        ele.style.color = "#121518";

                        Array.from(ele.children[0].children).forEach(c => {
                            c.style.color = "#121518";
                        });
                    };
                });

                break;

            case "false":
                e.target.className = "fa-regular fa-square-check togglePatternBtnLobby";
                e.target.setAttribute("active", "true");

                // if pattern has the same class name as the check box button attribute value (if name is the same) =>disable it
                SetPatternGridLobby.forEach(ele => {
                    if (ele.classList[0] == e.target.getAttribute("for-pattern")) {
                        // example: hor
                        let alreadyExists = false;
                        for (const i of allowedPatternsFromUser) {
                            if (i == ele.classList[0]) {
                                alreadyExists = true;
                                break;
                            };
                        };
                        if (!alreadyExists) {
                            allowedPatternsFromUser.push(ele.classList[0]);

                            // update for all users
                            socket.emit("Admin_AlterAllowedPatterns", personal_GameData.currGameID, allowedPatternsFromUser);
                        };
                    };
                });

                // change color to grey so the disability of the pattern is more displayed to the user
                setPatternWrapperLobby.forEach(ele => {
                    if (ele.classList[0] == e.target.getAttribute("for-pattern")) {
                        ele.style.color = "white";

                        [...ele.children[0].children].forEach(c => {
                            c.style.color = "white";
                        });
                    };
                });

                break;
        };
    });
});

// when the admin alters the availible win patterns in the lobby all player need to be informed by that and the data needs to be updated
socket.on("Updated_AllowedPatterns", patternsArray => {
    allowedPatternsFromUser = patternsArray;

    // blur all patterns
    setPatternWrapperLobby.forEach(ele => {
        ele.style.color = "#121518";

        Array.from(ele.children[0].children).forEach(c => {
            c.style.color = "#121518";
        });

        // mark checkbox
        ele.children[1].setAttribute("active", "false");
        ele.children[1].className = "fa-regular fa-square togglePatternBtnLobby";
    });

    // make availible patterns white
    allowedPatternsFromUser.forEach(p => {
        setPatternWrapperLobby.forEach(el => {
            if (el.classList[0] == p) {
                el.style.color = "white";

                Array.from(el.children[0].children).forEach(c => {
                    c.style.color = "white";
                });

                // mark checkbox
                el.children[1].setAttribute("active", "true");
                el.children[1].className = "fa-regular fa-square-check togglePatternBtnLobby";
            };
        });
    });
});

// random game opponent button
SearchRandomOpponent_btn.addEventListener("click", () => {
    play_btn4_sound();
    AlertText.textContent = "this feature is availible soon";
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
});