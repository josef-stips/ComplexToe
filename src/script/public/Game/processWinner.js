// wether a win combination found or not. Variable sets back to false after win animation. This is just for bug prevention
let win_found = false;

function checkWinner(fromRestart, fromClick) { // the first two parameter are just for the online mode when the third player blocked
    let roundWon = false;
    let Player1_won = false; // check if x has won
    let Player2_won = false; // check if o has won
    // for minimax
    let winner = null;
    let WinCombination = [];
    let extra_points = 0; // n additional points by a win pattern of 5 cells
    let Grid = Array.from(cellGrid.children);
    let someoneIsCheck = false;

    if (win_found) return;

    // remove access to set
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
        cell.style.cursor = "default";
    });
    running = false;

    for (let i = 0; i < WinConditions.length; i++) {
        const condition = WinConditions[i];

        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];
        let cellD = options[condition[3]];
        let cellE = options[condition[4]]; // fifth block

        let EleOf_A = Grid[condition[0]];
        let EleOf_B = Grid[condition[1]];
        let EleOf_C = Grid[condition[2]];
        let EleOf_D = Grid[condition[3]];
        let EleOf_E = Grid[condition[4]];

        // Check win
        if (cellE == undefined && cellD != undefined) { // if pattern with 4 blocks
            // check when player is check
            if (cellA == cellB && cellB == cellC && cellD == "" && EleOf_D.textContent == "" && EleOf_D.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellA == cellB && cellB == cellD && cellC == "" && EleOf_C.textContent == "" && EleOf_C.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellA == cellD && cellD == cellC && cellB == "" && EleOf_B.textContent == "" && EleOf_B.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellD == cellC && cellC == cellB && cellA == "" && EleOf_A.textContent == "" && EleOf_A.className != "cell death-cell" && cellD != "" && EleOf_D.textContent != "") {
                someoneIsCheck = true;
                // console.log(cellA, cellB, cellC, cellD, cellE)
                // console.log(EleOf_A, EleOf_B, EleOf_C, EleOf_D, EleOf_E)

                // look who the pattern belongs to
                if (EleOf_A.textContent == PlayerData[1].PlayerForm || EleOf_B.textContent == PlayerData[1].PlayerForm || EleOf_C.textContent == PlayerData[1].PlayerForm ||
                    EleOf_D.textContent == PlayerData[1].PlayerForm || EleOf_A.className == PlayerData[1].AdvancedSkin || EleOf_B.className == PlayerData[1].AdvancedSkin ||
                    EleOf_C.className == PlayerData[1].AdvancedSkin || EleOf_D.className == PlayerData[1].AdvancedSkin) {
                    // belongs to first player => second player must be warned
                    if (curr_mode == GameMode[2].opponent) {
                        // online mode                        
                        if (personal_GameData.role == "user") {
                            CheckmateWarnText.style.display = 'block';
                            CheckmateWarnText.textContent = `${PlayerData[1].PlayerName} can beat you with one move, ${PlayerData[2].PlayerName}!`;
                        };
                        continue;

                    } else if (curr_mode == GameMode[3].opponent) {
                        // same computer mode
                        CheckmateWarnText.style.display = 'block';
                        CheckmateWarnText.textContent = `Your opponent can beat you with one move, ${PlayerData[2].PlayerName}`;

                        continue;
                    };

                } else {
                    // belongs to second player => first player must be warned
                    if (curr_mode == GameMode[2].opponent) {

                        // online mode
                        if (personal_GameData.role == "admin") {
                            CheckmateWarnText.style.display = 'block';
                            CheckmateWarnText.textContent = `${PlayerData[2].PlayerName} can beat you with one move, ${PlayerData[1].PlayerName}!`;
                        };
                        continue;

                    } else {
                        // other mode
                        CheckmateWarnText.style.display = 'block';

                        // KI Mode
                        if (curr_mode == GameMode[1].opponent) {
                            if (inAdvantureMode) { // in advanture mode
                                CheckmateWarnText.textContent = ``;

                            } else { // not in advanture mode
                                CheckmateWarnText.textContent = `The ${PlayerData[2].PlayerName} can beat you with one move, ${PlayerData[1].PlayerName}`;
                            };
                            continue;

                        } else {
                            CheckmateWarnText.textContent = `Your opponent can beat you with one move, ${PlayerData[1].PlayerName}`;
                            continue;
                        };
                    };
                };
            };

            if (cellA == cellB && cellB == cellC && cellC == cellD && cellA != "") {
                winner = [cellA, EleOf_A.classList[2]];
                roundWon = true;
                WinCombination.push(EleOf_A, EleOf_B, EleOf_C, EleOf_D);

                break;
            };

            if (!someoneIsCheck) CheckmateWarnText.style.display = "none";

        } else if (cellD == undefined && cellE == undefined && cellC != undefined) { // Check win for a 3 block pattern combination

            if (cellA == "" || cellB == "" || cellC == "") {
                continue
            };
            if (cellA == cellB && cellB == cellC) {
                winner = [cellA, EleOf_A.classList[2]];
                roundWon = true;
                WinCombination.push(EleOf_A, EleOf_B, EleOf_C);

                break;
            };

        } else if (cellD != undefined && cellE != undefined) { // Check win for a 5 block pattern combination
            // check when player is check
            if (cellA == cellB && cellB == cellC && cellC == cellD && cellE == "" && EleOf_E.textContent == "" && EleOf_E.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellA == cellB && cellB == cellC && cellC == cellE && cellD == "" && EleOf_D.textContent == "" && EleOf_D.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellA == cellB && cellB == cellD && cellD == cellE && cellC == "" && EleOf_C.textContent == "" && EleOf_C.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellA == cellC && cellC == cellD && cellD == cellE && cellB == "" && EleOf_B.textContent == "" && EleOf_B.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellB == cellC && cellC == cellD && cellD == cellE && cellA == "" && EleOf_A.textContent == "" && EleOf_A.className != "cell death-cell" && cellB != "" && EleOf_B.textContent != "") {
                someoneIsCheck = true;
                // console.log(cellA, cellB, cellC, cellD, cellE)
                // console.log(EleOf_A, EleOf_B, EleOf_C, EleOf_D, EleOf_E)

                // look who the pattern belongs to
                if (EleOf_A.textContent == PlayerData[1].PlayerForm || EleOf_B.textContent == PlayerData[1].PlayerForm || EleOf_C.textContent == PlayerData[1].PlayerForm ||
                    EleOf_D.textContent == PlayerData[1].PlayerForm || EleOf_E.textContent == PlayerData[1].PlayerForm || EleOf_A.className == PlayerData[1].AdvancedSkin || EleOf_B.className == PlayerData[1].AdvancedSkin ||
                    EleOf_C.className == PlayerData[1].AdvancedSkin || EleOf_D.className == PlayerData[1].AdvancedSkin || EleOf_E.className == PlayerData[1].AdvancedSkin) {
                    // belongs to first player => second player must be warned
                    if (curr_mode == GameMode[2].opponent) {
                        // online mode                        
                        if (personal_GameData.role == "user") {
                            CheckmateWarnText.style.display = 'block';
                            CheckmateWarnText.textContent = `${PlayerData[1].PlayerName} can beat you with one move, ${PlayerData[2].PlayerName}!`;
                        };
                        continue;

                    } else if (curr_mode == GameMode[3].opponent) {
                        // computer mode
                        CheckmateWarnText.style.display = 'block';
                        CheckmateWarnText.textContent = `Your opponent can beat you with one move, ${PlayerData[2].PlayerName}`;
                        continue;
                    };

                } else {
                    // belongs to second player => first player must be warned
                    if (curr_mode == GameMode[2].opponent) {
                        // online mode
                        if (personal_GameData.role == "admin") {
                            CheckmateWarnText.style.display = 'block';
                            CheckmateWarnText.textContent = `${PlayerData[2].PlayerName} can beat you with one move, ${PlayerData[1].PlayerName}!`;
                        };
                        continue;

                    } else {
                        // other mode
                        CheckmateWarnText.style.display = 'block';
                        // KI Mode
                        if (curr_mode == GameMode[1].opponent) {
                            if (inAdvantureMode) { // in advanture mode
                                CheckmateWarnText.textContent = ``;

                            } else { // not in advanture mode
                                CheckmateWarnText.textContent = `The ${PlayerData[2].PlayerName} can beat you with one move, ${PlayerData[1].PlayerName}`;
                            };
                            continue;

                        } else {
                            CheckmateWarnText.textContent = `Your opponent can beat you with one move, ${PlayerData[1].PlayerName}`;
                            continue;
                        };
                    };
                };
            };

            if (cellA == cellB && cellB == cellC && cellC == cellD && cellD == cellE && cellA != "") {
                winner = [cellA, EleOf_A.classList[2]]; // second value: false if the user uses a normal skin
                roundWon = true;
                WinCombination.push(EleOf_A, EleOf_B, EleOf_C, EleOf_D, EleOf_E);

                break;
            };

            if (!someoneIsCheck) CheckmateWarnText.style.display = "none";

        } else if (cellD == undefined && cellE == undefined && cellC == undefined && cellB != undefined && cellA != undefined) {
            if (cellA != "" && cellA == cellB) {
                winner = [cellA, EleOf_A.classList[2]]; // second value: false if the user uses a normal skin
                roundWon = true;
                WinCombination.push(EleOf_A, EleOf_B);
            };
        };
    };

    // when win pattern check to which player it belongs to to determine the winner
    if (winner != null) {

        let winCellClassName = removeInvisibleChars(WinCombination[0].className.replace("draw", ""));
        let player1AdvSkin = removeInvisibleChars(PlayerData[1].AdvancedSkin);
        let player2AdvSkin = removeInvisibleChars(PlayerData[2].AdvancedSkin);

        if (player1AdvSkin == winCellClassName) { // the advanced skin win pattern belongs to PLayer 1
            Player1_won = true;

        } else if (player2AdvSkin == winCellClassName) { // the advanced skin win pattern belongs to PLayer 2
            Player2_won = true;
        };

        if (PlayerData[1].PlayerForm == winner[0]) { // the normal skin pattern belongs to the first player
            Player1_won = true;

        } else if (PlayerData[2].PlayerForm == winner[0]) {
            Player2_won = true;
        };

        let pattern_name = WinCombination && FindPatternName([...WinCombination], xCell_Amount, yCell_Amount);
        extra_points = all_patterns_in_game[pattern_name].value || 1;

        patterns_used.push({ 'pattern': pattern_name, 'by': Player1_won ? PlayerData[1].PlayerName : PlayerData[2].PlayerName, 'indexes': [...WinCombination].map(el => parseInt(el.getAttribute("cell-index"))), 'on_nth_move': [...all_game_moves.entries()][all_game_moves.length - 1][0], 'value': all_patterns_in_game[pattern_name].value });

        console.log(WinCombination, pattern_name, extra_points, winner[0], PlayerData[1].PlayerForm, all_game_moves);
    };

    ProcessResult(Player1_won, Player2_won, roundWon, winner, WinCombination, extra_points, fromRestart, fromClick);
};

