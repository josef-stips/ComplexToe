// This script is to handle the communication between client and server

// All EventListener on html elements that send and recieve data from the servers
socket.on('connect', () => {
    console.log('connected!  ' + socket.id);

    closeAlertPopUpBtn.style.display = "block";
    alertPopUp.style.display = "none";
    DarkLayer.style.zIndex = "500";

    if (exploredItems_PopUp.style.display == "flex" ||
        YouFoundItems_PopUp.style.display == "flex" ||
        settingsWindow.style.display == "flex" ||
        SetPlayerNamesPopUp.style.display == "flex" ||
        YourNamePopUp_KI_Mode.style.display == "flex" ||
        GameInfoPopUp.style.display == "flex" ||
        ChooseWinner_popUp.style.display == "flex" ||
        OnlineGame_iniPopUp.style.display == "flex" ||
        OnlineGame_CodeName_PopUp.style.display == "flex" ||
        friendLeftGamePopUp.style.display == "flex" ||
        animatedPopUp.style.display == "block" ||
        userInfoPopUp.style.display == "flex" ||
        UserGivesData_PopUp_name.style.display == "flex" ||
        UserGivesData_PopUp_icon.style.display == "flex" ||
        treasureBoxTimerPopUp.style.display == "flex" ||
        Chat_PopUp.style.display == "flex" ||
        GiveUpPopUp.style.display == "flex" ||
        UseSpell_PopUp.style.display == "flex" ||
        MailPopUp.style.display == "flex" ||
        tradeX_PopUp.style.display == "flex" ||
        XP_Journey.style.display == "flex" ||
        SearchPlayerPopUp.style.display == "flex" ||
        FriendsListPopUp.style.display == "flex" ||
        MessagesPopUp.style.display == "flex" ||
        SendMessagePopUp.style.display == "flex" ||
        DeleteFriend_PopUp.style.display == "flex" ||
        CreateLevel_helpPopUp.style.display == "flex" ||
        saveLevelWarning.style.display == "flex" ||
        removeWarning.style.display == "flex" ||
        ChooseBetweenModesPopUp.style.display == "flex" ||
        AchievementsPopUp.style.display == "flex" ||
        CreateLevel_MusicPreviewPopUp.style.display == "flex" ||
        CreateOwnStuffPopUp.style.display == "flex" ||
        createCostumField_popUp.style.display == "flex" ||
        createCostumPattern_popUp.style.display == "flex" ||
        endGameStatsPopUp.style.display == "flex" ||
        DailyChallenges_PopUp.style.display == "flex" ||
        OfficialWinPatternsPopUp.style.display == "flex" ||
        AGB_PopUp.style.display == "flex" ||
        settingsWindow.style.display == "block" ||
        mapLevelOverview.style.display == "flex" ||
        clan_overview_pop_up.style.display == "flex") {
        // Your code to execute when any of the elements' style.display is "flex"

        DarkLayer.style.display = "block";

    } else {
        DarkLayer.style.display = "none";
    };
});

socket.on('disconnect', reason => {
    console.log('disconnected  ' + socket.id);
    console.log('reason: ' + reason);

    DarkLayer.style.display = "block";
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    AlertText.textContent = "It looks like you're offline! Try to reconnect.";
    closeAlertPopUpBtn.style.display = "none";
    DarkLayer.style.zIndex = "93000";
});

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);

    DarkLayer.style.display = "block";
    DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
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

// init. style for user enters lobby
const InitStyleForUserEntersLobby = (message) => {
    Lobby_GameCode_display.textContent = `Game Code: ${message[1]}`;
    Lobby_InnerGameMode.textContent = `${message[4]}`;
    Lobby_PlayerClock.textContent = `${message[3]} seconds`;
    Lobby_FieldSize.textContent = !JSON.parse(message[6])[0] ? `${message[2]}x${message[2]}` : `${JSON.parse(message[6])[0]}x${JSON.parse(message[6])[1]}`;

    console.log(message[6]);

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

    SetPlayerNames_AdditionalSettings.style.display = "none";
    allow_players_watch_el.style.display = "none";

    if (random_player_mode) {
        LobbyUserFooterInfo.style.display = 'none';
        Lobby_GameCode_display.style.display = 'none';
        LobbyUserFooterInfoRndPlayer.style.display = 'none';
        Lobby_RndPlayer_Lobby_display.style.display = 'flex';

    } else {
        LobbyUserFooterInfo.style.display = 'block';
        Lobby_GameCode_display.style.display = 'flex';
        LobbyUserFooterInfoRndPlayer.style.display = 'none';
        Lobby_RndPlayer_Lobby_display.style.display = 'none';
    };

    if (tournament_mode) {
        tournament_online_lobby_title.textContent = `Tournament match`;
        Lobby_GameCode_display.style.display = 'none';

    } else {
        tournament_online_lobby_title.textContent = ``;
        Lobby_GameCode_display.style.display = 'flex';
    };
};

