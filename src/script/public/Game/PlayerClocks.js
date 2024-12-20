function Activate_PlayerClock(PlayerOne, PlayerTwo) {
    killPlayerClocks(false);
    if (PlayerOne) update1();
    if (PlayerTwo) update2();
};

// kill all intervals
async function killPlayerClocks(clearEyeInterval, command, playerN_timer_event, playerN_timer, playerInNumber) {

    if (curr_mode != GameMode[2].opponent) { // offline mode

        clearInterval(firstClock);
        clearInterval(secondClock);
        firstClock = null;
        secondClock = null;
        // special boss timer
        if (clearEyeInterval) {
            clearInterval(eye_attack_interval_global);
            clearInterval(sun_attack_interval_global);
            sun_attack_interval_global = null;
            eye_attack_interval_global = null;
        };

        FirstPlayerTime.textContent = `${GameData.PlayerClock} `;
        SecondPlayerTime.textContent = `${GameData.PlayerClock}`;

    } else { // online mode

        if (command == "stop") {
            await socket.emit("stop_Players_timer", parseInt(personal_GameData.currGameID));

        } else if (command == "Reset&&Continue") {

            // send new request to display the current player times
            await socket.emit("Request_Players_timer", parseInt(personal_GameData.currGameID), playerN_timer_event, playerN_timer, playerInNumber, currentPlayer, global_playerTimer);
        };
    };

    SecondPlayerTime.style.color = 'var(--font-color)';
    FirstPlayerTime.style.color = 'var(--font-color)';
};

// remove acccess to anything
function removeAccessToAnything() {
    if (watch_mode) return;

    globalChooseWinnerBtn.removeEventListener('click', openChooseWinnerWindow);
    restartBtn.removeEventListener('click', restartGame);
    leaveGame_btn.removeEventListener('click', UserleavesGame);
    giveUp_Yes_btn.removeEventListener('click', function() { UserGivesUp(personal_GameData.role) });
    leaveGame_btn.style.color = '#56565659';
    globalChooseWinnerBtn.style.color = '#56565659';
    restartBtn.removeEventListener('click', restartGame);
    restartBtn.style.color = '#56565659';

    !current_level_boss && CloseOnlinePopUps(true);

    if (UseSpell_PopUp.style.display == "flex") {
        UseSpell_PopUp.style.display = "none";
        DarkLayer.style.display = "none"
    };

    // remove access to set
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
        cell.style.cursor = "default";
    });

    // console.log(player3_can_set);

    if (player3_can_set && !inAdvantureMode) {
        leaveGame_btn.addEventListener('click', UserleavesGame);
        restartBtn.addEventListener('click', restartGame);
        restartBtn.style.color = 'white';
        leaveGame_btn.style.color = 'white';
        running = true;

        if (personal_GameData.role == "blocker") {
            cells.forEach(cell => {
                cell.style.cursor = "cursor";
                cell.addEventListener('click', cellCicked);
            });
        };
    };
};

// add excess to anything
function addAccessToAnything(TimerEnded, fromBeginning, FromGameAnimation) {
    if (watch_mode) {
        leaveGame_btn.style.color = 'white';
        leaveGame_btn.addEventListener('click', UserleavesGame);
        return;
    };

    globalChooseWinnerBtn.addEventListener('click', openChooseWinnerWindow);
    restartBtn.addEventListener('click', restartGame);
    leaveGame_btn.addEventListener('click', UserleavesGame);
    // giveUp_Yes_btn.addEventListener('click', function() { UserGivesUp(personal_GameData.role) });
    leaveGame_btn.style.color = 'white';
    globalChooseWinnerBtn.style.color = 'white';
    restartBtn.style.color = 'white';

    !fromBeginning && checkWinner();

    if (FromGameAnimation) {
        running = true;
        // player gets access to set again
        cells.forEach(cell => {
            cell.addEventListener('click', cellCicked);
            cell.classList.length <= 1 ? cell.style.cursor = 'pointer' : cell.style.cursor = 'default';
        });
    };
};

// add excess to anything in online mode
function addAccesOnlineMode(TimerEnded, fromBeginning) {
    if (watch_mode) return;

    // allowed to leave againW
    leaveGame_btn.addEventListener('click', UserleavesGame);
    leaveGame_btn.style.color = 'var(--font-color)';
    // in online mode this button is to capitulate
    chooseWinnerWindowBtn.addEventListener('click', openChooseWinnerWindow);
    globalChooseWinnerBtn.style.color = 'var(--font-color)';
    // giveUp_Yes_btn.addEventListener('click', function() { UserGivesUp(personal_GameData.role) });

    // only admin can restart game
    if (personal_GameData.role == 'admin') {
        restartBtn.addEventListener('click', restartGame);
        restartBtn.style.color = 'var(--font-color)';
    };

    running = true;

    // player gets access to set again
    cells.forEach(cell => {
        cell.addEventListener('click', cellCicked);

        if (!cell.classList.contains("draw") && !cell.classList.contains("death-cell")) {
            cell.style.cursor = 'pointer';

        } else {
            cell.style.cursor = 'default';
        };
    });

    !fromBeginning && checkWinner();
};

// modify cellGrid for animation
function modifyCellgrid() {
    cellGrid.classList.remove('cellGrid_opacity');
    cellGrid.classList.add('cellGrid-alert');
};