function ProcessResult(Player1_won, Player2_won, roundWon, winner, WinCombination, extra_points, fromRestart, fromClick) {
    // check if there are still availible cells remaining
    let ava_cells = check_RemainingCells();

    if (roundWon) { // someone won the round
        processResult_RoundWon(Player1_won, Player2_won, WinCombination, extra_points, fromRestart, fromClick);

    } else if (ava_cells.length <= 0) { // there are literally no availible cells on the field to set => process who is the winner now
        Call_UltimateWin(WinCombination);
        return;

    } else if (inAdvantureMode) { // In the advanture mode there are special win conditions
        processResult_AdvantureMode(Player1_won, Player2_won, roundWon, winner, WinCombination);

    } else { // if nothing special happened , no one won and if not in advanture mode => do normal stuff
        processResult_continueGame(fromRestart, fromClick);
    };
};

// process result of game: if a sub game round is won 
function processResult_RoundWon(Player1_won, Player2_won, WinCombination, extra_points, fromRestart, fromClick) {
    killPlayerClocks(false);

    running = false;
    win_found = true;

    // Choose winner
    chooseSubWinner(Player1_won, Player2_won, WinCombination, extra_points).then((KI_CanSetASecondTime) => {

        // Make cells die effect
        if (curr_field != 'Small Price' || curr_field != 'Thunder Advanture') {
            setTimeout(() => {
                let grid = [...cellGrid.children];
                // console.log(WinCombination, killAllDrawnCells);

                if (killAllDrawnCells) { // wether all cells which are drawn should be blocked/killed or only the one from the win combination

                    // Make used cells die
                    for (let cell of grid) {
                        // cells with normal skins => look if their textContent is a form, cells with advanced skins => look at their classList
                        // All cells that contain an advanced skin have atleast 3 items in their classList (cell fa-solid fa-xxx)
                        if (cell.textContent == PlayerData[1].PlayerForm || cell.textContent == PlayerData[2].PlayerForm || cell.classList.length >= 3 && cell.classList.contains("draw")) {
                            single_CellBlock(cell, undefined, WinCombination);
                        };
                    };

                } else {
                    WinCombination.forEach(cell => single_CellBlock(cell, undefined, WinCombination));

                    // make a list of cells that are still in the game
                    for (let cell of grid) {

                        if (cell.textContent != "" || cell.classList.length >= 3 && cell.classList.contains("draw")) {
                            stillActiveCells.push(cell);
                        };
                    };
                };
            }, 600);
        };

        // Change player things. execute this everytime
        setTimeout(() => {
            if (!inAdvantureMode) {
                processResult_continueGame(fromRestart, fromClick, true);

            } else {
                if (KI_CanSetASecondTime != "KI_CanSetASecondTime") {
                    processResult_continueGame();
                };
            };
        }, 1000);

    });
};

// process result: advanture mode (special)
function processResult_AdvantureMode(WinCombination) {
    // in advanture mode there are special win conditions for each level (10 levels)
    switch (current_selected_level) {
        case 1:
            if (score_Player1_numb >= points_to_win) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 5 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination, undefined, 5);

            } else { // No one won
                processResult_continueGame();
            };
            break;

        case 2:
            if (score_Player1_numb >= points_to_win) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 5 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination, undefined, 5);

            } else { // No one won
                processResult_continueGame();
            };
            break;

        case 3:
            if (score_Player1_numb >= points_to_win) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 4 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination, undefined, 4);

            } else { // No one won
                processResult_continueGame();
            };
            break;

        case 4:
            // console.log(current_level_boss, current_level_boss.hp);

            if (score_Player1_numb >= points_to_win && current_level_boss.hp <= 0) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 4 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination, undefined, 4);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 5:
            if (score_Player1_numb >= points_to_win) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 5 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination, undefined, 5);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 6:
            if (score_Player1_numb >= points_to_win) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 5 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination, undefined, 5);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 7:
            if (score_Player1_numb >= points_to_win) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 1 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination, undefined, 1);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 8:
            if (score_Player1_numb >= points_to_win) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 3 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination, undefined, 3);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 9:
            if (score_Player1_numb >= points_to_win && current_level_boss.hp <= 0) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 5 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination, undefined, 5);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 10:
            if (score_Player1_numb >= points_to_win && current_level_boss.hp <= 0) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 3 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination, undefined, 3);

            } else { // No one won
                processResult_continueGame();
            };
            break;
    };
};