// Init and display all game info for user enters the lobby
const InitGameInfoForUserEntersLobby = () => {
    socket.emit("Request_PointsToWin", personal_GameData.currGameID, cb => {
        points_to_win = cb;
        Lobby_PointsToWin.textContent = cb;
    });

    // so the user sees the current allowed win patterns
    socket.emit("Request_AllowedPatterns", personal_GameData.currGameID, (cb, costum_patterns) => { // cb: array with all names of the allowed patterns
        // console.log(cb);
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

        document.querySelectorAll('.costum_pattern_grid_in_lobby') && document.querySelectorAll('.costum_pattern_grid_in_lobby').forEach(p => p.remove());

        setTimeout(() => {
            costum_patterns = JSON.parse(costum_patterns);

            try {
                Object.keys(costum_patterns).map(n => {
                    let v = costum_patterns[n][n]['value'];
                    let s = costum_patterns[n][n]['structure'];

                    createPattern_preview(n, s, Lobby_AllowedPatternsScrollContainer, 'level', 'ingame_preview', 5, null, null, 5, 'pattern', false, v, false);
                });
            } catch (error) {
                console.log(error);
            };

            [...document.querySelectorAll('.Lobby_AllowedPatternsScrollContainer .createCostumField_Field_wrapper')].forEach(p => {
                p.childNodes[0].classList.add("SetPatternGridLobby");
                p.classList.remove("createCostumField_Field_wrapper");
                p.classList.remove("costumPatternsOverview_gridWrapper");
                p.classList.add("costum_pattern_grid_in_lobby");
            });
        }, 500);

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

    // for the user, the switch carets should not be visible
    // cause he has no rights to do so
    SwitchCaret.forEach(caret => {
        caret.style.display = 'none';
    });
};

// execute function enter code name through button click
function EnterCodeName() {
    if (EnterGameCode_Input.value != null && EnterGameCode_Input.value != '' && EnterGameCode_Input.value != undefined) {
        // server stuff
        // console.log(EnterGameCode_Input.value.trim());
        try_to_join_lobby(EnterGameCode_Input.value.trim());

    } else {
        return;
    };
};

function try_to_join_lobby(room_id) {
    socket.emit('TRY_enter_room', room_id, message => {

        // Handle callback message
        if (message[0] == 'room exists') { // room exists
            personal_GameData.EnterOnlineGame = true;
            personal_GameData.currGameID = message[1]; // the game id

            // if he joined as blocker, his role is blocker, otherwise his role is user
            // console.log(message[5]);

            if (message[5] == "thirdplayer") {
                // set role
                personal_GameData.role = 'blocker'
                Player1_IconInput.style.display = "none";
                document.querySelector(`[for="Player1_IconInput"]`).style.display = "none";

                // display third player wrapper 
                Lobby_ThirdPlayer_Wrapper.style.display = "flex";

            } else {
                // set role
                personal_GameData.role = 'user';
                Lobby_ThirdPlayer_Wrapper.style.display = "none";
                Lobby_FirstPlayer_Wrapper.style.margin = "0";
            };

            // Initialize lobby display
            // GameID, FieldSize, PlayerTimer, InnerGameMode
            InitStyleForUserEntersLobby(message);

            // so the user sees all the current game info the admin (first player) setted
            InitGameInfoForUserEntersLobby();

            // Aftet this the user only needs to set his user data (name, icon) and clicks confirm
            // So the next socket connection is at SetPlayerName_ConfirmButton in "script.js" with the "CONFIRM_enter_room" emit

        } else if (message[0] == 'no room found') { // no room found
            OnlineGameLobby_alertText.style.display = 'block';
            OnlineGameLobby_alertText.textContent = 'No room found!';

        } else if (message[0] == `You can't join`) { // room is full
            OnlineGameLobby_alertText.style.display = 'block';
            OnlineGameLobby_alertText.textContent = `You can't join this room.`;
        };
    });

    // for better user experience 
    Player1_NameInput.value = null;
    Player1_IconInput.value = null;

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

    } else { // player uses normal skin just with a color
        Player1_IconInput.style.display = 'block';
    };
};

const RemoveEventListeners = () => {
    // remove event listener
    [...[Lobby_first_player, namePlayer1]].forEach((e) => e.removeEventListener("click", Lobby_first_player.fn));
    [...[Lobby_second_player, namePlayer2]].forEach((e) => e.removeEventListener("click", Lobby_second_player.fn));
    lobby_third_player.removeEventListener("click", lobby_third_player.fn);
};

// if user is in the lobby and clicks the "x-icon" in the header of the pop up, he leaves the game 
// the "user" parameter checks if the user was just a user or the creater of the game
// If it's the creater who leaves, the room needs to be killed and the other user gets kicked out
Lobby_closeBtn.addEventListener('click', () => {
    RemoveEventListeners();

    // if player played in online created level
    PlayingInCreatedLevel = false;

    let tournament_opponent_id;

    if (tournament_mode) {
        tournament_opponent_id = findOpponentNumber(tournament_handler.clicked_tournament[1].current_state.rounds, localStorage.getItem('PlayerID'));
        universal_clan_msg_handler.check(1000);
    };

    // server
    socket.emit('user_left_lobby', personal_GameData.role, personal_GameData.currGameID, undefined, Number(tournament_opponent_id), message => {
        // Do things after room was killed
        // The client isn't connected to any server so the "current id of the room" is null
        personal_GameData.role = 'user';
        personal_GameData.currGameID = null;
        personal_GameData.EnterOnlineGame = false;

        random_player_mode = false;
    });

    random_player_mode = false;

    // remove "inGame" status from player
    socket.emit("removePlayerInRoomStatus", localStorage.getItem("PlayerID"));

    // some things
    OnlineGame_Lobby.style.display = 'none';
    DarkLayer.style.display = 'none';
    OnlineGameLobby_alertText.style.display = 'none';
    Lobby_GameInfo_PopUp.style.display = 'none';
    Chat_PopUp.style.display = 'none';

    // Check if player unlocked one of these fields
    locked_25x25();
    locked_30x30();
    locked_40x40();
});

const CloseSetGameDataPopUp = () => {
    // in computer mode or in online mode but user wants to create a game
    SetPlayerNamesPopUp.style.display = 'none';
    DarkLayer.style.display = 'none';
    ConfirmName_Btn.style.height = '45%';
    SetPlayerNames_Header.style.height = '21%';

    arena_mode = false;

    if (personal_GameData.EnterOnlineGame) {
        socket.emit('user_left_lobby', personal_GameData.role, personal_GameData.currGameID, message => {
            // Do things after room was killed
            // The client isn't connected to any server now so the "current id of the room" is null
            personal_GameData.role = 'user';
            personal_GameData.currGameID = null;
            personal_GameData.EnterOnlineGame = false;

            random_player_mode = false;
        });
    };
};

// If user already entered a room and just needs to set up his player data, he can close the window with the "x" in the header
// When he closes the window, he gets kicked out of the room
SetPlayerNamesCloseBtn.addEventListener('click', () => {
    CloseSetGameDataPopUp();
});

// Only the admin can start the game, only for the admin this button is visible
Lobby_startGame_btn.addEventListener('click', () => {
    let fieldIndex = curr_field_ele.getAttribute('index');
    let xyAmount = Fields[fieldIndex].xyCellAmount; // 5, 10, 15, 20 ?

    // just a little change for better user experience
    Lobby_GameCode_display.style.userSelect = 'none';

    try {
        // First, send an emit to the server to inform it about it
        // The server sends a message to all clients in the lobby 
        socket.emit('request_StartGame', [personal_GameData.currGameID, xCell_Amount, yCell_Amount]);

    } catch (error) {
        AlertText.textContent = "Uhm... Something went wrong.";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    };
});

// Leave Game button
leaveGame_btn.addEventListener('click', UserleavesGame);

// clear timer and stuff to prevent bugs 
const clearTimer = () => {
    killPlayerClocks(true); // true: also kill boss timer f.ex eye interval
    clearInterval(gameCounter);
    gameCounter = null;
    stopStatusTextInterval = true;

    // kill boss instance 
    if (current_level_boss != null) {
        current_level_boss.delete();
        current_level_boss = null;
    };
};

// after some player leaves game and is not the admin so it could be also an offline game, do animation etc.
const DarkLayerAfterGameAnimation = (advantureModelevelIndex, UserWonAdvantureMode, wonLevel10) => {
    return new Promise((resolve) => {
        DarkLayer.style.backgroundColor = 'black';
        DarkLayer.style.display = 'block';

        let timeOut = 100;

        if (advantureModelevelIndex == 10) {
            DarkLayer.style.transition = 'opacity 1.1s ease-in'
            timeOut = 1100;

        } else if (advantureModelevelIndex != 10) {
            DarkLayer.style.transition = 'opacity 0.2s ease-in';
            timeOut = 200;
        };

        // console.log(timeOut, advantureModelevelIndex, UserWonAdvantureMode, wonLevel10);

        DarkLayer.style.opacity = '0';

        setTimeout(() => {
            DarkLayer.style.opacity = '1';
            setTimeout(() => {
                GameField.style.display = 'none';

                if (!inAdvantureMode) {
                    // if player created a lobby from the create level scene and leaves the game, he should spawn there where he left. The same for normal card level

                    if (PlayingInCreatedLevel && !inPlayerLevelsScene) {
                        CreateLevelScene.style.display = "flex"
                        sceneMode.full();

                    } else if (!arena_mode) {
                        if (inPlayerLevelsScene) {
                            online_level_scene.style.display = "flex";
                            sceneMode.default();

                        } else {
                            gameModeFields_Div.style.display = 'flex'
                            sceneMode.full();
                        };
                    };

                    if (arena_mode) {
                        arena_mode = false;
                        gameMode_OneVsOne_card.click();
                    };

                } else {
                    AdvantureMap.style.display = 'flex';
                };
                resolve();

            }, timeOut);
        }, 100);

        if (advantureModelevelIndex != 10) {
            setTimeout(() => {
                DarkLayer.style.opacity = '0';

                setTimeout(() => {
                    DarkLayer.style.display = "none";
                    DarkLayer.style.transition = 'none';
                    DarkLayer.style.opacity = '1';
                    DarkLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.87)';

                    resolve();
                }, timeOut);
            }, timeOut + 200);
        };
    });
};

