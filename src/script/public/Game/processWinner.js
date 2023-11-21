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

            // if (cellA == "" || cellB == "" || cellC == "" || cellD == "") { // Check win for a 4 block pattern combination
            //     continue;
            // };

            // check when player is check
            if (cellA == cellB && cellB == cellC && cellD == "" && EleOf_D.textContent == "" && EleOf_D.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellA == cellB && cellB == cellD && cellC == "" && EleOf_C.textContent == "" && EleOf_C.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellA == cellD && cellD == cellC && cellB == "" && EleOf_B.textContent == "" && EleOf_B.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellD == cellC && cellC == cellB && cellA == "" && EleOf_A.textContent == "" && EleOf_A.className != "cell death-cell" && cellD != "" && EleOf_D.textContent != "") {
                someoneIsCheck = true;
                console.log(cellA, cellB, cellC, cellD, cellE)
                console.log(EleOf_A, EleOf_B, EleOf_C, EleOf_D, EleOf_E)

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
                                CheckmateWarnText.textContent = `The unknown can beat you with one move, ${PlayerData[1].PlayerName}`;

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

            // if (cellA == "" || cellB == "" || cellC == "" || cellD == "" || cellE == "") {
            //     continue
            // };

            // check when player is check
            if (cellA == cellB && cellB == cellC && cellC == cellD && cellE == "" && EleOf_E.textContent == "" && EleOf_E.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellA == cellB && cellB == cellC && cellC == cellE && cellD == "" && EleOf_D.textContent == "" && EleOf_D.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellA == cellB && cellB == cellD && cellD == cellE && cellC == "" && EleOf_C.textContent == "" && EleOf_C.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellA == cellC && cellC == cellD && cellD == cellE && cellB == "" && EleOf_B.textContent == "" && EleOf_B.className != "cell death-cell" && cellA != "" && EleOf_A.textContent != "" ||
                cellB == cellC && cellC == cellD && cellD == cellE && cellA == "" && EleOf_A.textContent == "" && EleOf_A.className != "cell death-cell" && cellB != "" && EleOf_B.textContent != "") {
                someoneIsCheck = true;
                console.log(cellA, cellB, cellC, cellD, cellE)
                console.log(EleOf_A, EleOf_B, EleOf_C, EleOf_D, EleOf_E)

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
                                CheckmateWarnText.textContent = `The unknown can beat you with one move, ${PlayerData[1].PlayerName}`;

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
    killPlayerClocks();
    // Choose winner
    chooseSubWinner(Player1_won, Player2_won, WinCombination, extra_points);

    setTimeout(() => {
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

        // Ultimate Game Win Check for fields where you only can play 1 round!!! 3x3, 4x4, 5x5 Ignore this if it is not this case
        // rounds_played++;
        // if (curr_field == 'Small Price' && rounds_played == 1 || curr_field == 'Thunder Advanture' && rounds_played == 1 || curr_field == 'Quick Death' && rounds_played == 1) {
        //     Call_UltimateWin(WinCombination);
        //     return;
        // };

        // Change player things. execute this everytime
        setTimeout(() => {
            (!inAdvantureMode) ? processResult_continueGame(fromRestart, fromClick, true): processResult_continueGame();
        }, 600);
    }, 1200);
};

// process result: advanture mode (special)
function processResult_AdvantureMode(WinCombination) {
    // in advanture mode there are special win conditions for each level (10 levels)
    switch (current_selected_level) {
        case 1: // user have to score 5 points against the opponent (opponent: Bot)
            if (score_Player1_numb >= 2) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 5 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination);

            } else { // No one won
                processResult_continueGame();
            };
            break;

        case 2: // user have to score 7 points against the opponent (opponent: Bot)
            if (score_Player1_numb >= 2) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 7 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination);

            } else { // No one won
                processResult_continueGame();
            };
            break;

        case 3: // user have to score 8 points against the opponent (opponent: Bot)
            if (score_Player1_numb >= 2) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 8 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination);

            } else { // No one won
                processResult_continueGame();
            };
            break;

        case 4: // user have to score 10 points against the opponent (opponent: Bot)
            if (score_Player1_numb >= 2) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 10 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 5: // user have to score 11 points against the opponent (opponent: Bot)
            if (score_Player1_numb >= 2) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 11 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 6: // user have to score 7 points against the opponent (opponent: Bot)
            if (score_Player1_numb >= 2) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 7 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 7: // user have to score 9 points against the opponent (opponent: Bot)
            if (score_Player1_numb >= 2) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 9 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 8: // user have to score 13 points against the opponent (opponent: Bot)
            if (score_Player1_numb >= 2) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 13 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 9: // user have to score 15 points against the opponent (opponent: Bot)
            if (score_Player1_numb >= 4 && sun_HP <= 4100) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 15 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination);

            } else { // No one won
                processResult_continueGame();
            };
            break;
        case 10: // user have to score 20 points against the opponent (opponent: Bot)
            if (score_Player1_numb >= 4 && eye_HP <= 10000) { // Player won
                Call_UltimateWin(WinCombination);

            } else if (score_Player2_numb >= 20 || MaxAmountOfMovesCount <= 0) { // Bot won
                Call_UltimateWin(WinCombination);

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
                changePlayer(false);
                KI_Action();

            } else {
                changePlayer(false);
                running = true;
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

// choose sub winner
function chooseSubWinner(Player1_won, Player2_won, WinCombination, extra_points) {
    CheckmateWarnText.style.display = 'none';
    WinCombination.forEach(Ele => {
        Ele.classList.add('about-to-die-cell');
    });

    setTimeout(() => {
        if (Player1_won == true) {
            statusText.textContent = `${PlayerData[1].PlayerName} just gained a point!`;
            score_Player1_numb = score_Player1_numb + 1 + extra_points;
            scorePlayer1.textContent = score_Player1_numb;

            // player made a point in advanture mode
            if (inAdvantureMode) {
                statusText.textContent = `You just gained a point!`;

                // If player passed the requirement to win the level
                if (score_Player1_numb >= points_to_win) {
                    statusText.textContent = `Congrats! You scored ${points_to_win} points`;
                    Player1_won = false;
                    running = false;
                    Call_UltimateWin();
                    return;
                };

                // player plays boss level
                if (current_selected_level == 10) {
                    eyeGot_HP_Damage(450);

                } else if (current_selected_level == 9) {
                    sunGot_HP_Damage(500);
                };
            };

            if (score_Player1_numb >= points_to_win) {
                Player1_won = false;
                running = false;
                Call_UltimateWin();
                return;
            };

            // other mode
            if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'admin') {
                statusText.textContent = `You just gained a point!`;

            } else if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'user') {
                statusText.textContent = `${PlayerData[1].PlayerName} just gained a point!`;
            };

            Player1_won = false;

        } else if (Player2_won == true) {
            statusText.textContent = `${PlayerData[2].PlayerName} just gained a point!`;
            score_Player2_numb = score_Player2_numb + 1 + extra_points;
            scorePlayer2.textContent = score_Player2_numb;

            // the opponent made a point in advanture mode
            if (inAdvantureMode) {
                statusText.textContent = `the unknown just gained a point`;
                if (score_Player2_numb >= points_to_win) {
                    statusText.textContent = `You lost against the evil. Are you willing to you try again?`;
                    Player2_won = false;
                    Call_UltimateWin();
                    return;
                };
            };

            if (score_Player2_numb >= points_to_win) {
                Player2_won = false;
                running = false;
                Call_UltimateWin();
                return;
            };

            // other mode
            if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'user') {
                statusText.textContent = `You just gained a point!`;

            } else if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'admin') {
                statusText.textContent = `${PlayerData[2].PlayerName} just gained a point!`;
            };

            Player2_won = false;
        };
    }, 1000);
};