// everything processed and checked. Now the game can continue and the other player can set now
function processResult_continueGame(fromRestart, fromClick, won) {
    win_found = false;

    // if in advanture mode
    if (inAdvantureMode) {
        setTimeout(() => {
            if (currentPlayer == PlayerData[1].PlayerForm) { // player's turn

                if (PlayerIsAllowedToSetTwoTimes) { // player can place two times in a row through a forbidden spell he found on a cell
                    running = true;

                    AdvantureMode_SpellDisplay.style.color = "white";

                    // player gets access to set again
                    cells.forEach(cell => {
                        cell.addEventListener('click', cellCicked);

                        if (cell.classList.contains("draw") || cell.classList.contains("death-cell")) {
                            cell.style.cursor = 'default';

                        } else {
                            cell.style.cursor = 'pointer';
                        };
                    });

                    UserClicksNTimesInARow++;
                    if (UserClicksNTimesInARow >= 1) {
                        PlayerIsAllowedToSetTwoTimes = false;
                        UserClicksNTimesInARow = 0;
                    };

                } else {
                    AdvantureMode_SpellDisplay.style.color = "grey";
                    changePlayer(false);
                    ki.init();
                };

            } else {
                // ki is allowed to place two times in a row
                changePlayer(false);
                running = true;

                AdvantureMode_SpellDisplay.style.color = "white";
            };
        }, 100);

    } else { // not in advanture mode

        // if in KI Mode and Player just setted his icon. Now it is KI's turn
        if (curr_mode == GameMode[1].opponent && !won) {
            setTimeout(() => {
                // Check who can set next the bot or the player
                if (currentPlayer == PlayerData[1].PlayerForm) {
                    changePlayer(false);
                    ki.init();

                } else {
                    changePlayer(false);
                    running = true;
                };
            }, 200);

        } else if (curr_mode != GameMode[1].opponent) { // It is not KI Mode

            // add access to set
            setTimeout(() => {
                running = true;
                changePlayer(false, fromClick);
            }, 100);
        };
    };
};

// when user win, from the field icons float to his name ot the left
const FloatingIconAnimation = (player1_won, player2_won, StartPos, amount) => {
    let icon;
    let iconIsAdvanced;
    let destination;

    // init icon
    if (player1_won && !player2_won) { // player 1 icons
        if (PlayerData[1].AdvancedSkin != "cell empty") {
            icon = `${PlayerData[1].AdvancedSkin.split(" ")[1]}  ${PlayerData[1].AdvancedSkin.split(" ")[2]}`;
            iconIsAdvanced = true;

        } else {
            icon = PlayerData[1].PlayerForm;
            iconIsAdvanced = false;
        };
        destination = namePlayer1.getBoundingClientRect();

    } else if (!player1_won && player2_won) { // player 2 icons
        if (PlayerData[2].AdvancedSkin != "cell empty") {
            icon = `${PlayerData[2].AdvancedSkin.split(" ")[1]}  ${PlayerData[2].AdvancedSkin.split(" ")[2]}`;
            iconIsAdvanced = true;

        } else {
            icon = PlayerData[2].PlayerForm;
            iconIsAdvanced = false;
        };
        destination = namePlayer2.getBoundingClientRect();
    };

    // where the floating items should float? What's the destination?
    const AnimateTo = (destination, span) => {
        try {
            span.style.top = destination.top + "px";
            span.style.bottom = destination.bottom + "px";
            span.style.left = destination.left + "px";
            span.style.right = destination.right + "px";
            setTimeout(() => {
                span.style.opacity = "0";
            }, 250);
        } catch (error) {
            span.remove();
            return;
        };
    };

    // init item
    const InitItem = (icon, iconIsAdvanced, StartPos) => {
        let span = document.createElement("span");
        (iconIsAdvanced) ? span.classList = icon: span.textContent = icon; // if icon is advanced. modify classlist otherwise text
        span.classList.add("floating-item");
        // position
        span.style.fontSize = "2.87vh";
        span.style.position = "absolute";
        span.style.animation = "1.9s SmallToBigToSmallQuickly ease-in-out";
        span.style.zIndex = "10001";
        span.style.top = StartPos.top + "px";
        span.style.bottom = StartPos.bottom + "px";
        span.style.left = StartPos.left + "px";
        span.style.right = StartPos.right + "px";

        document.body.appendChild(span);

        setTimeout(() => {
            AnimateTo(destination, span);
            span.style.transition = "opacity 2s ease-out, top 1.5s ease-in-out, bottom 1.5s ease-in-out, left 1.5s ease-in-out, right 1.5s ease-in-out";

            setTimeout(() => {
                span.remove();
            }, 2000);
        }, 100);
    };

    InitItem(icon, iconIsAdvanced, StartPos);
};

// check and return wether the player beat the boss
// if no boss, return true
const advantureMap_beatBoss = () => {
    return (current_level_boss != undefined) ? ((current_level_boss.hp <= 0) ? true : false) : true
};