// in online mode, some player left the game
const UserLeftGameInOnlineMode = async(from_cont_btn) => {
    DarkLayer.style.display = "block";

    if (tournament_mode) {
        Lobby_closeBtn.click();
        close_all_scenes();
        OnlineGame_Lobby.style.display = 'none';
        tournaments_scene.style.display = 'flex';
        sceneMode.full();

        await tournament_handler.update_tournaments_var();

        if (personal_GameData.role != 'admin') {
            personal_GameData.role = 'user';
            personal_GameData.currGameID = null;
            personal_GameData.EnterOnlineGame = false;
        };

        // kill standard timers for all players
        clearTimer();

        // play music
        PauseMusic();
        if (bossModeIsActive) {
            CreateMusicBars(boss_theme);
        } else {
            if (!PlayingInCreatedLevel) CreateMusicBars(audio);
        };
        return;
    };

    // user left the game
    // Many things are happening in server.js on this emit
    socket.emit('user_left_lobby', personal_GameData.role, personal_GameData.currGameID, from_cont_btn, message => {
        ChangeGameBG(undefined, undefined, null, true);

        random_player_mode = false;

        // only if the user that left is not the admin
        if (personal_GameData.role == 'user' || personal_GameData.role == "blocker") {
            // Do things after room was killed
            // The client isn't connected to any server now so the "current id of the room" is null
            personal_GameData.role = 'user';
            personal_GameData.currGameID = null;
            personal_GameData.EnterOnlineGame = false;

            PlayingInCreatedLevel_AsGuest = false;
        };

        if (getComputedStyle(gameModeFields_Div).display != 'none') {
            sceneMode.full();
        };

        // remove "inGame" status from player
        socket.emit("removePlayerInRoomStatus", localStorage.getItem("PlayerID"));

        // kill standard timers for all players
        clearTimer();

        // play music
        PauseMusic();
        if (bossModeIsActive) {
            CreateMusicBars(boss_theme);
        } else {
            if (!PlayingInCreatedLevel) CreateMusicBars(audio);
        };
    });
};

// in offline or single player offline mode, player left the game
const UserLeftGameInOfflineMode = (userWonInAdvantureMode, LevelIndex_AdvantureMode) => {
    // bug fix
    setTimeout(() => {
        if (inAdvantureMode) {
            lobbyHeader.style.borderBottom = '0.4vh solid var(--font-color)';
            Lobby.style.background = "linear-gradient(45deg, #462d4917, #6f452038)";
            sceneMode.full();
        };

        // user won a level in advanture mode
        // console.log(inAdvantureMode, userWonInAdvantureMode, LevelIndex_AdvantureMode)
        if (inAdvantureMode && userWonInAdvantureMode == true) {
            UserWon_AdvantureLevel(LevelIndex_AdvantureMode);
        } else {
            // for floating level item animation in map
            conqueredLevels();
        };
    }, 200);

    // play music
    PauseMusic();
    if (bossModeIsActive) {
        CreateMusicBars(boss_theme);
    } else {
        if (inAdvantureMode) {
            CreateMusicBars(mapSound);
        } else {
            if (!PlayingInCreatedLevel) CreateMusicBars(audio);
        };
    };
};

// User leaves game on leave game btn event
function UserleavesGame(userWonInAdvantureMode, LevelIndex_AdvantureMode, from_continue_btn) {
    running = false;

    // remove any pop up display
    CloseOnlinePopUps(true);

    // header style
    HeaderWrapper.style.height = '9%';
    lobbyFooter.style.background = '';

    gameLog_btn.classList.remove('blured');

    // if there was general boss, delete instance
    if (current_level_boss) {
        current_level_boss.delete();
        current_level_boss = null;
    };

    // XP Journey reward
    CheckIfUserCanGetReward();

    if (review_mode) {
        let display_el = review_mode_handler.entry_opened_from_scene_x == 'tournament_scene' ? tournaments_scene : gameModeCards_Div;

        DarkLayerAnimation(display_el, GameField).then(() => {
            if (review_mode_handler.entry_opened_from_scene_x != 'tournament_scene') {
                setTimeout(() => {
                    DisplayPopUp_PopAnimation(gameLog_popUp, "flex", true);
                }, 400);

            } else {
                sceneMode.full();
            };
        });

        Lobby.style.background = "";
        document.querySelector('.GameField-info-corner').style.display = "flex";
        theme.start();
        PauseMusic();
        CreateMusicBars(audio);
        review_mode = false;
        running = false;
        ChangeGameBG(undefined, undefined, null, true);
        return;
    };

    if (watch_mode) {
        DarkLayerAnimation(gameModeFields_Div, GameField).then(() => {
            setTimeout(() => {
                global_online_games_handler.open();
            }, 400);
        });

        socket.emit('watcher_left_game', personal_GameData.currGameID, cb => {
            watch_mode = false;
            personal_GameData.role = 'user';
            personal_GameData.currGameID = null;
            personal_GameData.EnterOnlineGame = false;
            PlayingInCreatedLevel_AsGuest = false;
            running = false;

            Lobby.style.background = "";
            theme.start();
            PauseMusic();
            CreateMusicBars(audio);
        });
        ChangeGameBG(undefined, undefined, null, true);
        return;
    };

    ChangeGameBG(undefined, undefined, null, true);

    if (personal_GameData.role == "admin") {

        if (PlayingInCreatedLevel && !inPlayerLevelsScene) {
            CreateLevelScene.style.display = "flex";
            sceneMode.full();

        } else {
            gameModeFields_Div.style.display = 'flex';
            sceneMode.full();
        };

        GameField.style.display = "none";

        // kill timers
        clearTimer();

        // If in online mode
        if (curr_mode == GameMode[2].opponent) {
            UserLeftGameInOnlineMode(from_continue_btn);
        } else { // in offline mode
            UserLeftGameInOfflineMode(userWonInAdvantureMode, LevelIndex_AdvantureMode);
        };

    } else {
        DarkLayerAfterGameAnimation(LevelIndex_AdvantureMode, userWonInAdvantureMode, localStorage.getItem("completed_mapLevel10")).then(() => {
            // kill timers
            clearTimer();

            // If in online mode
            if (curr_mode == GameMode[2].opponent) {
                UserLeftGameInOnlineMode();
            } else { // in offline mode
                UserLeftGameInOfflineMode(userWonInAdvantureMode, LevelIndex_AdvantureMode);

                starsHandler.init();
            };
        });
    };

    Lobby.style.background = "";
    theme.start();

    if (inPlayerLevelsScene) {
        player_levels_handler.online_level_overview_handler.init_level_BG();
    };
};

// display third player 
const DisplayThirdPlayer = () => {
    lobby_third_player.classList = "Lobby_third_player PlayerLobbyDisplay fa-regular fa-square";
    lobby_third_player.textContent = null;
    Lobby_XPlayerNameDisplay[2].style.display = "block";
};

// undisplay third player 
const UnDisplayThirdPlayer = () => {
    lobby_third_player.classList = "Lobby_third_player PlayerLobbyDisplay";
    lobby_third_player.textContent = "...";
    Lobby_XPlayerNameDisplay[2].style.display = "none";
    Lobby_XPlayerNameDisplay[2].textContent = null;
};