// modify cellGrid for animation
function initCellgrid() {
    cellGrid.classList.remove('cellGrid-alert');
    cellGrid.style.backgroundColor = "";
};

function update1() {
    // In online mode, the admin sends an emit to the server so the server sends an emit
    // to all clients
    if (curr_mode == GameMode[2].opponent) {

    } else if (curr_mode != GameMode[2].opponent) {
        let Seconds = GameData.PlayerClock;

        firstClock = setInterval(() => {
            Seconds--;
            FirstPlayerTime.textContent = `${Seconds}`;

            // time is almost out, dangerous
            if (Seconds <= 2) {
                FirstPlayerTime.style.color = 'red';
            };

            // Time is out. play cool animation and next player's turn
            if (Seconds == 0) {
                EndOfPlayerTimer();
            };
        }, 1000);
    };
};

function update2() {
    // In online mode, the admin sends an emit to the server so the server sends an emit
    // to all clients
    if (curr_mode == GameMode[2].opponent) {

    } else if (curr_mode != GameMode[2].opponent) {
        let Seconds = GameData.PlayerClock;

        secondClock = setInterval(() => {
            Seconds--;
            SecondPlayerTime.textContent = `${Seconds}`;

            // time is almost out, dangerous
            if (Seconds <= 2) {
                SecondPlayerTime.style.color = 'red';
            };

            // Time is out. play cool animation and next player's turn
            if (Seconds == 0) {
                EndOfPlayerTimer();
            };
        }, 1000);
    };
};

// from the server to all clients in online mode
socket.on('playerTimer', (player1_timer, player2_timer, currentPlayer, watching_count) => {
    FirstPlayerTime.textContent = `${player1_timer} `;
    SecondPlayerTime.textContent = `${player2_timer}`;
    watching_count_el.textContent = `watching: ${watching_count}`;

    // console.log(player1_timer, player2_timer, currentPlayer, running);

    ChangePlayerOnNumber(currentPlayer);

    if (watch_mode) return; // client is in watch mode. do not collide with player timer functionality

    if (running) {

        if (currentPlayer == 1 && !player3_can_set) {
            player1_can_set = true;

            if (personal_GameData.role == "admin") {
                addAccesOnlineMode(true, true);

            } else {
                // remove access to set
                cells.forEach(cell => {
                    cell.removeEventListener('click', cellCicked);
                    cell.style.cursor = "default";
                });
            };

        } else if (currentPlayer == 2 && !player3_can_set) {
            player1_can_set = false;

            if (personal_GameData.role == "user") {
                addAccesOnlineMode(true, true);

            } else {
                // remove access to set
                cells.forEach(cell => {
                    cell.removeEventListener('click', cellCicked);
                    cell.style.cursor = "default";
                });
            };
        };

    } else if (player3_can_set) {

        if (personal_GameData.role == "blocker") {
            statusText.textContent = "You can block now!";
            running = true;
            addAccesOnlineMode(true, true);

        } else {
            // remove access to set
            cells.forEach(cell => {
                cell.removeEventListener('click', cellCicked);
                cell.style.cursor = "default";
            });
        };
    };

    // time is almost out, dangerous
    if (personal_GameData.role == 'admin') {
        if (player1_timer <= 2) {
            FirstPlayerTime.style.color = 'red';

        } else FirstPlayerTime.style.color = 'white';
    };

    if (personal_GameData.role == 'user') {
        if (player2_timer <= 2) {
            SecondPlayerTime.style.color = 'red';

        } else SecondPlayerTime.style.color = 'white';
    };

    if (player1_timer <= 0 || player2_timer <= 0) {
        removeAccessToAnything();
    };

    if (player1_timer <= 1 || player2_timer <= 1) {
        if (player3_can_set && personal_GameData.role == "blocker") {
            running = true;

        } else {
            running = false;
        };

    } else {
        running = true;
    };
});

socket.on("EndOfPlayerTimer", (currentPlayer) => {
    // console.log("lol");
    // removeAccessToAnything();

    SecondPlayerTime.style.color = 'var(--font-color)';
    FirstPlayerTime.style.color = 'var(--font-color)';

    // animational purpose
    // modifyCellgrid();

    // setTimeout(() => {

    // make cell grid normal again
    // initCellgrid();

    // addAccesOnlineMode("TimerEnded", true);

    // now it's player x turn in online mode
    if (curr_mode == GameMode[2].opponent) {

        ChangePlayerOnNumber(currentPlayer);

        if (currentPlayer == 1) {
            player1_can_set = true;

        } else if (currentPlayer == 2) {
            player1_can_set = false;
        };
    };

    // checkWinner();
    addAccesOnlineMode(true, true);

    running = true;
    // }, 1000);
});

// for offline game
function EndOfPlayerTimer() {
    // remove access to do anything
    removeAccessToAnything();
    // reset player clocks
    killPlayerClocks(false);

    if (GameData.InnerGameMode == InnerGameModes[2]) {
        // now the third player can set his block
        Activate_InteractiveBlocker();
    };

    setTimeout(() => {
        // make cell grid normal again
        initCellgrid();

        // add access to anything, user is restricted
        addAccessToAnything("TimerEnded", true, true);

        // continue game
        checkWinner();
    }, 1000);
};

socket.on('update_watching_count', (watch_count) => {
    watching_count_el.textContent = `watching: ${watch_count}`;
});