// choose sub winner
function chooseSubWinner(Player1_won, Player2_won, WinCombination, extra_points) {
    return new Promise((resolve) => {

        CheckmateWarnText.style.display = 'none';
        // animation
        try {
            FloatingIconAnimation(Player1_won, Player2_won, WinCombination[0].getBoundingClientRect(), WinCombination.length);
        } catch (error) {
            console.log(error, Player1_won, Player2_won);
        };

        // win pattern stuff
        WinCombination.forEach(Ele => {
            Ele.classList.add('about-to-die-cell');
        });

        // for advanture mode
        MovesAmount_PlayerAndKi = 0;
        KI_play_mode = "defend";

        // processing
        setTimeout(() => {
            if (Player1_won == true) {
                statusText.textContent = `${PlayerData[1].PlayerName} just gained a point!`;
                score_Player1_numb = score_Player1_numb + extra_points;
                scorePlayer1.textContent = score_Player1_numb;
                scoreUp_animation(1, score_Player1_numb, points_to_win);

                try {
                    if (personal_GameData.role == 'admin') {
                        console.log(WinCombination);
                        socket.emit('update_game_points', personal_GameData.currGameID, score_Player1_numb, score_Player2_numb, [...WinCombination].map(el => parseInt(el.getAttribute("cell-index"))));
                    };

                } catch (error) {
                    console.log(error);
                };

                // player made a point in advanture mode
                if (inAdvantureMode) {
                    statusText.textContent = `You just gained a point!`;
                    // If player passed the requirement to win the level
                    if (score_Player1_numb >= points_to_win && advantureMap_beatBoss()) {
                        Player1_won = false;
                        running = false;
                        processResult_AdvantureMode(WinCombination);
                        return;
                    };

                    // player plays boss level
                    if (current_selected_level == 10) {
                        current_level_boss.damage(Math.floor(Math.random() * (499 - 370 + 1)) + 370); // random damage on eye between 370-499

                    } else if (current_selected_level == 9) {
                        current_level_boss.damage(Math.floor(Math.random() * (699 - 370 + 1)) + 370); // random damage on sun between 370-699

                    } else if (current_selected_level == 4) {
                        current_level_boss.damage(Math.floor(Math.random() * (799 - 470 + 1)) + 470); // random damage 
                    };

                    NewWinCombisDuringGame();
                    let result = Check_KI_canSetTwoTimesInARow(current_selected_level);

                    result ? resolve("KI_CanSetASecondTime") : resolve();
                    return;

                } else if (score_Player1_numb >= points_to_win) {
                    Player1_won = false;
                    running = false;
                    Call_UltimateWin(WinCombination);
                    return;
                };

                // online mode
                if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'admin') {
                    statusText.textContent = `You just gained a point!`;

                    recentUsedPattern_add(WinCombination, xCell_Amount, yCell_Amount); // add used pattern to recently used pattern list

                } else if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'user') {
                    statusText.textContent = `${PlayerData[1].PlayerName} just gained a point!`;
                };

                // this commented code is only for test purposes
                // if (curr_mode == GameMode[3].opponent) { // computer mode/ offline mode against a friend
                //     recentUsedPattern_add([...WinCombination].map(el => parseInt(el.getAttribute("cell-index")))); // add used pattern to recently used pattern list
                // };

                Player1_won = false;
                resolve();

            } else if (Player2_won == true) {
                statusText.textContent = `${PlayerData[2].PlayerName} just gained a point!`;
                score_Player2_numb = score_Player2_numb + extra_points;
                scorePlayer2.textContent = score_Player2_numb;
                scoreUp_animation(2, score_Player2_numb, points_to_win);

                try {
                    if (personal_GameData.role == 'admin') {
                        console.log(WinCombination);
                        socket.emit('update_game_points', personal_GameData.currGameID, score_Player1_numb, score_Player2_numb, [...WinCombination].map(el => parseInt(el.getAttribute("cell-index"))));
                    };

                } catch (error) {
                    console.log(error);
                };

                // the opponent made a point in advanture mode
                if (inAdvantureMode) {
                    statusText.textContent = `the unknown just gained a point`;
                    if (score_Player2_numb >= points_to_win) {
                        statusText.textContent = `You lost against the evil. Are you willing to try again?`;
                        Player2_won = false;
                        Call_UltimateWin(WinCombination);
                        return;
                    };
                };

                if (score_Player2_numb >= points_to_win) {
                    Player2_won = false;
                    running = false;
                    Call_UltimateWin(WinCombination);
                    return;
                };

                // online mode
                if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'user') {
                    statusText.textContent = `You just gained a point!`;

                    recentUsedPattern_add(WinCombination, xCell_Amount, yCell_Amount); // add used pattern to recently used pattern list

                } else if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'admin') {
                    statusText.textContent = `${PlayerData[2].PlayerName} just gained a point!`;
                };

                Player2_won = false;
                resolve();
            };

        }, 1000);
    });
};

// call Ultimate Game Win Function
function Call_UltimateWin(WinCombination, UserGivesUp, KI_won_points) {
    CheckmateWarnText.style.display = "none" // just small bug fix nothing special

    if (KI_won_points != undefined) {
        score_Player2_numb = Infinity;
    };

    win_found = false;

    if (WinCombination == undefined) {
        setTimeout(() => {
            console.log(score_Player1_numb, score_Player2_numb);

            running = false;
            if (score_Player1_numb > score_Player2_numb) { // Player 1 has won
                UltimateGameWin(true, false, undefined, UserGivesUp);
                return;
            } else if (score_Player1_numb < score_Player2_numb) { // Player 2 has won
                UltimateGameWin(false, true, undefined, UserGivesUp);
                return;
            } else if (score_Player1_numb == score_Player2_numb) { // Tie
                UltimateGameWin(true, true, undefined, UserGivesUp);
                return;
            };
        }, 600);

    } else {
        setTimeout(() => {
            running = false;
            if (score_Player1_numb > score_Player2_numb) { // Player 1 has won
                UltimateGameWin(true, false, WinCombination, UserGivesUp);
                return;
            } else if (score_Player1_numb < score_Player2_numb) { // Player 2 has won
                UltimateGameWin(false, true, WinCombination, UserGivesUp);
                return;
            } else if (score_Player1_numb == score_Player2_numb) { // Tie
                UltimateGameWin(true, true, WinCombination, UserGivesUp);
                return;
            };
        }, 600);
    };
};

// random win text
const random_win_text = [
    "I always knew he is going to make it...",
    "GG",
    "Revenge?",
    "Got hacked?",
    "Incredible",
    "Awesome",
    "What a game...",
    "That was close",
    "Luck or skill?",
    "Clown powder",
    "An intelligent move leads to a big win",
    "Time to buy a new skin",
    "Time to see some sun",
];

let endGame_player1Won = null;

// ultimate game win start animation
const UltimateGameWinFirstAnimation = (player1_won, player2_won) => {
    let rnd = Math.floor(Math.random() * random_win_text.length - 1);
    let rnd_text = random_win_text[rnd];

    GameFieldHeaderUnderBody.style.display = 'none';
    statusText.style.display = 'none';
    field_deco_wrapper.style.display = 'none';

    endGame_player1Won = player1_won;
    // console.log(player1_won, player2_won);

    setTimeout(() => {
        cellGrid.classList.add('Invisible');
        endGame_statusText.style.display = 'block';

        if (!stopStatusTextInterval) {

            if (watch_mode) {
                endGame_statusText.textContent = rnd_text;
                return;
            };

            // in Advanture mode or in online mode
            if (inAdvantureMode || curr_mode == GameMode[2].opponent) {

                if (PlayingInCreatedLevel) { // Player played user created level

                    if (creative_level_instance.selectedLevel[9] == 0 && score_Player1_numb != score_Player2_numb && !player_levels_handler.online_level_overview_handler) {
                        endGame_statusText.textContent = `It's conquered! Level is ready to publish`;

                    } else if (creative_level_instance.selectedLevel[9] == 1 || score_Player1_numb == score_Player2_numb) {
                        endGame_statusText.textContent = rnd_text;
                    };

                } else { // user played standard card level from game
                    endGame_statusText.textContent = rnd_text;
                };

            } else if (!inAdvantureMode && curr_mode != GameMode[2].opponent) { // not in advanture and not in online mode
                endGame_statusText.textContent = rnd_text;
            };

            if (PlayingInCreatedLevel && curr_mode == GameMode[3].opponent) {

                if (NewCreativeLevel) {
                    endGame_statusText.textContent = "Note that this match will not count as an official match, and you cannot verify it through the offline mode.";
                } else {
                    endGame_statusText.textContent = "Note that this match will not count as an official match, and your score will not be shown on the scoreboard.";
                };
            };

        } else {
            GameFieldHeaderUnderBody.style.display = 'flex';
        };
    }, 2000);
};

// user wants to continue after finishing a match
continueGameBtn.addEventListener("click", () => {
    continueGame();
});

