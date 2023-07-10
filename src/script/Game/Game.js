const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restart-btn');

let running = false;
let stopStatusTextInterval = false;
let rounds_played = 0;

let curr_mode = "";
let curr_field = "";

// Field x and y 
let yCell_Amount; // numb
let xCell_Amount; // numb

// Player 1 is always X and can start first
let PlayerData = {
    1: {
        'PlayerName': '',
        'PlayerForm': 'X'
    },
    2: {
        'PlayerName': '',
        'PlayerForm': 'O'
    },
};

let currentPlayer = PlayerData[1].PlayerForm; // current player form. X ? O
let currentName;

let score_Player1_numb = 0;
let score_Player2_numb = 0;

let cells;

function initializeGame(field) {
    let fieldTitle = field.getAttribute('title');
    let fieldIndex = field.getAttribute('index');

    console.log(fieldIndex, Fields)

    // reset score
    score_Player1_numb = 0;
    score_Player2_numb = 0;
    rounds_played = 0;

    // set up x and y coordinate
    xCell_Amount = Fields[fieldIndex].xyCellAmount;
    yCell_Amount = Fields[fieldIndex].xyCellAmount;

    // set up background data
    curr_field = Fields[fieldIndex].name;

    //Creates TicTacToe field etc.
    CreateField();
    CreateWinConditions(xCell_Amount);
    CreateOptions();

    // add Event Listener
    const el_cells = document.querySelectorAll('.cell');
    cells = el_cells;

    // Adds click event to every single cell and starts game
    el_cells.forEach(cell => {
        cell.addEventListener('click', cellCicked);
    });
    // set up restart button
    restartBtn.addEventListener('click', restartGame);
    running = true;

    Start_Blocker();
    Find_MaxDepth();
    initializeDocument(field, fieldIndex, fieldTitle);
};

function initializeDocument(field, fieldIndex, fieldTitle) {
    GameField.style.display = 'flex';
    gameModeFields_Div.style.display = 'none';
    // lobbyHeader.style.display = 'none';

    // Init game title,game icon and game info
    GameTitle.textContent = fieldTitle;
    Game_Upper_Field_Icon.classList = `${Fields[fieldIndex].icon} field-card-header-icon`;
    GameField_FieldSizeDisplay.textContent = `${Fields[fieldIndex].size}`;
    GameField_BlockAmountDisplay.textContent = `${Fields[fieldIndex].blocks}`;
    GameField_AveragePlayTimeDisplay.textContent = `ave. playtime ${Fields[fieldIndex].averagePlayTime}`;
    cellGrid.style.display = 'grid';
    cellGrid.classList.remove('Invisible');
    cellGrid.classList.add('cellGrid_opacity');
    // Init Player 
    initializePlayers();
};

function initializePlayers() {
    scorePlayer1.textContent = score_Player1_numb;
    scorePlayer2.textContent = score_Player2_numb;

    namePlayer1.textContent = curr_name1 + ' (X)';
    namePlayer2.textContent = curr_name2 + ' (O)';

    PlayerData[1].PlayerName = curr_name1;
    PlayerData[2].PlayerName = curr_name2;

    currentName = PlayerData[1].PlayerName;
    currentPlayer = PlayerData[1].PlayerForm;

    // set up statusText
    statusText.textContent = `${currentName}'s turn`;
    UltimateWinTextArea.style.display = 'none';
};

function cellCicked() {
    if (this.classList == "cell") { // cell is alive and useable
        const cellIndex = this.getAttribute("cell-index");

        // check if cell is already drawn or the game is running
        if (options[cellIndex] != "" || !running) {
            return;
        };

        updateCell(this, cellIndex);
        setTimeout(() => {
            checkWinner();
        }, 100);
    };
};

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
};