// reset first player wrapper
const Reset_FirstPlayer_Wrapper = () => {
    // reset advanced icon if there is one
    if (Lobby_first_player.querySelector("span")) Lobby_first_player.querySelector("span").remove();
    // reset normal icon display
    Lobby_first_player.textContent = "...";
    // reset player color
    Lobby_first_player.style.color = "white";
    Lobby_FirstPlayer_Wrapper.style.color = "white";
    // reset name
    Lobby_XPlayerNameDisplay[1].textContent = null;

    // name as attribute in icon element
    Lobby_first_player.setAttribute("LobbyPlayerName", null);

    Lobby_first_player.style.cursor = "default";

    RemoveEventListeners();
};

// reset second player wrapper
const Reset_SecondPlayer_Wrapper = () => {
    // reset advanced icon if there is one
    if (Lobby_second_player.querySelector("span")) Lobby_second_player.querySelector("span").remove();
    // reset normal icon display
    Lobby_second_player.textContent = "...";
    // reset player color
    Lobby_second_player.style.color = "white";
    Lobby_SecondPlayer_Wrapper.style.color = "white";
    // reset name
    Lobby_XPlayerNameDisplay[0].textContent = null;

    // name as attribute in icon element
    Lobby_second_player.setAttribute("LobbyPlayerName", null);

    Lobby_second_player.style.cursor = "default";

    RemoveEventListeners();
};

// reset third player wrapper
const Reset_ThirdPlayer_Wrapper = () => {
    // reset normal icon display
    lobby_third_player.textContent = "...";
    // reset player color
    lobby_third_player.style.color = "white";
    Lobby_ThirdPlayer_Wrapper.style.color = "white";
    // reset name
    Lobby_XPlayerNameDisplay[2].textContent = null;
    // reset third player blocker icon
    lobby_third_player.classList = "Lobby_third_player PlayerLobbyDisplay";

    // name as attribute in icon element
    lobby_third_player.setAttribute("LobbyPlayerName", null);

    lobby_third_player.style.cursor = "default";

    RemoveEventListeners();
};

// reset first player wrapper
const ResetXPlayerWrapper = (x) => { // 1: first player, 2: second player, 3: third player
    switch (x) {
        case 1:
            Reset_FirstPlayer_Wrapper();
            break;
        case 2:
            Reset_SecondPlayer_Wrapper();
            break;

        case 3:
            Reset_ThirdPlayer_Wrapper();
            break;
            // on default, reset every player wrapper
        default:
            Reset_FirstPlayer_Wrapper();
            Reset_SecondPlayer_Wrapper();
            Reset_ThirdPlayer_Wrapper();
            break;
    };
};

// whenever a player in lobby has an advanced icon, just call this function and parse in parameters
const CreateAndAddAdvancedIconSpan = (lobby_icon_display, lobby_player_wrapper_display, icon) => {
    // delete any text in icon display element
    lobby_icon_display.textContent = null;
    // display player color in white. There are no colorful advanced icons
    lobby_icon_display.style.color = "white";
    lobby_player_wrapper_display.style.color = "white";

    // create and add span
    let span = document.createElement("span");
    span.classList = `${icon} Temporary_IconSpan`;
    lobby_icon_display.appendChild(span);
};

// display first player 
const Display_FirstPlayer_Wrapper = (name, color, icon, IsIconAdvanced) => {
    // make player visible
    Lobby_FirstPlayer_Wrapper.style.display = "flex";

    // delete previous advanced icon if there is one
    if (Lobby_first_player.querySelector("span")) Lobby_first_player.querySelector("span").remove();

    // set icon display
    if (IsIconAdvanced != 'empty') {
        // create and add advanced icon
        CreateAndAddAdvancedIconSpan(Lobby_first_player, Lobby_FirstPlayer_Wrapper, IsIconAdvanced);

    } else {
        Lobby_first_player.textContent = icon.toUpperCase();
        // display player color the right way. white if advanced icon. costum color if standard icon
        Lobby_first_player.style.color = color;
        Lobby_FirstPlayer_Wrapper.style.color = color;
    };

    Lobby_first_player.style.cursor = "pointer";

    // set name
    personal_GameData.role == "admin" ? Lobby_XPlayerNameDisplay[1].textContent = `${name} (you)` : Lobby_XPlayerNameDisplay[1].textContent = name;
};

// display second player 
const Display_SecondPlayer_Wrapper = (name, color, icon, IsIconAdvanced, AdminName) => { // if "isIconAdvanced" is not false, it is the fontawesome string for the icon
    // make player visible
    Lobby_SecondPlayer_Wrapper.style.display = "flex";

    // delete previous advanced icon if there is one
    if (Lobby_second_player.querySelector("span")) Lobby_second_player.querySelector("span").remove();

    // set icon display
    if (IsIconAdvanced != 'empty') {
        // create and add advanced icon
        CreateAndAddAdvancedIconSpan(Lobby_second_player, Lobby_SecondPlayer_Wrapper, IsIconAdvanced);

    } else {
        Lobby_second_player.textContent = icon.toUpperCase();
        // display player color the right way. white if advanced icon. costum color if standard icon
        Lobby_second_player.style.color = color;
        Lobby_SecondPlayer_Wrapper.style.color = color;
    };

    // set name
    personal_GameData.role == "user" ? Lobby_XPlayerNameDisplay[0].textContent = `${name} (you)` : Lobby_XPlayerNameDisplay[0].textContent = name;

    // name as attribute in icon element
    Lobby_second_player.setAttribute("LobbyPlayerName", name);
    // name as attribute in icon element for first player
    Lobby_first_player.setAttribute("LobbyPlayerName", AdminName);

    Lobby_first_player.style.cursor = "pointer";
    Lobby_second_player.style.cursor = "pointer";
};

// display third player. The third player is not a player but only a blocker so no icon is needed
const Display_ThirdPlayer_Wrapper = (name) => {
    // make player visible
    Lobby_ThirdPlayer_Wrapper.style.display = "flex";

    // undisplay "wait for player dots"
    lobby_third_player.textContent = null;
    // reset player color
    lobby_third_player.style.color = "white";
    Lobby_ThirdPlayer_Wrapper.style.color = "white";
    // display third player blocker "icon"
    lobby_third_player.classList = "Lobby_third_player PlayerLobbyDisplay fa-regular fa-square";

    // display name
    personal_GameData.role == "blocker" ? Lobby_XPlayerNameDisplay[2].textContent = `Blocker: ${name} (you)` : Lobby_XPlayerNameDisplay[2].textContent = `Blocker: ${name}`;

    // name as attribute in icon element
    lobby_third_player.setAttribute("LobbyPlayerName", name);

    lobby_third_player.style.cursor = "pointer";
};

// display x player with the right data
const DisplayXPlayer = (x, name, color, icon, IsIconAdvanced, AdminName) => {
    switch (x) {
        case 1:
            Display_FirstPlayer_Wrapper(name, color, icon, IsIconAdvanced);
            break;
        case 2:
            Display_SecondPlayer_Wrapper(name, color, icon, IsIconAdvanced, AdminName);
            break;

        case 3:
            Display_ThirdPlayer_Wrapper(name);
            break;
            // on default, reset every player wrapper
        default:
            Display_FirstPlayer_Wrapper(name, color, icon, IsIconAdvanced);
            Display_SecondPlayer_Wrapper(name, color, icon, IsIconAdvanced);
            Display_ThirdPlayer_Wrapper(name);
            break;
    };
};

let RandomTextN = -1;
// random text
const RandomTextOnAlert = (n) => {
    switch (n) {
        case 0:
            AlertText.textContent = "You want to click on something huh?";
            break;

        case 1:
            AlertText.textContent = "There is no way you will do it";
            break;

        case 2:
            AlertText.textContent = "...";
            break;

        case 3:
            AlertText.textContent = "Still trying?";
            break;

        case 4:
            AlertText.textContent = "Good ambition. But for what price?";
            break;

        case 5:
            AlertText.textContent = "You want some cookies?";
            break;

        case 6:
            AlertText.textContent = "You should rater beat the unknown";
            break;
    };
};