// continue game after finished match
const continueGame = () => {
    endGameStatsPopUp.style.display = "none";

    if (watch_mode) {
        UserleavesGame(null, null, 'from_continue_btn');
        return;
    };

    // not advanture mode
    if (!inAdvantureMode) {

        // in online mode
        if (curr_mode == GameMode[2].opponent) {

            if (PlayingInCreatedLevel) { // Player played user created level

                if (creative_level_instance.selectedLevel[9] == 0) {
                    // admin leaves game and this info all player get
                    if (personal_GameData.role == "admin") {
                        UserleavesGame();
                        score_Player1_numb != score_Player2_numb && creative_level_instance.verified(); // User beat his own created level and can publish it now
                    };

                } else if (creative_level_instance.selectedLevel[9] == 1) {
                    // admin leaves game and this info all player get
                    if (personal_GameData.role == "admin") {
                        UserleavesGame();
                    };
                };

            } else { // user played standard card level from game

                if (tournament_mode) {
                    UserleavesGame();
                    return;
                };

                // admin leaves game and this info all player get
                if (personal_GameData.role == "admin") {
                    UserleavesGame();
                };
            };

            if (tournament_mode) return;

            DarkLayer.style.display = "block";

            // when user wants to leave from the game on game finished he must wait for the admin to leave the game
            // But if user clicked "continue", a text aappears to wait for the admin
            if (personal_GameData.role == "user" || personal_GameData.role == "blocker") {

                let bigText = document.createElement("h1");
                bigText.classList.add("bigScreenText");
                bigText.textContent = "Wait for the admin to continue.";

                document.body.appendChild(bigText);
            };

            // in offline mode
        } else if (curr_mode != GameMode[2].opponent) {

            if (PlayingInCreatedLevel) { // Player played user created level
                UserleavesGame();

            } else { // user played standard card level from game
                restartGame();
            };
        };

        // in advanture mode
    } else {

        if (endGame_player1Won) { // user won and conquered the level
            UserleavesGame(true, current_selected_level);
        } else {
            UserleavesGame();
        };
    };
};

// first player did ultimate win
const FirstPlayerUltimateWin = (player1_won, player2_won) => {
    let winText = !inAdvantureMode ? `${PlayerData[1].PlayerName} won it ` : "You conquered it";

    // Display win text in the proper way
    if (inAdvantureMode || curr_mode == GameMode[1].opponent) {

        // if user beat level 10 - boss level
        if (current_selected_level == 10) {
            UltimateWinAnimation("You have conquered the evil");

            setTimeout(() => {
                if (!localStorage.getItem("completed_mapLevel10")) {
                    // for achievement 
                    Achievement.new(0);
                };
            }, 100);
        };

        starsHandler.liveData[0] = starsHandler.liveData[0] == Infinity ? 0 : starsHandler.liveData[0];
        starsHandler.liveData[2] = Number(GameField_TimeMonitor.textContent.replace("s.", ""));
        starsHandler.liveData[1] = max_amount_of_moves - MaxAmountOfMovesCount
    };

    // additional img. If player is not it level 10 , this default img gets created
    if (current_selected_level != 10) {
        // win animation
        UltimateWinAnimation(winText);
    };

    // set skill points
    if (curr_mode == GameMode[1].opponent) { // KI 
        if (inAdvantureMode) {
            let conquered_mapLevel = JSON.parse(localStorage.getItem('unlocked_mapLevels'))[current_selected_level][0];
            if (!conquered_mapLevel) setNew_SkillPoints(20);
        };
    };

    if (!inAdvantureMode) {
        player1_won = false;
        player2_won = false;
    };
};

// first player did ultimate win
const SecondPlayerUltimateWin = (player1_won, player2_won) => {
    if (inAdvantureMode) {
        // animation
        UltimateWinAnimation(`You have lost`);

        setTimeout(() => {
            endGameStatsOnLostAdvantureLevel(current_selected_level);
        }, 4500);

    } else {
        // animation
        UltimateWinAnimation(`${PlayerData[2].PlayerName} won it`);
    };

    if (!inAdvantureMode) {
        player1_won = false;
        player2_won = false;
    };
};

// tie ultiamte win
const GG_UltimateWin = (player1_won, player2_won) => {
    // animation
    UltimateWinAnimation("GG Well played!");

    if (!inAdvantureMode) {
        player1_won = false;
        player2_won = false;
    };
};

// display win text
const UltimateWinAnimation = (winText) => {
    EndGameGameAnimation(winText, true).then(() => { // true: says that the battle ended
        // UltimateWinText.textContent = null;
        // let img = document.createElement('img');
        // img.src = "./assets/game/holy-grail.svg";
        // img.width = "300";
        // img.height = "300";
        // UltimateWinText.appendChild(img);
    });
};

// Ultimate Game Win
function UltimateGameWin(player1_won, player2_won, WinCombination, UserGivesUp) {
    // Online or offline mode
    if (curr_mode == GameMode[2].opponent) { // in online mode

        // send message to server
        if (personal_GameData.role == "admin" || UserGivesUp) socket.emit('Call_UltimateWin', personal_GameData.currGameID, [player1_won, player2_won,
            WinCombination ? JSON.stringify([...WinCombination].map(el => parseInt(el.getAttribute("cell-index")))) : undefined, score_Player1_numb, score_Player2_numb, GameSeconds
        ]);
        return;

    } else {
        setTimeout(() => {
            // do not entcomment. do not touch. legacy code
            // if (inPlayerLevelsScene) {
            //     update_personal_level_data(player1_won);
            // };

            // console.log(current_level_boss);
            current_level_boss && current_level_boss.stop_attack_interval();

            // basic stuff
            stopStatusTextInterval = false;
            cellGrid.style.opacity = "0";

            killPlayerClocks(true);
            clearInterval(gameCounter);
            gameCounter = null;

            // so the user can't leave while win animation
            leaveGame_btn.removeEventListener('click', UserleavesGame);
            leaveGame_btn.style.color = '#56565659';

            UltimateGameWinFirstAnimation(player1_won, player2_won);

            // game entry for offline game of any kind. player vs player / player vs ki / advanture mode (also ki)
            let level_id;
            let level_icon;
            let level_name;

            if (player_levels_handler.online_level_overview_handler) {
                level_id = player_levels_handler.online_level_overview_handler.level.id;
                level_icon = player_levels_handler.online_level_overview_handler.level.icon;
                level_name = player_levels_handler.online_level_overview_handler.level.level_name;

            } else {
                level_name = curr_field;
            };

            let game_mode = inAdvantureMode && curr_mode == GameMode[1].opponent ? 'advanture_mode' : !inAdvantureMode && curr_mode == GameMode[1].opponent ? 'training_arena' : 'fun_offline_game';

            console.log(Number(fieldIndex), "lool", score_Player1_numb, score_Player2_numb);

            let score1 = score_Player1_numb;
            let score2 = score_Player2_numb;

            if (score_Player1_numb == Infinity) score1 = 999;
            if (score_Player2_numb == Infinity) score2 = 999;

            if (!NewCreativeLevel && !inAdvantureMode) {
                let all_game_data_for_log = [
                    level_id, // level_id
                    level_name, // level name
                    level_icon, // level icon
                    Number(localStorage.getItem("PlayerID")), // p1 id
                    -1, // p2 id // player two has no id (p2 = ki | rnd player on same pc)
                    PlayerData[1].PlayerName, // player 1 name
                    PlayerData[2].PlayerName, // player 2 name
                    curr_mode == GameMode[1].opponent ? 'gold' : 'white', // p2 color
                    localStorage.getItem('userInfoColor'), // p1 color
                    PlayerData[1].AdvancedSkin == "cell empty" ? PlayerData[1].PlayerForm : PlayerData[1].AdvancedSkin.replace('cell', ''), // player 1 icon
                    PlayerData[2].AdvancedSkin == "cell empty" ? PlayerData[2].PlayerForm : PlayerData[2].AdvancedSkin.replace('cell', ''), // player 2 icon
                    score1 != -Infinity && score1 != Infinity ? score1 : 0, // p1 points
                    score2 != -Infinity && score2 != Infinity ? score2 : 0, // p2 points
                    GameData.InnerGameMode == 'Blocker Combat' ? true : false, // blocker boolean
                    GameData.InnerGameMode == 'Blocker Combat' ? 'bot' : ' ', // blocker name
                    JSON.stringify(cell_indexes_blocked_by_blocker), // cells blocked by blocker
                    JSON.stringify(patterns_used), // patterns used
                    JSON.stringify([xCell_Amount, yCell_Amount]), // x and y: field_size
                    bgcolor1, // first bg color
                    bgcolor2, // second bg color
                    GameSeconds, // game duration
                    JSON.stringify(all_game_moves), // moves
                    GameData.PlayerClock, // player clock
                    points_to_win, // points to win
                    JSON.stringify(allGameData[3]), // allowed patterns
                    JSON.stringify({}),
                    game_mode, // game mode,
                    GameData.InnerGameMode, // field mode
                    killAllDrawnCells, // kill cells after point
                    !max_amount_of_moves ? -1 : max_amount_of_moves, // max amount of moves
                    -1,
                    Number(fieldIndex),
                    curr_music_name ? curr_music_name.id : 'null',
                    JSON.stringify(boneyard_array)
                ];

                game_log_handler.load_to_server(all_game_data_for_log);
            };

            setTimeout(() => {
                cellGrid.style.display = 'none';
                if (player1_won && !player2_won) { // player 1 won (user)
                    FirstPlayerUltimateWin(player1_won, player2_won);

                    // only for test purposes
                    // WinCombination && recentUsedPattern_add([...WinCombination]); // add used pattern to recently used pattern list

                } else if (player2_won && !player1_won) { // player 2 won (user)
                    SecondPlayerUltimateWin(player1_won, player2_won);

                } else if (player1_won && player2_won) { // GG
                    GG_UltimateWin(player1_won, player2_won);
                };
            }, 1000);
        }, 1000);
    };
};

