function checkWinner(fromRestart, fromClick) { // the first two parameter are just for the online mode when the third player blocked
    let roundWon = false;
    let Player1_won = false; // check if x has won
    let Player2_won = false; // check if o has won
    // for minimax
    let winner = null;
    let WinCombination = [];
    let extra_points = 0; // 2 additional points by a win pattern of 5 cells
    let Grid = Array.from(cellGrid.children);
    let someoneIsCheck = false;

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
                extra_points = 2;
                WinCombination.push(EleOf_A, EleOf_B, EleOf_C, EleOf_D, EleOf_E);

                break;
            };

            if (!someoneIsCheck) CheckmateWarnText.style.display = "none";

        } else if (cellD == undefined && cellE == undefined && cellC == undefined && cellB != undefined && cellA != undefined) {
            if (cellA != "" && cellA == cellB) {
                winner = [cellA, EleOf_A.classList[2]]; // second value: false if the user uses a normal skin
                roundWon = true;
                extra_points = 1;
                WinCombination.push(EleOf_A, EleOf_B);
            };
        };
    };

    // if the cell pattern which won is an ADVANCED skin => check which player it belongs to
    if (winner != null) {
        if (winner[1] != undefined) {
            if (PlayerData[1].AdvancedSkin == WinCombination[0].className) { // the advanced skin win pattern belongs to PLayer 1
                Player1_won = true;

            } else if (PlayerData[2].AdvancedSkin == WinCombination[0].className) { // the advanced skin win pattern belongs to PLayer 2
                Player2_won = true;
            };

        } else { // if the cell pattern which won is a NORMAL skin => check which player it belongs to
            if (PlayerData[1].PlayerForm == winner[0]) { // the normal skin pattern belongs to the first player
                Player1_won = true;

            } else if (PlayerData[2].PlayerForm == winner[0]) {
                Player2_won = true;
            };
        };
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
    // Choose winner
    chooseSubWinner(Player1_won, Player2_won, WinCombination, extra_points).then((KI_CanSetASecondTime) => {

        // Make cells die effect
        if (curr_field != 'Small Price' || curr_field != 'Thunder Advanture') {
            setTimeout(() => {
                let grid = [...cellGrid.children];
                // Make used cells die
                for (let cell of grid) {
                    // cells with normal skins => look if their textContent is a form, cells with advanced skins => look at their classList
                    // All cells that contain an advanced skin have 3 classNames (cell fa-solid fa-xxx)
                    if (cell.textContent == PlayerData[1].PlayerForm || cell.textContent == PlayerData[2].PlayerForm || cell.classList.length >= 3) {
                        single_CellBlock(cell);
                    };
                };
                ava_cells = check_RemainingCells();
            }, 600);
        };

        console.log(KI_CanSetASecondTime);

        // Change player things. execute this everytime
        setTimeout(() => {
            if (!inAdvantureMode) {
                processResult_continueGame(fromRestart, fromClick, true)

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
            console.log(current_level_boss, current_level_boss.hp);

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
    // if in advanture mode
    if (inAdvantureMode) {
        setTimeout(() => {
            if (currentPlayer == PlayerData[1].PlayerForm) {

                if (PlayerIsAllowedToSetTwoTimes) { // if player can place two times in a row through a forbidden spell he found
                    running = true;

                    AdvantureMode_SpellDisplay.style.color = "white";

                    // player gets access to set again
                    cells.forEach(cell => {
                        cell.addEventListener('click', cellCicked);
                        cell.classList.length <= 1 ? cell.style.cursor = 'pointer' : cell.style.cursor = 'default';
                    });

                    UserClicksNTimesInARow++;
                    if (UserClicksNTimesInARow >= 1) {
                        PlayerIsAllowedToSetTwoTimes = false;
                        UserClicksNTimesInARow = 0;
                    };

                } else {
                    AdvantureMode_SpellDisplay.style.color = "grey";
                    changePlayer(false);
                    KI_Action();
                };

            } else {
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
                    KI_Action();

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
        span.style.fontSize = "35px";
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
        FloatingIconAnimation(Player1_won, Player2_won, WinCombination[0].getBoundingClientRect(), WinCombination.length);

        // win pattern stuff
        WinCombination.forEach(Ele => {
            Ele.classList.add('about-to-die-cell');
        });
        // console.log([...WinCombination]);

        // for advanture mode
        MovesAmount_PlayerAndKi = 0;
        KI_play_mode = "defend";

        // processing
        setTimeout(() => {
            if (Player1_won == true) {
                statusText.textContent = `${PlayerData[1].PlayerName} just gained a point!`;
                score_Player1_numb = score_Player1_numb + 1 + extra_points;
                scorePlayer1.textContent = score_Player1_numb;

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

                    recentUsedPattern_add([...WinCombination].map(el => parseInt(el.getAttribute("cell-index")))); // add used pattern to recently used pattern list

                } else if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'user') {
                    statusText.textContent = `${PlayerData[1].PlayerName} just gained a point!`;
                };

                // this commented code is only for test purposes
                if (curr_mode == GameMode[3].opponent) { // computer mode/ offline mode against a friend
                    recentUsedPattern_add([...WinCombination].map(el => parseInt(el.getAttribute("cell-index")))); // add used pattern to recently used pattern list
                };

                Player1_won = false;
                resolve();

            } else if (Player2_won == true) {
                statusText.textContent = `${PlayerData[2].PlayerName} just gained a point!`;
                score_Player2_numb = score_Player2_numb + 1 + extra_points;
                scorePlayer2.textContent = score_Player2_numb;

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

                    recentUsedPattern_add([...WinCombination].map(el => parseInt(el.getAttribute("cell-index")))); // add used pattern to recently used pattern list

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

    console.log("win combination: ", WinCombination);

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

    endGame_player1Won = player1_won;

    setTimeout(() => {

        cellGrid.classList.add('Invisible');
        endGame_statusText.style.display = 'block';

        if (!stopStatusTextInterval) {

            // in Advanture mode or in online mode
            if (inAdvantureMode || curr_mode == GameMode[2].opponent) {

                if (PlayingInCreatedLevel) { // Player played user created level

                    if (NewCreativeLevel.selectedLevel[9] == 0) {
                        endGame_statusText.textContent = `It's conquered! Level is ready to publish`;

                    } else if (NewCreativeLevel.selectedLevel[9] == 1) {
                        endGame_statusText.textContent = rnd_text;
                    };

                } else { // user played standard card level from game
                    endGame_statusText.textContent = rnd_text;
                };

            } else if (!inAdvantureMode && curr_mode != GameMode[2].opponent) { // not in advanture and not in online mode

                if (PlayingInCreatedLevel) { // Player played user created level
                    if (NewCreativeLevel.selectedLevel[9] == 0) {
                        endGame_statusText.textContent = `You beat it! Level is ready to publish`;

                    } else if (NewCreativeLevel.selectedLevel[9] == 1) {
                        endGame_statusText.textContent = rnd_text;
                    };

                } else { // user played standard card level from game
                    endGame_statusText.textContent = rnd_text;
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

    // not advanture mode
    if (!inAdvantureMode) {

        // in online mode
        if (curr_mode == GameMode[2].opponent) {

            if (PlayingInCreatedLevel) { // Player played user created level

                if (NewCreativeLevel.selectedLevel[9] == 0) {
                    // admin leaves game and this info all player get
                    if (personal_GameData.role == "admin") {
                        UserleavesGame();
                        NewCreativeLevel.verified(); // User beat his own created level and can publish it now
                    };

                } else if (NewCreativeLevel.selectedLevel[9] == 1) {
                    // admin leaves game and this info all player get
                    if (personal_GameData.role == "admin") {
                        UserleavesGame();
                    };
                };

            } else { // user played standard card level from game

                // admin leaves game and this info all player get
                if (personal_GameData.role == "admin") {
                    UserleavesGame();
                };

            };
            DarkLayer.style.display = "block";

            // when user wants to leave from the game on game finished he must wait for the admin to leave the game
            // But if user clicked "continue", a text aappears to wait for the admin
            if (personal_GameData.role == "user") {

                let bigText = document.createElement("h1");
                bigText.classList.add("bigScreenText");
                bigText.textContent = "Wait for the admin to continue.";

                document.body.appendChild(bigText);
            };

            // in offline mode
        } else if (curr_mode != GameMode[2].opponent) {

            if (PlayingInCreatedLevel) { // Player played user created level
                if (NewCreativeLevel.selectedLevel[9] == 0) {
                    NewCreativeLevel.verified(); // User beat his own created level and can publish it now
                    UserleavesGame();

                } else if (NewCreativeLevel.selectedLevel[9] == 1) {
                    restartGame();
                };

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
            JSON.stringify([...WinCombination].map(el => parseInt(el.getAttribute("cell-index")))), score_Player1_numb, score_Player2_numb
        ]);
        return;

    } else {
        setTimeout(() => {

            console.log(current_level_boss);
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

            UltimateGameWinFirstAnimation(player1_won, player2_won)

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

// player 1 won online gamef
const OnlineGame_UltimateWin_Player1 = (player1_won, player2_won, WinCombination) => {
    if (curr_mode == GameMode[2].opponent) { // online friend 
        // only the user which is the winner in this case, earns skill points
        if (personal_GameData.role == 'admin') {
            PlayerWon_UpdateHisData(player1_won, player2_won, WinCombination);
        };

        if (personal_GameData.role == 'user') {
            minus_SkillPoints(5);
            UltimateWinAnimation(`${PlayerData[1].PlayerName} won it `);
        };
    };
    if (curr_mode == GameMode[1].opponent) { // KI 
        setNew_SkillPoints(1);
    };
};

// player 2 won online game
const OnlineGame_UltimateWin_Player2 = (player1_won, player2_won, WinCombination) => {
    if (curr_mode == GameMode[2].opponent) { // online friend
        // only the user which is the winner in this case, earns skill points
        if (personal_GameData.role == 'user') {
            PlayerWon_UpdateHisData(player1_won, player2_won, WinCombination);
        };

        if (personal_GameData.role == 'admin') {
            minus_SkillPoints(5);
            UltimateWinAnimation(`${PlayerData[2].PlayerName} won it `);
        };
    };
};

// tie in online game 
const OnlineGame_UltimateWin_GG = (player1_won, player2_won, WinCombination) => {
    UltimateWinAnimation(`GG Well played `);
};

// code to execute for the player who won in online game
function PlayerWon_UpdateHisData(Player1_won, player2_won, WinCombination) {
    setNew_SkillPoints(10);

    UltimateWinAnimation(`You won it `);

    // continue with normal code
    let wins_storage = JSON.parse(localStorage.getItem('onlineMatches-won'));
    wins_storage = wins_storage + 1;
    localStorage.setItem('onlineMatches-won', wins_storage);

    // all previous 100 patterns the player used
    WinCombination && recentUsedPattern_add(WinCombination); // add used pattern to recently used pattern list

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

// the admin called the ultimate game win
// this message recieve all clients
socket.on('global_UltimateWin', (player1_won, player2_won, WinCombination, player1_score, player2_score) => {
    setTimeout(() => {

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

        // so the user can't leave while win animation
        leaveGame_btn.removeEventListener('click', UserleavesGame);
        leaveGame_btn.style.color = '#56565659';

        // set score from server
        score_Player1_numb = player1_score;
        score_Player2_numb = player2_score;

        WinCombination = JSON.parse(WinCombination);

        UltimateGameWinFirstAnimation(player1_won, player2_won)

        setTimeout(() => {
            cellGrid.style.display = 'none';
            if (player1_won && !player2_won) { // player 1 won (admin)
                OnlineGame_UltimateWin_Player1(player1_won, player2_won, WinCombination);

            } else if (player2_won && !player1_won) { // player 2 won (user)
                OnlineGame_UltimateWin_Player2(player1_won, player2_won, WinCombination);

            } else if (player1_won && player2_won) { // GG
                OnlineGame_UltimateWin_GG(player1_won, player2_won, WinCombination);
            };
        }, 1000);
    }, 1000);
});

// Update skill points for player after a successful game
// This function is only availible in the online mode and KI mode because it makes only sense there
function setNew_SkillPoints(plus) {
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