// player wants to click on other player profiles in the lobby or mid online game
const EventListenerForXPlayer = (x) => {
    let player_display;

    switch (x) {
        case 1:
            player_display = Lobby_first_player;
            break;

        case 2:
            player_display = Lobby_second_player;
            break;

        case 3:
            player_display = lobby_third_player;
            break;
    };

    try {
        // console.log(player_display, player_display.getAttribute("LobbyPlayerName"), personal_GameData.currGameID);

        socket.emit("ClickOnProfile", player_display.getAttribute("LobbyPlayerName"), personal_GameData.currGameID, player => { // name of player to click on and the lobby id
            // console.log(player);

            if (player) {
                try {
                    let player_name = player.player_name;
                    let player_id = player.player_id;
                    let player_icon = player.player_icon;
                    let playerInfoClass = player.playerInfoClass;
                    let playerInfoColor = player.playerInfoColor;
                    let quote = player.quote;
                    let onlineGamesWon = player.onlineGamesWon;
                    let XP = player.XP;
                    let currentUsedSkin = player.currentUsedSkin;
                    let last_connection = player.last_connection;
                    let commonPattern = player.commonPattern;

                    ClickedOnPlayerInfo(player);

                } catch (error) {
                    console.log(error);
                };

            } else if (player == null) {
                // Text to troll user
                RandomTextN++;
                RandomTextOnAlert(RandomTextN);

                if (RandomTextN >= 6) RandomTextN = -1;

                OpenedPopUp_WhereAlertPopUpNeeded = true;
                DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            };
        });


    } catch (error) {
        AlertText.textContent = "Something went wrong. Is it your connection?";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    };
};

// add event listener for players
// When second and/or third player joins this function calls for every player in room
const SetClickOnProfileListeners = (fromAdmin) => {
    RemoveEventListeners();

    // admin is alone in the lobby and wants to click on himself
    if (fromAdmin) {
        [...[Lobby_first_player, namePlayer1]].forEach((e) => e.addEventListener("click", Lobby_first_player.fn = () => {
            OpenOwnUserProfile();
        }));
        return;
    };

    if (personal_GameData.role == "user") {
        // second player can click on first and third player
        [...[Lobby_first_player, namePlayer1]].forEach((e) => e.addEventListener("click", Lobby_first_player.fn = () => {
            EventListenerForXPlayer(1)
        }));

        lobby_third_player.addEventListener("click", lobby_third_player.fn = () => {
            EventListenerForXPlayer(3);
        });

        [...[Lobby_second_player, namePlayer2]].forEach((e) => e.addEventListener("click", Lobby_second_player.fn = () => {
            OpenOwnUserProfile();
        }));

    } else if (personal_GameData.role == "blocker") {
        // second player can click on first and third player
        [...[Lobby_first_player, namePlayer1]].forEach((e) => e.addEventListener("click", Lobby_first_player.fn = () => {
            EventListenerForXPlayer(1)
        }));

        [...[Lobby_second_player, namePlayer2]].forEach((e) => e.addEventListener("click", Lobby_second_player.fn = () => {
            EventListenerForXPlayer(2);
        }));

        lobby_third_player.addEventListener("click", lobby_third_player.fn = () => {
            OpenOwnUserProfile();
        });

    } else if (personal_GameData.role == "admin") {
        // first player can click on second and third player
        lobby_third_player.addEventListener("click", lobby_third_player.fn = () => {
            EventListenerForXPlayer(3);
        });

        [...[Lobby_second_player, namePlayer2]].forEach((e) => e.addEventListener("click", Lobby_second_player.fn = () => {
            EventListenerForXPlayer(2);
        }));

        [...[Lobby_first_player, namePlayer1]].forEach((e) => e.addEventListener("click", Lobby_first_player.fn = () => {
            OpenOwnUserProfile();
        }));
    };
};

function watch_mode_close_game(no_close, from_continue_btn) {
    if (watch_mode) {
        socket.emit('watcher_left_game', personal_GameData.currGameID, cb => {
            // OpenedPopUp_WhereAlertPopUpNeeded = true;
            // AlertText.textContent = `Game ${personal_GameData.currGameID} ended`;
            // DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);

            // watch_mode = false; // leads to bug on continue button
            personal_GameData.role = 'user';
            personal_GameData.currGameID = null;
            personal_GameData.EnterOnlineGame = false;
            PlayingInCreatedLevel_AsGuest = false;
            running = false;
            win_found = false;
            alertPopUp.style.display = 'none';
            wheel_of_fortune_scene.style.display = 'none';
        });

        if (!no_close) {
            watch_mode = false;
            DarkLayerAnimation(gameModeFields_Div, GameField).then(() => {
                CloseOnlinePopUps(true);
                lobbyFooter.style.background = "";
                lobbyFooterText.style.display = 'flex';

                Lobby.style.background = "";
                theme.start();
                PauseMusic();
                CreateMusicBars(audio);

                setTimeout(() => {
                    global_online_games_handler.open();
                }, 400);
            });

        } else {

            if (!from_continue_btn) {
                watch_mode = false;
                DarkLayerAnimation(gameModeFields_Div, GameField).then(() => {
                    CloseOnlinePopUps(true);
                    lobbyFooter.style.background = "";
                    lobbyFooterText.style.display = 'flex';

                    Lobby.style.background = "";
                    theme.start();
                    PauseMusic();
                    CreateMusicBars(audio);

                    setTimeout(() => {
                        global_online_games_handler.open();
                    }, 400);
                });

                return true;
            };

            GameField.style.display = 'flex';
            DarkLayer.style.display = 'flex';
            endGameStatsPopUp.style.display = 'flex';
        };

        return true;
    };
    return false;
};

// This message goes to all users in a room and gets callen when the admin of the room leaves it
socket.on('killed_room', () => {
    // "killed room" never gets called in torunament mode. Just... leave the code alone. It doesn't bother you
    if (tournament_mode) {
        close_all_scenes();
        tournaments_scene.style.display = 'flex';
        sceneMode.full();

        personal_GameData.role = 'user';
        personal_GameData.currGameID = null;
        personal_GameData.EnterOnlineGame = false;
        return;
    };

    pause_clack_sound();
    wheel_of_fortune_scene.style.display = 'none';

    let watch = watch_mode_close_game();
    if (watch) return;

    // some things
    OnlineGame_Lobby.style.display = 'none';
    SetPlayerNamesPopUp.style.display = 'none';
    OnlineGameLobby_alertText.style.display = 'none';

    CloseOnlinePopUps(true);

    if (PlayingInCreatedLevel_AsGuest) {
        sceneMode.full();
        close_all_scenes();
        gameModeFields_Div.style.display = 'flex';

    } else if (inPlayerLevelsScene) {
        sceneMode.default();
        close_all_scenes();
        online_level_scene.style.display = 'flex';
        Lobby.style.background = `linear-gradient(45deg, ${bgcolor1}, ${bgcolor2})`;
    };

    if (personal_GameData.role != "admin") {
        sceneMode.full();
        AlertText.textContent = "Admin killed the lobby.";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);

        close_all_scenes();
        gameModeFields_Div.style.display = 'flex'
    };

    // server
    personal_GameData.role = 'user';
    personal_GameData.currGameID = null;
    personal_GameData.EnterOnlineGame = false;
});