// player 1 won online game
const OnlineGame_UltimateWin_Player1 = (player1_won, player2_won, WinCombination, game_sec) => {
    if (watch_mode || personal_GameData.role == 'blocker') {
        UltimateWinAnimation(`${PlayerData[1].PlayerName} won it `);
        return;
    };

    if (curr_mode == GameMode[2].opponent) { // online friend 
        // only the user which is the winner in this case, earns skill points
        if (personal_GameData.role == 'admin') {
            PlayerWon_UpdateHisData(player1_won, player2_won, WinCombination);
            update_personal_level_data(player1_won, game_sec, score_Player1_numb);

            if (PlayingInCreatedLevel) {
                ConqueredPlayerCreatedLevel(global_creative_level_data["level_name"]);
                Achievement.new(17);
                Achievement.new(18);
            };
        };

        if (personal_GameData.role == 'user') {

            LooseCounter(true);
            Achievement.new(24);

            update_personal_level_data(player2_won, game_sec, score_Player2_numb);

            if (PlayerXP[1] <= 0) PlayerXP[1] = null;
            if (PlayerXP[2] <= 0) PlayerXP[2] = null;

            let XP_multiplicator = PlayerXP[1] != null ? ((PlayerXP[2] / PlayerXP[1]) / -1) : 1;

            minus_SkillPoints(Math.floor(5 * XP_multiplicator));
            UltimateWinAnimation(`${PlayerData[1].PlayerName} won it `);
        };
    };
    if (curr_mode == GameMode[1].opponent) { // KI 
        setNew_SkillPoints(1);
    };
};

// player 2 won online game
const OnlineGame_UltimateWin_Player2 = (player1_won, player2_won, WinCombination, game_sec) => {
    if (watch_mode || personal_GameData.role == 'blocker') {
        UltimateWinAnimation(`${PlayerData[2].PlayerName} won it `);
        return;
    };

    if (curr_mode == GameMode[2].opponent) { // online friend
        // only the user which is the winner in this case, earns skill points
        if (personal_GameData.role == 'user') {
            PlayerWon_UpdateHisData(player1_won, player2_won, WinCombination);
            update_personal_level_data(player2_won, game_sec, score_Player2_numb);

            if (PlayingInCreatedLevel) {
                ConqueredPlayerCreatedLevel(curr_field);
                Achievement.new(17);
                Achievement.new(18)
            };
        };

        if (personal_GameData.role == 'admin') {

            LooseCounter(true);
            Achievement.new(24);

            update_personal_level_data(player1_won, game_sec, score_Player1_numb);

            if (PlayerXP[1] <= 0) PlayerXP[1] = null;
            if (PlayerXP[2] <= 0) PlayerXP[2] = null;

            let XP_multiplicator = PlayerXP[1] != null ? ((PlayerXP[1] / PlayerXP[2]) / -1) : 1;

            minus_SkillPoints(Math.floor(5 * XP_multiplicator));
            UltimateWinAnimation(`${PlayerData[2].PlayerName} won it `);
        };
    };
};

// update costum level player data (best score etc.)
function update_personal_level_data(playerX_won, game_sec, score) {
    if (NewCreativeLevel) {
        return;
    };

    console.log(inPlayerLevelsScene);

    if (inPlayerLevelsScene || PlayingInCreatedLevel_AsGuest) {
        socket.emit("update_online_level_data", playerX_won, game_sec,
            score, Number(localStorage.getItem("PlayerID")),
            globalLevelID, patterns_used, (newData) => {

                if (personal_GameData.role == 'admin' || !PlayingInCreatedLevel_AsGuest) {
                    level_scene_best_time.textContent = `best time: ${newData["best_time"]} seconds`;
                    player_levels_handler.online_level_overview_handler.progress_bar(
                        newData["points"], global_creative_level_data["required_points"]
                    );
                };
            });
    };
};

// tie in online game 
const OnlineGame_UltimateWin_GG = (player1_won, player2_won, WinCombination, game_sec) => {
    update_personal_level_data(false, game_sec);
    UltimateWinAnimation(`GG Well played `);
};