function changePlayer() {
    currentPlayer = (currentPlayer == PlayerData[1].PlayerForm) ? PlayerData[2].PlayerForm : PlayerData[1].PlayerForm;
    currentName = (currentName == PlayerData[1].PlayerName) ? PlayerData[2].PlayerName : PlayerData[1].PlayerName;

    // If in KI Mode and it is Ki's turn now
    if (curr_mode == GameMode[1].opponent && currentPlayer == PlayerData[2].PlayerForm) {
        statusText.textContent = `Waiting for ${currentName}...`;

    } else {
        statusText.textContent = `${currentName}'s turn`;
    };
};

function checkWinner() {
    let roundWon = false;
    let Player1_won = false; // check if x has won
    let Player2_won = false; // check if o has won
    // for minimax
    let winner = null;
    let WinCombination = [];
    let Grid = Array.from(cellGrid.children);

    // remove access to set
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
    });
    running = false

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

            if (cellA == "" || cellB == "" || cellC == "" || cellD == "") { // Check win for a 4 block pattern combination
                continue
            };
            if (cellA == cellB && cellB == cellC && cellC == cellD) {
                winner = cellA;
                roundWon = true;
                WinCombination.push(EleOf_A, EleOf_B, EleOf_C, EleOf_D);

                break;
            };

        } else if (cellD == undefined && cellE == undefined && cellC != undefined) { // Check win for a 3 block pattern combination

            if (cellA == "" || cellB == "" || cellC == "") {
                continue
            };
            if (cellA == cellB && cellB == cellC) {
                winner = cellA
                roundWon = true;
                WinCombination.push(EleOf_A, EleOf_B, EleOf_C);

                break;
            };

        } else if (cellD != undefined && cellE != undefined) { // Check win for a 5 block pattern combination

            if (cellA == "" || cellB == "" || cellC == "" || cellD == "" || cellE == "") {
                continue
            };
            if (cellA == cellB && cellB == cellC && cellC == cellD && cellD == cellE) {
                winner = cellA
                roundWon = true;
                WinCombination.push(EleOf_A, EleOf_B, EleOf_C, EleOf_D, EleOf_E);

                break;
            };
        };
    };

    if (winner == "X") {
        Player1_won = true;

    } else if (winner == "O") {
        Player2_won = true;
    };

    ProcessResult(Player1_won, Player2_won, roundWon, winner, WinCombination);
};

function ProcessResult(Player1_won, Player2_won, roundWon, winner, WinCombination) {
    // check if there are still availible cells remaining
    let ava_cells = check_RemainingCells();

    if (roundWon) {
        // Choose winner
        chooseSubWinner(Player1_won, Player2_won, WinCombination);

        setTimeout(() => {
            // Make cells die effect
            if (curr_field != 'Small Price' || curr_field != 'Thunder Advanture') {
                setTimeout(() => {
                    let grid = [...cellGrid.children];
                    // Make used cells die
                    for (cell of grid) {
                        if (cell.textContent == "X" || cell.textContent == "O") {
                            single_CellBlock(cell);
                        };
                    };
                    ava_cells = check_RemainingCells();
                }, 600);
            };

            // Ultimate Game Win Check
            rounds_played++;
            if (curr_field == 'Small Price' && rounds_played == 1 || curr_field == 'Thunder Advanture' && rounds_played == 1 || curr_field == 'Quick Death' && rounds_played == 1) {
                Call_UltimateWin(WinCombination);
                return;
            };

            // Change player things
            setTimeout(() => {
                if (currentPlayer == "X" && curr_mode == GameMode[1].opponent) {
                    setTimeout(() => {
                        changePlayer();
                        KI_Action();
                    }, 1000);

                } else {
                    // add access to set
                    setTimeout(() => {
                        cells.forEach(cell => {
                            cell.addEventListener('click', cellCicked);
                            cell.style.cursor = 'pointer';
                        });
                        running = true;
                        changePlayer();
                    }, 1600);
                };
            }, 600);
        }, 1500);

    } else if (ava_cells.length <= 0) {
        Call_UltimateWin(WinCombination);
        return;

    } else {
        running = false;
        if (currentPlayer == "X" && curr_mode == GameMode[1].opponent) {
            changePlayer();
            setTimeout(() => {
                running = true;
                KI_Action();
            }, 1000);

        } else {
            // add access to set X from Player1 
            setTimeout(() => {
                // add access to set
                cells.forEach(cell => {
                    cell.addEventListener('click', cellCicked);
                });
                running = true;
                changePlayer();
            }, 100);
        };
    };
};