// if they were in a game in the admin left the game
// When the admin leaves, he and all other clients are in the lobby again
socket.on('killed_game', async(from_continue_btn) => {
    gameLog_btn.classList.remove('blured');

    // clear timer and stuff to prevent bugs
    clearTimer();
    running = false;

    if (tournament_mode) {
        Lobby_closeBtn.click();
        close_all_scenes();
        OnlineGame_Lobby.style.display = 'none';
        sceneMode.full();

        personal_GameData.role = 'user';
        personal_GameData.currGameID = null;
        personal_GameData.EnterOnlineGame = false;

        GameField.style.display = 'none';
        Lobby_GameCode_display.style.userSelect = 'text';
        Lobby.style.background = "";
        ChangeGameBG(undefined, undefined, null, true);
        theme.start();

        // remove big screen text if there was one 
        if (document.querySelector(".bigScreenText")) {
            document.querySelector(".bigScreenText").remove();
        };

        // lobby footer remove background
        lobbyFooter.style.background = "";
        lobbyFooterText.style.display = 'flex';

        await tournament_handler.update_tournaments_var();

        PauseMusic();
        CreateMusicBars(audio);
        tournaments_scene.style.display = 'flex';
        return;
    };

    let watch = watch_mode_close_game('no_close', from_continue_btn);
    if (watch) return;

    pause_clack_sound();
    wheel_of_fortune_scene.style.display = 'none';

    // leave game field
    GameField.style.display = 'none';
    // enter lobby
    OnlineGame_Lobby.style.display = 'flex';

    Lobby_GameCode_display.style.userSelect = 'text';
    Lobby.style.background = "";
    theme.start();

    // close pop ups if there where any open
    CloseOnlinePopUps();
    ChangeGameBG(undefined, undefined, null, true);

    DarkLayer.style.display = "none";

    if (PlayingInCreatedLevel_AsGuest) {
        sceneMode.full();
        close_all_scenes();
        gameModeFields_Div.style.display = 'flex';

    } else if (inPlayerLevelsScene) {
        sceneMode.default();
        close_all_scenes();
        online_level_scene.style.display = 'flex';
        Lobby.style.background = `linear-gradient(45deg, ${bgcolor1}, ${bgcolor2})`;
    };

    // remove big screen text if there was one 
    if (document.querySelector(".bigScreenText")) {
        document.querySelector(".bigScreenText").remove();
    };

    // lobby footer remove background
    lobbyFooter.style.background = "";
    lobbyFooterText.style.display = 'flex';

    PlayingInCreatedLevel_AsGuest = false;

    if (random_player_mode) {

        if (personal_GameData.role == 'admin') {
            Lobby_startGame_btn.style.display = 'block';

        } else if (personal_GameData.role == 'user') {
            LobbyUserFooterInfo.style.display = 'flex';
        };
    };

    // play music
    PauseMusic();
    if (!NewCreativeLevel) CreateMusicBars(audio);
});

// Admin created the game and now waits for the second player
socket.on('Admin_Created_And_Joined', message => {
    // console.log(message);

    // set in database the "inGame" status to current game id
    socket.emit("setPlayerInRoomStatus", localStorage.getItem("PlayerID"), personal_GameData.currGameID);

    ResetXPlayerWrapper(4); // reset every wrapper

    // just so the admin can click on himself
    SetClickOnProfileListeners(true);

    // name of first player (admin)
    DisplayXPlayer(1, message[0], localStorage.getItem("userInfoColor"), message[1], message[2]);

    // display player wrapper from first and second player
    Lobby_SecondPlayer_Wrapper.style.display = "flex";

    // if a third player can play
    if (message[3]) {
        // display player wrapper from third player
        Lobby_ThirdPlayer_Wrapper.style.display = "flex";

        ResetXPlayerWrapper(3);

    } else {
        // undisplay player wrapper from third player
        Lobby_ThirdPlayer_Wrapper.style.display = "none";
    };
});

// When the second player wants to join the game, all other players in the room needs to see this
socket.on('SecondPlayer_Joined', message => {
    console.log("Second Player joined: ", message);

    if (personal_GameData.role == 'admin') {
        kick_second_player_btn.setAttribute("active_dis", "true");
    };

    // set for second and (third player if he joins) the "inGame" status to the current game id which means true
    socket.emit("setPlayerInRoomStatus", localStorage.getItem("PlayerID"), personal_GameData.currGameID);

    // display player wrapper for second player
    Lobby_FirstPlayer_Wrapper.style.display = "flex";

    // last param: name of admin
    DisplayXPlayer(2, message[0], message[3], message[1], message[2], message[6]);

    // if the request comes not from the third player or third player name is not defined
    if (message[5] == undefined || message[5] == '') {
        // display things for third player
        if (message[4]) {
            Lobby_ThirdPlayer_Wrapper.style.display = "flex";
            // The first player is only higher if there is a third player.
            Lobby_FirstPlayer_Wrapper.style.margin = "0 0 2vh 0";

            ResetXPlayerWrapper(3);

        } else {
            Lobby_ThirdPlayer_Wrapper.style.display = "none";
            // The first player is as high as the second player 
            Lobby_FirstPlayer_Wrapper.style.margin = "0 0 0 0";
        };
    };

    // add event listener for players
    // When second and/or third player joins this function calls for every player in room
    SetClickOnProfileListeners();

    // if the second player rejoins and the third player is still there
    if (message[5] != "" && message[5] != 'thirdPlayer_RequestsData') {
        // Lobby_ThirdPlayer_Wrapper.style.display = "flex";
        Lobby_FirstPlayer_Wrapper.style.margin = "0 0 2vh 0";
        // Display third player with his data
        DisplayXPlayer(3, message[5]);
    };

    if (random_player_mode) {
        LobbyUserFooterInfoRndPlayer.style.display = "none";
        Lobby_footer.append(fetch_spinner);
        fetch_spinner.setAttribute('in_use', 'true');
        fetch_spinner.setAttribute('in_use_in_lobby', 'true');
    };
});

// third player joins
socket.on('ThirdPlayer_Joined', message => {
    console.log("Third player joined: ", message);

    if (personal_GameData.role == 'admin') {
        kick_third_player_btn.setAttribute("active_dis", "true");
    };

    // display for third player the other players
    Lobby_FirstPlayer_Wrapper.style.display = "flex";
    Lobby_SecondPlayer_Wrapper.style.display = "flex";

    // display first player in the right way
    Lobby_FirstPlayer_Wrapper.style.margin = "0 0 2vh 0";

    // display data from third player
    DisplayXPlayer(3, message[0])

    if (personal_GameData.role == "blocker") {
        // so the third player (blocker) sees data about second player
        socket.emit('thirdplayer_requests_SecondPlayerData', [parseInt(personal_GameData.currGameID)]);
    };
});

// When the normal user leaves the game, the other player need to be informed by that
socket.on('INFORM_user_left_room', () => {

    gameLog_btn.classList.remove('blured');

    pause_clack_sound();
    wheel_of_fortune_scene.style.display = 'none';

    let watch = watch_mode_close_game();
    if (watch) return;

    if (personal_GameData.role == 'user') {
        Lobby_closeBtn.click();
    };

    if (personal_GameData.role == 'admin') {
        kick_second_player_btn.setAttribute("active_dis", "false");
    };

    // The other players see this after the user left:
    ResetXPlayerWrapper(2);

    // "INFORM_user_left_room" never gets called in torunament mode. Just... leave the code alone. It doesn't bother you
    if (tournament_mode) {
        close_all_scenes();
        tournaments_scene.style.display = 'flex';
        sceneMode.full();
    };
});