// code to execute for the player who won in online game
function PlayerWon_UpdateHisData(Player1_won, player2_won, WinCombination) {
    let XP_multiplicator;

    if (PlayerXP[1] <= 0) PlayerXP[1] = null;
    if (PlayerXP[2] <= 0) PlayerXP[2] = null;

    if (player2_won) {
        XP_multiplicator = PlayerXP[1] != null ? (PlayerXP[1] / PlayerXP[2]) : 1;

    } else if (Player1_won) {
        XP_multiplicator = PlayerXP[1] != null ? (PlayerXP[2] / PlayerXP[1]) : 1;
    };

    setNew_SkillPoints(Math.floor(10 * XP_multiplicator));

    UltimateWinAnimation(`You won it `);

    // continue with normal code
    let wins_storage = JSON.parse(localStorage.getItem('onlineMatches-won'));
    wins_storage = wins_storage + 1;
    localStorage.setItem('onlineMatches-won', wins_storage);

    // all previous 100 patterns the player used
    WinCombination && recentUsedPattern_add(WinCombination, xCell_Amount, yCell_Amount); // add used pattern to recently used pattern list

    // add online win to "last 24 hours online wins" for daily challenges
    let lastOnlineWins = parseInt(localStorage.getItem("Last24Hours_Won_OnlineGames"));
    lastOnlineWins = lastOnlineWins + 1;
    localStorage.setItem("Last24Hours_Won_OnlineGames", lastOnlineWins);

    // online win in specific mode
    switch (GameData.InnerGameMode) {
        case InnerGameModes[1]: // win in boneyard mode

            let boneyard_onlineWins = parseInt(localStorage.getItem("Last24Hours_Won_OnlineGames_Boneyard"));
            boneyard_onlineWins = boneyard_onlineWins + 1;
            localStorage.setItem("Last24Hours_Won_OnlineGames_Boneyard", boneyard_onlineWins);

            break;
    };

    // online win in specific player clock setting
    if (GameData.PlayerClock == "5") {
        let seconds5_onlineWins = parseInt(localStorage.getItem("Last24Hours_Won_5secondsPlayerClockOnlineGames"));
        seconds5_onlineWins = seconds5_onlineWins + 1;
        localStorage.setItem("Last24Hours_Won_5secondsPlayerClockOnlineGames", seconds5_onlineWins);
    };
};

// this code block is just for tournament win case
const tournament_win = async(player1_won, player2_won) => {
    let tour_data = tournament_handler.clicked_tournament[1];
    let current_round_idx = Number('round 1'.replace('round', '').trim()) - 1;
    let current_round = tour_data.current_state.rounds[current_round_idx];
    let modified_rounds_dataset = current_round; // Default to the current round dataset
    let winner_id = null;
    let next_round = current_round_idx + 1;
    let match_player_ids = findMatchByPlayerID(tour_data.current_state.rounds, localStorage.getItem('PlayerID')).map(p => parseInt(p.replace('Player', '').trim()));
    let playerID_toParseIn = localStorage.getItem('PlayerID');
    let MatchIndex = findMatchIndexByPlayerID(tour_data.current_state.rounds, localStorage.getItem('PlayerID'));

    if (player1_won) {
        [modified_rounds_dataset, winner_id] = Tournament_setWinnerById(current_round, playerID_toParseIn, true);

    } else if (player2_won) {
        let p2_id_to_parse_in = match_player_ids[0] != playerID_toParseIn ? match_player_ids[0] : match_player_ids[1];
        [modified_rounds_dataset, winner_id] = Tournament_setWinnerById(current_round, p2_id_to_parse_in, false);
    };

    // Update the current round with the modified dataset
    tour_data.current_state.rounds[current_round_idx] = modified_rounds_dataset;

    if (winner_id !== null) {
        await socket.emit('tournament_player_to_next_round', tour_data.current_state, `Player ${winner_id}`, winner_id, next_round, MatchIndex, tour_data.id, JSON.parse(localStorage.getItem('clan_member_data')).clan_id,
            cb => {
                // cb = updated tournament data
                console.log("Ergebnis: ", cb);
            });
    } else {
        console.error('No winner determined for this round.');
    };

    let tournament_data = {
        'player1': current_round.matches[MatchIndex].players[0],
        'player2': current_round.matches[MatchIndex].players[1],
        'tournament_id': tour_data.id,
        'clan_id': JSON.parse(localStorage.getItem('clan_member_data')).clan_id
    };

    return tournament_data;
};

// the admin called the ultimate game win
// this message recieve all clients
socket.on('global_UltimateWin', async(player1_won, player2_won, WinCombination, player1_score, player2_score, gameSeconds) => {
    setTimeout(async() => {
        if (!player1_score && !player2_score) {
            if (player1_won) {
                player1_score = Infinity;
                player2_score = -Infinity;
            };

            if (player2_won) {
                player1_score = -Infinity;
                player2_score = Infinity;
            };
        };

        console.log(player1_score, player2_score);

        // this code block is just for tournament win case
        let tournament_data;
        if (tournament_mode && personal_GameData.role == 'admin') {
            tournament_data = await tournament_win(player1_won, player2_won);
        };

        // to prevent bugs
        if (current_level_boss) {
            console.log(current_level_boss)
            current_level_boss.died = true
            current_level_boss.stop_attack_interval();
        };

        // basic stuff
        stopStatusTextInterval = false;
        cellGrid.style.opacity = "0";

        killPlayerClocks(true, "stop");
        clearInterval(gameCounter);
        gameCounter = null;

        win_found = false;

        // so the user can't leave while win animation
        leaveGame_btn.removeEventListener('click', UserleavesGame);
        leaveGame_btn.style.color = '#56565659';

        // set score from server
        score_Player1_numb = player1_score;
        score_Player2_numb = player2_score;

        UltimateGameWinFirstAnimation(player1_won, player2_won);

        try {
            WinCombination = JSON.parse(WinCombination).map(x => document.querySelector(`.cell[cell-index="${x}"]`));
        } catch (error) {
            console.log(error);
        };

        if (personal_GameData.role == 'admin' && !NewCreativeLevel) {
            let level_id;
            let level_icon;

            if (player_levels_handler.online_level_overview_handler) {
                level_id = player_levels_handler.online_level_overview_handler.level.id;
                level_icon = player_levels_handler.online_level_overview_handler.level.icon;
            };

            console.log(player_levels_handler.online_level_overview_handler);

            console.log(patterns_used);

            let all_game_data_for_log = [
                level_id, // level_id
                allGameData[2][1], // level name
                level_icon, // level icon
                OnlinePlayerIDs[1], // p1 id
                OnlinePlayerIDs[2], // p2 id
                allGameData[2][3], // player 1 name
                allGameData[2][4], // player 2 name
                !allGameData[2][11] ? "" : allGameData[2][11], // p2 color
                !allGameData[2][10] ? "" : allGameData[2][10], // p1 color
                allGameData[2][8] == "empty" ? allGameData[2][5] : allGameData[2][8], // player 1 icon
                allGameData[2][9] == "empty" ? allGameData[2][6] : allGameData[2][9], // player 2 icon
                (player1_score == Infinity) ? 9999 : (player1_score == -Infinity) ? -1 : player1_score, // p1 points
                (player2_score == Infinity) ? 9999 : (player2_score == -Infinity) ? -1 : player2_score, // p2 points
                allGameData[2][12] ? true : false, // blocker boolean
                allGameData[2][12], // blocker name
                JSON.stringify(cell_indexes_blocked_by_blocker), // cells blocked by blocker
                JSON.stringify(patterns_used), // patterns used
                JSON.stringify([xCell_Amount, yCell_Amount]), // x and y: field_size
                bgcolor1, // first bg color
                bgcolor2, // second bg color
                gameSeconds, // game duration
                JSON.stringify(all_game_moves), // moves
                allGameData[2][7], // player clock
                allGameData[5], // points to win
                JSON.stringify(allGameData[3]), // allowed patterns
                player_levels_handler.online_level_overview_handler && player_levels_handler.online_level_overview_handler.level["costum_patterns"], // costum patterns when exist
                NewCreativeLevel || CreativeLevel_from_onlineMode_costumPatterns_globalVar ? 'created_online_level' : 'official_online_level', // game mode,
                GameData.InnerGameMode, // field mode
                killAllDrawnCells, // kill cells after point
                !max_amount_of_moves ? -1 : max_amount_of_moves, // max amount of moves
                OnlinePlayerIDs[3] ? OnlinePlayerIDs[3] : -1,
                Number(fieldIndex),
                curr_music_name ? curr_music_name.id : 'null',
                JSON.stringify(boneyard_array),
                tournament_data || {}
            ];

            console.log(all_game_data_for_log);

            socket.emit("update_gameLog", all_game_data_for_log, cb => {
                if (!cb) new Error("Something went wrong while inserting into the gamelogs table");

                console.log(cb, all_game_data_for_log)
                game_log_handler.have_to_update = true;
            });
        };

        setTimeout(() => {
            cellGrid.style.display = 'none';
            if (player1_won && !player2_won) { // player 1 won (admin)
                OnlineGame_UltimateWin_Player1(player1_won, player2_won, WinCombination, gameSeconds);

            } else if (player2_won && !player1_won) { // player 2 won (user)
                OnlineGame_UltimateWin_Player2(player1_won, player2_won, WinCombination, gameSeconds);

            } else if (player1_won && player2_won) { // GG
                OnlineGame_UltimateWin_GG(player1_won, player2_won, WinCombination, gameSeconds);
            };
        }, 1000);
    }, 1000);
});