// call Ultimate Game Win Function
function Call_UltimateWin(WinCombination) {
    CheckmateWarnText.style.display = "none" // just small bug fix nothing special
    chooseWinnerWindowBtn.removeEventListener('click', openChooseWinnerWindow);
    giveUp_Yes_btn.removeEventListener('click', function() { UserGivesUp(personal_GameData.role) });

    if (WinCombination == undefined) {
        setTimeout(() => {
            running = false;
            if (score_Player1_numb > score_Player2_numb) { // Player 1 has won
                UltimateGameWin(true, false);
                return;
            } else if (score_Player1_numb < score_Player2_numb) { // Player 2 has won
                UltimateGameWin(false, true);
                return;
            } else if (score_Player1_numb == score_Player2_numb) { // Tie
                UltimateGameWin(true, true);
                return;
            };
        }, 600);
    } else {
        setTimeout(() => {
            running = false;
            if (score_Player1_numb > score_Player2_numb) { // Player 1 has won
                UltimateGameWin(true, false, WinCombination);
                return;
            } else if (score_Player1_numb < score_Player2_numb) { // Player 2 has won
                UltimateGameWin(false, true, WinCombination);
                return;
            } else if (score_Player1_numb == score_Player2_numb) { // Tie
                UltimateGameWin(true, true, WinCombination);
                return;
            };
        }, 600);
    };
};