// choose sub winner
function chooseSubWinner(Player1_won, Player2_won, WinCombination) {
    WinCombination.forEach(Ele => {
        Ele.classList.add('about-to-die-cell');
    });
    if (Player1_won == true) {

        score_Player1_numb++;
        scorePlayer1.textContent = score_Player1_numb;
        statusText.textContent = `${PlayerData[1].PlayerName} just gained a point!`;

        Player1_won = false;

    } else if (Player2_won == true) {

        score_Player2_numb++;
        scorePlayer2.textContent = score_Player2_numb;
        statusText.textContent = `${PlayerData[2].PlayerName} just gained a point!`;

        Player2_won = false;
    };
};

// check remaining white cells
function check_RemainingCells() {
    let availible_cells = [];
    cells.forEach(cell => {
        if (cell.classList.length <= 1 && cell.textContent == "") {
            availible_cells.push(cell);
        };
    });
    return availible_cells;
};

// restart game
function restartGame() {
    stopStatusTextInterval = true;
    cellGrid.classList.remove('cellGrid_opacity');
    setTimeout(() => {
        changePlayer();
        NxN_field.forEach(field => {
            if (field.getAttribute('title') == curr_field) {
                initializeGame(field);
            };
        });
    }, 50);
};

// Block used cells after a win
function single_CellBlock(cell) {
    cell.classList = "cell death-cell";
    cell.style.animation = "blackenCell 2s forwards"; // Animation aktivieren
    cell.removeEventListener('click', cellCicked);
    setTimeout(() => {
        cell.textContent = null;
    }, 2000);
    // Bug Fix
    CreateOptions();
};

// call Ultimate Game Win Function
function Call_UltimateWin(WinCombination) {
    setTimeout(() => {
        running = false;
        if (score_Player1_numb > score_Player2_numb) { // Player 1 has won
            UltimateGameWin(true, false, WinCombination);
        } else if (score_Player1_numb < score_Player2_numb) { // Player 2 has won
            UltimateGameWin(false, true, WinCombination);
        } else if (score_Player1_numb == score_Player2_numb) { // Tie
            UltimateGameWin(true, true, WinCombination);
        };
    }, 600);
};

// Ultimate Game Win
function UltimateGameWin(player1_won, player2_won, WinCombination) {
    stopStatusTextInterval = false;
    cells.forEach(cell => {
        single_CellBlock(cell);
    });

    setTimeout(() => {
        cellGrid.classList.add('Invisible');
        statusText.classList.add('Invisible');

        // restart Game counter
        let i = 10;
        var counter = setInterval(() => {
            if (!stopStatusTextInterval) {
                statusText.textContent = `New game in ${i}`;
                statusText.classList.remove('Invisible');
                i--;
                console.log(stopStatusTextInterval)
                if (i <= -1) {
                    clearInterval(counter);
                    restartGame();
                };
            } else clearInterval(counter);
        }, 1000);
    }, 1500);

    setTimeout(() => {
        cellGrid.style.display = 'none';
        UltimateWinTextArea.style.display = 'flex';
        if (player1_won && !player2_won) {
            UltimateWinText.textContent = `${PlayerData[1].PlayerName} won it! 🏆`;

        } else if (player2_won && !player1_won) {
            UltimateWinText.textContent = `${PlayerData[2].PlayerName} won it! 🏆`;

        } else if (player1_won && player2_won) {
            UltimateWinText.textContent = `GG Well played!`;
        };

    }, 2000);
};