// Update skill points for player after a successful game
// This function is only availible in the online mode and KI mode because it makes only sense there
function setNew_SkillPoints(plus) {
    console.log("plus", plus);

    let old_Elo = parseInt(localStorage.getItem('ELO'));
    let ELO_point = 0;

    // extra animation addition
    // ELO_Points_AddIcon.style.display = "block";
    // ELO_Points_AddIcon.style.transition = 'none';
    // ELO_Points_AddIcon.style.opacity = '1';
    // ELO_Points_AddIcon.textContent = `+${plus}`;
    // setTimeout(() => {
    //     ELO_Points_AddIcon.style.transition = 'all 2.35s ease-out';
    //     ELO_Points_AddIcon.style.opacity = '0';
    //     ELO_Points_AddIcon.style.display = "none";

    //     setTimeout(() => {
    //         ELO_Points_AddIcon.style.display = "none";
    //     }, 2750);
    // }, 700);

    // skill points N + additional_N
    let i = 0
    let set = setInterval(() => {
        i++;

        // animation
        ELO_Points_display.classList.add('ELO_ani');

        // sound
        // playBtn_Audio_2();

        // logic
        ELO_point++;
        localStorage.setItem('ELO', `${old_Elo + ELO_point}`);
        ELO_Points_display.textContent = localStorage.getItem('ELO');

        // animation
        function plusELO() {
            setTimeout(() => {
                ELO_Points_display.classList.remove('ELO_ani');
            }, 150);
        };
        plusELO();

        if (i >= plus) {
            clearInterval(set);
            i = 0
        };
    }, 200);

    // for achievement
    let onlineMatchesWon = parseInt(localStorage.getItem("onlineMatches-won"));
    switch (onlineMatchesWon) {
        case 1:
            if (!localStorage.getItem("wonOnlineMatches_1")) {
                Achievement.new(4);
                localStorage.setItem("wonOnlineMatches_1", "true");
            };
            break;
        case 5:
            if (!localStorage.getItem("wonOnlineMatches_5")) {
                Achievement.new(5);
                localStorage.setItem("wonOnlineMatches_5", "true");
            };
            break;
        case 25:
            if (!localStorage.getItem("wonOnlineMatches_25")) {
                Achievement.new(6);
                localStorage.setItem("wonOnlineMatches_25", "true");
            };
            break;
        case 70:
            if (!localStorage.getItem("wonOnlineMatches_70")) {
                Achievement.new(7);
                localStorage.setItem("wonOnlineMatches_70", "true");
            };
            break;
        case 120:
            if (!localStorage.getItem("wonOnlineMatches_120")) {
                Achievement.new(8);
                localStorage.setItem("wonOnlineMatches_120", "true");
            };
            break;
        case 200:
            if (!localStorage.getItem("wonOnlineMatches_200")) {
                Achievement.new(9);
                localStorage.setItem("wonOnlineMatches_200", "true");
            };
            break;
        case 400:
            if (!localStorage.getItem("wonOnlineMatches_400")) {
                Achievement.new(10);
                localStorage.setItem("wonOnlineMatches_400", "true");
            };
            break;
        case 500:
            if (!localStorage.getItem("wonOnlineMatches_500")) {
                Achievement.new(11);
                localStorage.setItem("wonOnlineMatches_500", "true");
            };
            break;
        case 5000:
            if (!localStorage.getItem("wonOnlineMatches_5000")) {
                Achievement.new(12);
                localStorage.setItem("wonOnlineMatches_5000", "true");
            };
            break;
    };
};

// Other player who loses gets -5 skill points
// This function is only availible in the online mode and KI mode because it makes only sense there
function minus_SkillPoints(minus) {
    console.log("minus", minus);

    let old_Elo = parseInt(localStorage.getItem('ELO'));
    let ELO_point = 0;

    console.log(old_Elo, minus);
    if (old_Elo < minus) return;

    // extra animation addition
    // ELO_Points_AddIcon.style.display = "block";
    // ELO_Points_AddIcon.style.transition = 'none';
    // ELO_Points_AddIcon.style.opacity = '1';
    // ELO_Points_AddIcon.textContent = `-${minus}`;
    // setTimeout(() => {
    //     ELO_Points_AddIcon.style.transition = 'all 1.35s ease-out';
    //     ELO_Points_AddIcon.style.opacity = '0';

    //     setTimeout(() => {
    //         ELO_Points_AddIcon.style.display = "none";
    //     }, 1750);
    // }, 700);

    // skill points N + additional_N
    let i = 0
    let set = setInterval(() => {
        i++;

        // animation
        ELO_Points_display.classList.add('ELO_ani');

        // sound
        // playBtn_Audio_2();

        // logic
        ELO_point--;
        localStorage.setItem('ELO', `${old_Elo + ELO_point}`);
        ELO_Points_display.textContent = localStorage.getItem('ELO');

        // animation
        function plusELO() {
            setTimeout(() => {
                ELO_Points_display.classList.remove('ELO_ani');
            }, 150);
        };
        plusELO();

        if (i >= minus) {
            clearInterval(set);
            i = 0
        };
    }, 200);
};

async function scoreUp_animation(player, points, max_points) {
    let points_relation = (points / max_points) * 100;

    switch (player) {

        case 1:
            let time = 4;

            for (let i = player1_lastBarRelation; i < points_relation; i = i + 1 / 4) {
                player1_score_bar_wrapper.style.background = `linear-gradient(105deg, #3f51b5 ${i}%, transparent ${i + 5}%)`;

                await sleep(time);
                time = easeOutSine(time);
            };

            player1_lastBarRelation = points_relation;
            break;

        case 2:
            let time2 = 4;

            for (let i = player2_lastBarRelation; i < points_relation; i = i + 1 / 4) {
                player2_score_bar_wrapper.style.background = `linear-gradient(-105deg, darkred ${i}%, transparent ${i + 5}%)`;

                await sleep(time2);
                time2 = easeOutSine(time2);
            };

            player2_lastBarRelation = points_relation;
            break;
    };
};