// Ultimate Game Win
function UltimateGameWin(player1_won, player2_won, WinCombination) {
    // Online or offline mode
    if (curr_mode == GameMode[2].opponent) { // in online mode
        // send message to server
        if (personal_GameData.role == "admin") socket.emit('Call_UltimateWin', personal_GameData.currGameID, [player1_won, player2_won, WinCombination]);
        return;

    } else {

        // so the user can't leave during the win animation
        leaveGame_btn.removeEventListener('click', UserleavesGame);
        restartBtn.removeEventListener('click', restartGame);
        restartBtn.removeEventListener('click', restartGame);
        giveUp_Yes_btn.removeEventListener('click', function() { UserGivesUp(personal_GameData.role) });
        leaveGame_btn.style.color = '#56565659';
        restartBtn.style.color = '#56565659';
        statusText.style.display = 'none';
        setTimeout(() => {
            leaveGame_btn.addEventListener('click', UserleavesGame);
            restartBtn.addEventListener('click', restartGame);
            giveUp_Yes_btn.addEventListener('click', function() { UserGivesUp(personal_GameData.role) });
            leaveGame_btn.style.color = 'var(--font-color)';
            restartBtn.style.color = 'var(--font-color)';
        }, 9000);

        // basic stuff
        stopStatusTextInterval = false;
        cells.forEach(cell => {
            single_CellBlock(cell, "fromMap");
        });

        killPlayerClocks();
        clearInterval(gameCounter);

        score_Player1_numb = 0;
        score_Player2_numb = 0;

        setTimeout(() => {
            cellGrid.classList.add('Invisible');
            statusText.classList.add('Invisible');
            GameFieldHeaderUnderBody.style.display = 'none';
            statusText.style.display = 'block';

            // restart Game counter
            let i = 4;
            var counter = setInterval(() => {
                if (!stopStatusTextInterval) {
                    // in Advanture mode and not
                    if (!inAdvantureMode) {
                        statusText.textContent = `New game in ${i}`;
                    } else {
                        statusText.textContent = `Leave level in ${i}`;
                    };

                    statusText.classList.remove('Invisible');
                    i--;
                    if (i <= -1) {
                        clearInterval(counter);
                        counter = null;

                        if (!inAdvantureMode) {
                            restartGame();
                        } else {
                            if (player1_won) { // user won and conquered the level
                                UserleavesGame(true, current_selected_level);
                            } else {
                                UserleavesGame();
                            };
                        };
                    };
                } else {
                    GameFieldHeaderUnderBody.style.display = 'flex';
                    clearInterval(counter);
                    counter = null;
                };
            }, 1000);
        }, 3000);

        setTimeout(() => {
            cellGrid.style.display = 'none';
            UltimateWinTextArea.style.display = 'flex';
            if (player1_won && !player2_won) { // player 1 won (user)

                // Display win text in the proper way
                if (!inAdvantureMode) {
                    UltimateWinText.textContent = `${PlayerData[1].PlayerName} won it `;

                } else if (inAdvantureMode || curr_mode == GameMode[1].opponent) {
                    UltimateWinText.textContent = `You conquered it `;

                    // if user beat level 10 - boss level
                    if (current_selected_level == 10) {
                        UltimateWinText.textContent = `You have conquered the evil `;

                        // additional img svg
                        let img = document.createElement('img');
                        let br = document.createElement('br');
                        img.src = "./assets/game/laurels-trophy.svg";
                        img.width = "300";
                        img.height = "300";
                        UltimateWinText.appendChild(br);
                        UltimateWinText.appendChild(img);
                    };
                };

                // additional img. If player is not it level 10 , this default img gets created
                if (current_selected_level != 10) {
                    // additional img svg
                    let img = document.createElement('img');
                    let br = document.createElement('br');
                    img.src = "./assets/game/holy-grail.svg";
                    img.width = "300";
                    img.height = "300";
                    UltimateWinText.appendChild(br);
                    UltimateWinText.appendChild(img);
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

            } else if (player2_won && !player1_won) { // player 2 won (user)

                if (inAdvantureMode) {
                    UltimateWinText.textContent = `You have lost `;

                    // additional img svg
                    let img = document.createElement('img');
                    let br = document.createElement('br');
                    img.src = "./assets/game/bleeding-eye.svg";
                    img.width = "300";
                    img.height = "300";
                    UltimateWinText.appendChild(br);
                    UltimateWinText.appendChild(img);

                } else {
                    // Display win text in the proper way
                    UltimateWinText.textContent = `${PlayerData[2].PlayerName} won it`;

                    // additional img svg
                    let img = document.createElement('img');
                    let br = document.createElement('br');
                    img.src = "./assets/game/holy-grail.svg";
                    img.width = "300";
                    img.height = "300";
                    UltimateWinText.appendChild(br);
                    UltimateWinText.appendChild(img);
                };

                if (!inAdvantureMode) {
                    player1_won = false;
                    player2_won = false;
                };

            } else if (player1_won && player2_won) {
                UltimateWinText.textContent = `GG Well played!`;

                // additional img svg
                let img = document.createElement('img');
                let br = document.createElement('br');
                img.src = "./assets/game/holy-grail.svg";
                img.width = "300";
                img.height = "300";
                UltimateWinText.appendChild(br);
                UltimateWinText.appendChild(img);

                if (!inAdvantureMode) {
                    player1_won = false;
                    player2_won = false;
                };
            };
        }, 2000);
    };
};

// the admin called the ultimate game win
// this message recieve all clients
socket.on('global_UltimateWin', (player1_won, player2_won, WinCombination) => {
    // basic stuff
    stopStatusTextInterval = false;
    cells.forEach(cell => {
        single_CellBlock(cell);
    });

    // so the user can't leave during the win animation
    leaveGame_btn.removeEventListener('click', UserleavesGame);
    restartBtn.removeEventListener('click', restartGame);
    giveUp_Yes_btn.removeEventListener('click', function() { UserGivesUp(personal_GameData.role) });
    leaveGame_btn.style.color = '#56565659';
    restartBtn.style.color = '#56565659';
    statusText.style.display = 'none';
    setTimeout(() => {
        leaveGame_btn.addEventListener('click', UserleavesGame);
        restartBtn.addEventListener('click', restartGame);
        leaveGame_btn.style.color = 'var(--font-color)';
        giveUp_Yes_btn.addEventListener('click', function() { UserGivesUp(personal_GameData.role) });
        GiveUp_btn.style.color = "#56565659";
        restartBtn.style.color = 'var(--font-color)';
    }, 9000);

    clearInterval(gameCounter);

    score_Player1_numb = 0;
    score_Player2_numb = 0;

    setTimeout(() => {
        cellGrid.classList.add('Invisible');
        statusText.classList.add('Invisible');
        GameFieldHeaderUnderBody.style.display = 'none';
        statusText.style.display = 'block';

        // restart Game counter
        let i = 4;
        var counter = setInterval(() => {
            if (!stopStatusTextInterval) {
                statusText.textContent = `leave game in ${i}`;
                statusText.classList.remove('Invisible');
                i--;
                if (i <= -1) {
                    clearInterval(counter);
                    counter = null;
                    // leave game after win and return to lobby
                    if (personal_GameData.role == "admin") UserleavesGame();
                };
            } else {
                GameFieldHeaderUnderBody.style.display = 'flex';
                clearInterval(counter);
                counter = null;
            };
        }, 1000);
    }, 3000);

    console.log(player1_won, player2_won)
    setTimeout(() => {
        cellGrid.style.display = 'none';
        UltimateWinTextArea.style.display = 'flex';
        if (player1_won && !player2_won) { // player 1 won (admin)

            // Display win text in the proper way
            if (personal_GameData.role == 'admin') {
                UltimateWinText.textContent = `You won it `;

                // continue with normal code
                let wins_storage = JSON.parse(localStorage.getItem('onlineMatches-won'));
                console.log(wins_storage)
                wins_storage = wins_storage + 1;
                localStorage.setItem('onlineMatches-won', wins_storage);
                console.log(wins_storage)

            } else {
                UltimateWinText.textContent = `${PlayerData[1].PlayerName} won it `;
            };

            // additional img svg
            let img = document.createElement('img');
            let br = document.createElement('br');
            img.src = "./assets/game/holy-grail.svg";
            img.width = "300";
            img.height = "300";
            UltimateWinText.appendChild(br);
            UltimateWinText.appendChild(img);

            if (curr_mode == GameMode[2].opponent) { // online friend 
                // only the user which is the winner in this case, earns skill points
                if (personal_GameData.role == 'admin') {
                    setNew_SkillPoints(10);
                };
                if (personal_GameData.role == 'user') {
                    minus_SkillPoints(5);
                };
            };
            if (curr_mode == GameMode[1].opponent) { // KI 
                setNew_SkillPoints(1);
            };
            return

        } else if (player2_won && !player1_won) { // player 2 won (user)
            // Display win text in the proper way
            if (personal_GameData.role == 'user') {
                UltimateWinText.textContent = `You won it `;

                // continue with normal code
                let wins_storage = JSON.parse(localStorage.getItem('onlineMatches-won'));
                console.log(wins_storage)
                wins_storage = wins_storage + 1;
                localStorage.setItem('onlineMatches-won', wins_storage);
                console.log(wins_storage)

            } else {
                UltimateWinText.textContent = `${PlayerData[2].PlayerName} won it `;
            };
            // additional img svg
            let img = document.createElement('img');
            let br = document.createElement('br');
            img.src = "./assets/game/holy-grail.svg";
            img.width = "300";
            img.height = "300";
            UltimateWinText.appendChild(br);
            UltimateWinText.appendChild(img);

            if (curr_mode == GameMode[2].opponent) { // online friend
                // only the user which is the winner in this case, earns skill points
                if (personal_GameData.role == 'user') {
                    setNew_SkillPoints(10);
                };

                if (personal_GameData.role == 'admin') {
                    minus_SkillPoints(5);
                };
            };
            if (curr_mode == GameMode[1].opponent) { // KI 
                setNew_SkillPoints(1);
            };
            return;

        } else if (player1_won && player2_won) {
            console.log(player1_won, player2_won)
            UltimateWinText.textContent = `GG Well played `;
            // additional img svg
            let img = document.createElement('img');
            let br = document.createElement('br');
            img.src = "./assets/game/bleeding-eye.svg";
            img.width = "300";
            img.height = "300";
            UltimateWinText.appendChild(br);
            UltimateWinText.appendChild(img);

            return;
        };
    }, 2000);
});

// Update skill points for player after a successful game
// This function is only availible in the online mode and KI mode because it makes only sense there
function setNew_SkillPoints(plus) {
    let old_Elo = parseInt(localStorage.getItem('ELO'));
    let ELO_point = 0;

    // extra animation addition
    ELO_Points_AddIcon.style.transition = 'none';
    ELO_Points_AddIcon.style.opacity = '1';
    ELO_Points_AddIcon.textContent = `+${plus}`;
    setTimeout(() => {
        ELO_Points_AddIcon.style.transition = 'all 2.15s ease-out';
        ELO_Points_AddIcon.style.opacity = '0';
    }, 700);

    // skill points N + additional_N
    let i = 0
    let set = setInterval(() => {
        i++;

        // animation
        ELO_Points_display.classList.add('ELO_ani');

        // sound
        btn_sound2.volume = 0.075;
        btn_sound2.play();

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
};

// Other player who loses gets -5 skill points
// This function is only availible in the online mode and KI mode because it makes only sense there
function minus_SkillPoints(minus) {
    let old_Elo = parseInt(localStorage.getItem('ELO'));
    let ELO_point = 0;

    // extra animation addition
    ELO_Points_AddIcon.style.transition = 'none';
    ELO_Points_AddIcon.style.opacity = '1';
    ELO_Points_AddIcon.textContent = `-${minus}`;
    setTimeout(() => {
        ELO_Points_AddIcon.style.transition = 'all 1.35s ease-out';
        ELO_Points_AddIcon.style.opacity = '0';
    }, 700);

    // skill points N + additional_N
    let i = 0
    let set = setInterval(() => {
        i++;

        // animation
        ELO_Points_display.classList.add('ELO_ani');

        // sound
        btn_sound2.volume = 0.075;
        btn_sound2.play();

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