// When the third player (blocker) leaves the game, the other player need to be informed by that
socket.on('INFORM_blocker_left_room', () => {

    gameLog_btn.classList.remove('blured');

    pause_clack_sound();
    wheel_of_fortune_scene.style.display = 'none';

    let watch = watch_mode_close_game();
    if (watch) return;

    if (personal_GameData.role == 'blocker') {
        Lobby_closeBtn.click();
    };

    if (personal_GameData.role == 'admin') {
        kick_third_player_btn.setAttribute("active_dis", "false");
    };

    // The other players see this after the user left:
    ResetXPlayerWrapper(3);
});

// User just left the game but during a match
socket.on('INFORM_user_left_game', async() => {
    gameLog_btn.classList.remove('blured');

    // clear timer and stuff to prevent bugs
    clearTimer();
    running = false;

    if (tournament_mode) {
        Lobby_closeBtn.click();
        close_all_scenes();
        OnlineGame_Lobby.style.display = 'none';
        sceneMode.full();

        personal_GameData.role = 'user';
        personal_GameData.currGameID = null;
        personal_GameData.EnterOnlineGame = false;

        GameField.style.display = 'none';
        Lobby_GameCode_display.style.userSelect = 'text';
        Lobby.style.background = "";
        ChangeGameBG(undefined, undefined, null, true);
        theme.start();

        // remove big screen text if there was one 
        if (document.querySelector(".bigScreenText")) {
            document.querySelector(".bigScreenText").remove();
        };

        // lobby footer remove background
        lobbyFooter.style.background = "";
        lobbyFooterText.style.display = 'flex';

        await tournament_handler.update_tournaments_var();

        PauseMusic();
        CreateMusicBars(audio);
        tournaments_scene.style.display = 'flex';
        return;
    };

    pause_clack_sound();
    wheel_of_fortune_scene.style.display = 'none';

    let watch = watch_mode_close_game();
    if (watch) return;

    // The admin sees this after the user left:
    ResetXPlayerWrapper(2);

    // close pop ups if there where any open
    CloseOnlinePopUps();

    // for the admin and blocker, they are in the lobby again
    if (personal_GameData.role == 'admin' || personal_GameData.role == "blocker") {
        ChangeGameBG(undefined, undefined, null, true);

        kick_second_player_btn.setAttribute("active_dis", "false");

        // display right things
        if (PlayingInCreatedLevel) {
            CreateLevelScene.style.display = "flex"
            sceneMode.full();

        } else {
            sceneMode.full();
            gameModeFields_Div.style.display = 'flex';
        };

        OnlineGame_Lobby.style.display = 'flex';
        GameField.style.display = 'none';
        // informative pop up for other players in lobby
        friendLeftGamePopUp.style.display = 'flex';
        friendLeft_text.textContent = 'Your friend left the game';
        // so user can select game code with mouse
        Lobby_GameCode_display.style.userSelect = 'text';
        Lobby.style.background = "";
        theme.start();

        DarkLayer.style.display = 'block';

        lobbyFooter.style.background = "";
        lobbyFooterText.style.display = 'flex';

        PlayingInCreatedLevel_AsGuest = false;

        if (getComputedStyle(gameModeFields_Div).display != 'none') {
            sceneMode.full();
        };

        if (PlayingInCreatedLevel_AsGuest) {
            sceneMode.full();
            close_all_scenes();
            gameModeFields_Div.style.display = 'flex';

        } else if (inPlayerLevelsScene) {
            sceneMode.default();
            close_all_scenes();
            online_level_scene.style.display = 'flex';
            Lobby.style.background = `linear-gradient(45deg, ${bgcolor1}, ${bgcolor2})`;
        };

        // play music
        PauseMusic();
        if (!PlayingInCreatedLevel) CreateMusicBars(audio);
    };
});

// The third player (blocker) left the game but during a match
socket.on('INFORM_blocker_left_game', () => {
    gameLog_btn.classList.remove('blured');

    pause_clack_sound();
    wheel_of_fortune_scene.style.display = 'none';

    let watch = watch_mode_close_game();
    if (watch) return;

    // The admin sees this after the user left:
    ResetXPlayerWrapper(3);

    // clear timer and stuff to prevent bugs
    clearTimer();

    CloseOnlinePopUps();

    running = false;
    // for the admin, he is in the lobby again
    if (personal_GameData.role == 'admin' || personal_GameData.role == 'user') {
        ChangeGameBG(undefined, undefined, null, true);

        kick_third_player_btn.setAttribute("active_dis", "false");

        if (PlayingInCreatedLevel) {
            CreateLevelScene.style.display = "flex"
            sceneMode.full();

        } else {
            gameModeFields_Div.style.display = 'flex';
            sceneMode.full();
        };

        OnlineGame_Lobby.style.display = 'flex';
        GameField.style.display = 'none';
        friendLeftGamePopUp.style.display = 'flex';
        friendLeft_text.textContent = 'The blocker left the game';
        Lobby_GameCode_display.style.userSelect = 'text';
        Lobby.style.background = "";
        theme.start();

        DarkLayer.style.display = 'block';

        lobbyFooter.style.background = "";
        lobbyFooterText.style.display = 'flex';

        PlayingInCreatedLevel_AsGuest = false;

        if (PlayingInCreatedLevel_AsGuest) {
            sceneMode.full();
            close_all_scenes();
            gameModeFields_Div.style.display = 'flex';

        } else if (inPlayerLevelsScene) {
            sceneMode.default();
            close_all_scenes();
            online_level_scene.style.display = 'flex';
            Lobby.style.background = `linear-gradient(45deg, ${bgcolor1}, ${bgcolor2})`;
        };

        // play music
        PauseMusic();
        if (!PlayingInCreatedLevel) CreateMusicBars(audio);
    };
});

// When the ADMIN leaves the game, the other user needs to be informed by that
// This message goes only to the other user
socket.on('INFORM_admin_left_room', () => {
    gameLog_btn.classList.remove('blured');

    pause_clack_sound();
    wheel_of_fortune_scene.style.display = 'none';

    let watch = watch_mode_close_game();
    if (watch) return;

    // server
    personal_GameData.role = 'user';
    personal_GameData.currGameID = null;
    personal_GameData.EnterOnlineGame = false;

    // some things
    ChangeGameBG(undefined, undefined, null, true);
    OnlineGame_Lobby.style.display = 'none';
    GameField.style.display = 'none';

    if (PlayingInCreatedLevel) {
        CreateLevelScene.style.display = "flex"
        sceneMode.full();

    } else {
        gameModeFields_Div.style.display = 'flex';
        sceneMode.full();
    };

    SetPlayerNamesPopUp.style.display = 'none';
    CloseOnlinePopUps();
    DarkLayer.style.display = 'block';

    // informative pop up for other player
    friendLeftGamePopUp.style.display = 'flex';
    friendLeft_text.textContent = 'The admin disconnected from the game';

    // clear timer and stuff to prevent bugs
    clearTimer();

    // "INFORM_admin_left_room" never gets called in torunament mode. Just... leave the code alone. It doesn't bother you
    if (tournament_mode) {
        close_all_scenes();
        tournaments_scene.style.display = 'flex';
        sceneMode.full();
    };
});

// message to all clients that the game just started
socket.on('StartGame', (RoomData) => { // RoomData
    // console.log(RoomData);

    // simple things
    CloseOnlinePopUps(true);
    tournament_mode && close_all_scenes();
    OnlineGame_Lobby.style.display = "none";
    CreateLevelScene.style.display = "none";
    tournaments_scene.style.display = "none";

    // better user experience, you can call them bug fixes
    ChatMain.textContent = null;
    openedChat = false;
    recievedUnseenMessages = 0;
    if (document.querySelector(".notification-icon")) document.querySelector(".notification-icon").remove();

    // clear timer and stuff to prevent bugs
    clearTimer();

    // many data about the room from the database

    // game data
    let FieldIndex = RoomData[0].fieldIndex;
    let FieldTitle = RoomData[0].fieldTitle;
    let options = JSON.parse(RoomData[0].fieldoptions);
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

    let killdrawnCells = RoomData[0].killAllDrawnCells;

    // initialize game
    curr_innerGameMode = currInnerGameMode;
    // allowed patterns

    let allowed_patterns = JSON.parse(RoomData[0].win_patterns); // array
    allowedPatternsFromUser = allowed_patterns; // make it global for single user

    // required points to win a game
    let required_points_to_win = parseInt(Lobby_PointsToWin.textContent.trim());

    // user costum data (NewCreativeLevel stuff)

    // user costum coord in new creative level
    let costumX = parseInt(JSON.parse(RoomData[0].costumField)[0]);
    let costumY = parseInt(JSON.parse(RoomData[0].costumField)[1]);

    // user costum created patterns
    let costumPatterns = JSON.parse(RoomData[0].costumPatterns);

    // new creative level costum icon
    let costumIcon = RoomData[0].costumIcon;

    costumLevelIcon = costumIcon;

    console.log(costumPatterns, costumX, costumY, costumIcon, costumLevelIcon, killdrawnCells);

    (killdrawnCells == 0) ? killAllDrawnCells = false: killAllDrawnCells = true;

    // play theme music 
    PauseMusic();
    curr_music_name = document.querySelector(`#${RoomData[0].curr_music_name}`);
    // CreateMusicBars(curr_music_name);

    // initialize game with given data
    initializeGame(curr_field_ele, 'OnlineMode', [FieldIndex, FieldTitle, options, player1, player2, player1_icon, player2_icon,
        PlayerTimer, player1_advancedIcon, player2_advancedIcon, player1_SkinColor, player2_SkinColor, player3_name
    ], allowed_patterns, undefined, required_points_to_win, undefined, undefined, [costumX, costumY], costumPatterns, RoomData[0].p1_XP || 1, RoomData[0].p2_XP || 1);

    points_to_win = required_points_to_win;

    OnlinePlayerIDs = {
        1: RoomData[0].player1_id,
        2: RoomData[0].player2_id,
        3: RoomData[0].player3_id
    };

    online_level_scene.style.display = "none";

    player1_score_bar_wrapper.style.background = `linear-gradient(105deg, #3f51b5 ${0}%, transparent ${5}%)`;
    player2_score_bar_wrapper.style.background = `linear-gradient(-105deg, darkred ${0}%, transparent ${5}%)`;

    gameLog_btn.classList.add('blured');

    if (!RoomData[0].can_watch) {
        watching_count_el.style.display = 'none';
    } else {
        watching_count_el.style.display = 'flex';
    };

    globalLevelID = RoomData[0].level_id;

    global_creative_level_data = {};
    global_creative_level_data['level_name'] = FieldTitle;
    global_creative_level_data['required_points'] = required_points_to_win;

    if (random_player_mode) {
        PlayedAgainstNRandomPlayer(true);
        Achievement.new(20);
        Achievement.new(21);
    };
});

// When admin starts game, all clients recieve the global availible options
socket.on('recieveGlobalOptions', message => {
    let Grid = [...cellGrid.children];

    // update old array with modified version
    options = message;

    console.log(options, message, Grid);

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

        } else {
            Grid[i].textContent = null;
            el = '';
            Grid[i].style.backgroundColor = "";
            Grid[i].classList = "cell";
            Grid[i].addEventListener('click', cellCicked);
        };
    };

    // legacy code:
    // This just deletes all '%%' from the options array that were used to block the
    // game cells by their index
    // socket.emit('BoneyardFinalProcess', personal_GameData.currGameID);
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
    if (!curr_field_ele) {
        curr_field_ele = DataFields["20x20"];
    };

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

            xCell_Amount = parseInt(SpecificData.split('x')[0]);
            yCell_Amount = parseInt(SpecificData.split('x')[1]);

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
    if (e.code === "Backspace" && Lobby_PointsToWin.textContent.length <= 0) {
        e.preventDefault();
        // return;
    };

    if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        return;
    };

    typeof Number(Lobby_PointsToWin.textContent) === 'number' && socket.emit("AdminChangesPointsToWin_InLobby", personal_GameData.currGameID, Lobby_PointsToWin.textContent.trim());
});

// admin changed the required amount of points in lobby: update value for all in the lobby
socket.on("AdminChanged_PointsToWin", value => {
    points_to_win = value;
    Lobby_PointsToWin.textContent = value;
});

// check if the player already was in the game once
socket.on('CheckIfPlayerAlreadyExists', () => {
    if (localStorage.getItem('PlayerOpenedThisGameAtleastOnceInHisLife')) {
        socket.emit("PlayerAlreadyExists", localStorage.getItem("PlayerID"), localStorage.getItem('treasureIsAvailible'), cb => {

            if (cb) {
                closeAlertPopUpBtn.style.display = "none";
                AlertText.textContent = 'You are banned';
                DisplayPopUp_PopAnimation(alertPopUp, 'flex', true);
            };
        });

    } else {
        socket.emit("PlayerNotExisted");
        localStorage.setItem('PlayerOpenedThisGameAtleastOnceInHisLife', true);
    };
});

// server generates random player id if he is the first time in this game
socket.on("RandomPlayerID_generated", id => {
    // console.log(id)
    localStorage.setItem("PlayerID", id);
});

// online game chat button
function open_chat_window() {
    personalname = localStorage.getItem('UserName');
    DisplayPopUp_PopAnimation(Chat_PopUp, "flex", true);

    openedChat = true;
    recievedUnseenMessages = 0;
    if (document.querySelector(".notification-icon")) document.querySelector(".notification-icon").remove();

    ChatTitle.textContent = `Lobby chat`;
};

OnlineChat_btn.addEventListener('click', () => {
    open_chat_window();
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

    !openedChat ? createNotificationIcon() : openedChat;
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

// kick btns
kick_second_player_btn.addEventListener('click', () => {
    socket.emit('kick_user_from_lobby', 'user', personal_GameData.currGameID, cb => {

    });
});

kick_third_player_btn.addEventListener('click', () => {
    socket.emit('kick_user_from_lobby', 'blocker', personal_GameData.currGameID, cb => {

    });
});

// client (user, blocker) gets kick message
socket.on('lobby_kick', (user_type) => {
    if (personal_GameData.role == user_type) {
        Lobby_closeBtn.click();

        AlertText.textContent = 'You got kicked out of the lobby';
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
        return;
    };

    if (user_type == 'user') {
        // The other players see this after the user left:
        ResetXPlayerWrapper(2);
    };

    if (user_type == 'blocker') {
        // The other players see this after the user left:
        ResetXPlayerWrapper(3);
    };
});

// allow other players to watch game toggle btn
allow_players_watch_el.addEventListener('click', (e) => {
    let toggle_btn = allow_players_watch_el.querySelector('i');

    if (toggle_btn.className == 'fa-regular fa-check-square') {
        toggle_btn.className = 'fa-regular fa-square';

        socket.emit('update_can_watch_game', personal_GameData.currGameID, false);

    } else {
        toggle_btn.className = 'fa-regular fa-check-square';
        socket.emit('update_can_watch_game', personal_GameData.currGameID, true);
    };
});