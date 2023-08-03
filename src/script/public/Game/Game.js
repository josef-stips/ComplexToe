const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restart-btn');

let running = false;
let stopStatusTextInterval = false;
let rounds_played = 0;

let curr_field = "";

// Field x and y 
let yCell_Amount; // numb
let xCell_Amount; // numb

// Player 1 is always X and can start first
let PlayerData = {
    1: {
        'PlayerName': '',
        'PlayerForm': ''
    },
    2: {
        'PlayerName': '',
        'PlayerForm': ''
    },
};

let GameData = {
    "InnerGameMode": "",
    "PlayerClock": "",
};

let currentPlayer = PlayerData[1].PlayerForm; // current player form. X ? O
let currentName;

let cells;

// minimax scores
let scores = {
    // 'X': -1,
    // 'O': 1,
    // tie: 0,
};

// temporar local online game data
let OnlineGameData;

// Need to check wether player 1 (admin) or player 2 (user) can set
// false : player2 can set; true : player1 can set
let player1_can_set = true; // admin has the right to set first when the game starts

// Initialize Game
function initializeGame(field, onlineGame, OnlineGameDataArray) {
    // Define field data for game
    // If online game set online game data, if not set normal data
    let fieldIndex = Array.isArray(OnlineGameDataArray) ? OnlineGameDataArray[0] : field.getAttribute('index');
    let fieldTitle = Array.isArray(OnlineGameDataArray) ? OnlineGameDataArray[1] : field.getAttribute('title');

    // set up x and y coordinate
    xCell_Amount = Fields[fieldIndex].xyCellAmount;
    yCell_Amount = Fields[fieldIndex].xyCellAmount;

    // set up background data
    curr_field = Fields[fieldIndex].name;

    // reset score
    score_Player1_numb = 0;
    score_Player2_numb = 0;
    rounds_played = 0;

    // If in online game mode
    if (onlineGame == 'OnlineMode') {
        OnlineGameData = OnlineGameDataArray;

        options = OnlineGameDataArray[2]; // global options

        // player data
        curr_name1 = OnlineGameDataArray[3];
        curr_name2 = OnlineGameDataArray[4];
        curr_form1 = OnlineGameDataArray[5];
        curr_form2 = OnlineGameDataArray[6];

        curr_selected_PlayerClock = OnlineGameDataArray[7];

    } else { // If not in online game mode
        CreateOptions();
    };

    //Creates TicTacToe field etc.
    CreateField();
    CreateWinConditions(xCell_Amount);

    // add Event Listener
    const el_cells = document.querySelectorAll('.cell');
    cells = el_cells;

    // set up restart button
    restartBtn.addEventListener('click', restartGame);

    // Adds click event to every single cell and starts game
    el_cells.forEach(cell => {
        cell.addEventListener('click', cellCicked);
    });

    running = true;
    player1_can_set = true;

    // In the online game mode the curr_innerGameMode gets its right value in serverHandler.js
    GameData.InnerGameMode = curr_innerGameMode;

    if (curr_mode != GameMode[1].opponent) { // If not in KI Mode
        // Inner game Mode
        if (GameData.InnerGameMode == InnerGameModes[1]) { // Boneyard
            Start_Blocker(onlineGame);

        } else if (GameData.InnerGameMode == InnerGameModes[2]) { // Blocker Combat
            // Blocker blocks one single block after every set
            // Activate_InteractiveBlocker();

        } else if (GameData.InnerGameMode == InnerGameModes[3]) { // Free Fight
            // no blocker
        };
    };

    Find_MaxDepth();

    if (onlineGame == 'OnlineMode') {
        initializeDocument(field, fieldIndex, fieldTitle, true);
    } else {
        initializeDocument(field, fieldIndex, fieldTitle, false);
    };
};

function initializeDocument(field, fieldIndex, fieldTitle, onlineMode) {
    GameField.style.display = 'flex';
    gameModeFields_Div.style.display = 'none';
    // lobbyHeader.style.display = 'none';

    // Init game title,game icon and game info
    GameTitle.textContent = fieldTitle;
    Game_Upper_Field_Icon.classList = `${Fields[fieldIndex].icon} field-card-header-icon`;
    GameField_FieldSizeDisplay.textContent = `${Fields[fieldIndex].size}`;
    GameField_BlockAmountDisplay.textContent = `${Fields[fieldIndex].blocks}`;
    GameField_AveragePlayTimeDisplay.textContent = `ave. playtime ${Fields[fieldIndex].averagePlayTime}`;

    // cell grid things
    cellGrid.style.display = 'grid';
    cellGrid.classList.remove('Invisible');
    cellGrid.classList.remove('cellGrid-alert');
    cellGrid.classList.add('cellGrid_opacity');

    if (!onlineMode) {
        // How long the game is - Game Counter
        let GameSeconds = 0;
        GameField_TimeMonitor.textContent = '0 s.';
        clearInterval(gameCounter)
        gameCounter = setInterval(() => {
            GameSeconds++;
            GameField_TimeMonitor.textContent = GameSeconds + ' s.';
        }, 1000);

        restartBtn.style.color = 'var(font-color)';

    } else { // Is in online mode
        // Make sure that the user is not allowed to reload the game

        // The global game timer is by the admin
        if (personal_GameData.role == 'admin') {
            // How long the game is - Game Counter
            GameField_TimeMonitor.textContent = '0 s.';
            clearInterval(gameCounter);

            gameCounter = setInterval(() => {
                // send message to server
                // server sends message to all clients
                socket.emit('globalTimer', personal_GameData.currGameID);
            }, 1000);
        };

        // set up restart button for online game
        if (personal_GameData.role == 'user') {
            restartBtn.style.color = '#56565659';
            restartBtn.removeEventListener('click', restartGame);

        } else if (personal_GameData.role == 'admin') {
            restartBtn.style.color = 'var(--font-color)';
            restartBtn.addEventListener('click', restartGame);
        };
    };

    // choose winner button
    chooseWinnerWindowBtn.addEventListener('click', openChooseWinnerWindow);

    // Init Player 
    initializePlayers();
};

function initializePlayers() {
    scorePlayer1.textContent = score_Player1_numb;
    scorePlayer2.textContent = score_Player2_numb;

    // Player Name
    PlayerData[1].PlayerName = curr_name1;
    PlayerData[2].PlayerName = curr_name2;
    // Player Form
    PlayerData[1].PlayerForm = curr_form1.toUpperCase();
    PlayerData[2].PlayerForm = curr_form2.toUpperCase();

    namePlayer1.textContent = curr_name1 + ` (${PlayerData[1].PlayerForm})`;
    namePlayer2.textContent = curr_name2 + ` (${PlayerData[2].PlayerForm})`;

    currentName = PlayerData[1].PlayerName;
    currentPlayer = PlayerData[1].PlayerForm;

    Player1_ChooseWinnerDisplay.textContent = PlayerData[1].PlayerName;
    Player2_ChooseWinnerDisplay.textContent = PlayerData[2].PlayerName;

    // player clock set up
    GameData.PlayerClock = curr_selected_PlayerClock;

    if (curr_mode != GameMode[1].opponent) {
        GameFieldHeaderUnderBody.style.display = 'flex';
        SecondPlayerTime.style.display = 'flex';
        FirstPlayerTime.style.display = 'flex';

        SecondPlayerTime.textContent = `${GameData.PlayerClock}`;
        FirstPlayerTime.textContent = `${GameData.PlayerClock}`;
        Activate_PlayerClock(true, false); // first param: first player; second param: second player

    } else {
        GameFieldHeaderUnderBody.style.display = 'none';
    };

    // set up statusText
    if (curr_mode == GameMode[2].opponent) { // in online mode
        socket.emit('changePlayer', personal_GameData.currGameID, currentName);

    } else { // other one
        statusText.textContent = `${currentName}'s turn`;
    };

    UltimateWinTextArea.style.display = 'none';

    // deprive user of its right to choose the winner
    if (personal_GameData.role == 'user' && curr_mode == GameMode[2].opponent) {
        chooseWinnerWindowBtn.style.color = '#56565659';
        chooseWinnerWindowBtn.removeEventListener('click', openChooseWinnerWindow);
    };

    // Define minimax scores for KI Mode
    scores[PlayerData[1].PlayerForm] = -1;
    scores[PlayerData[2].PlayerForm] = 1;
    scores['tie'] = 0;
};

// when the game starts, for all players in the game, 
// the global game timer recieves the global timer from the server and displays it
socket.on('display_GlobalGameTimer', timer => {
    GameField_TimeMonitor.textContent = `${timer} s.`;
});

// user clicked some cell
function cellCicked() {
    if (this.classList == "cell") { // cell is alive and useable
        const cellIndex = this.getAttribute("cell-index");

        // check if cell is already drawn or the game is running
        if (options[cellIndex] != "" || !running) {
            return;
        };

        // If in online mode
        if (curr_mode == GameMode[2].opponent) {

            // so the user can't leave the game directly after he setted 
            leaveGame_btn.removeEventListener('click', UserleavesGame);
            leaveGame_btn.style.color = '#56565659';
            setTimeout(() => {
                leaveGame_btn.addEventListener('click', UserleavesGame);
                leaveGame_btn.style.color = 'var(--font-color)';
            }, 2000);

            // Check if the first player (admin) can set and the player that clicked it the admin
            // if not, nothing must happen
            if (player1_can_set && personal_GameData.role == 'admin') {
                socket.emit('PlayerClicked', [personal_GameData.currGameID, personal_GameData.role, cellIndex, currentPlayer, player1_can_set]);

            }; // the second player tries to click, but he must wait for his opponent;

            // Check if the second player (user) can set and the player that clicked it the user
            // if not, nothing must happen
            if (!player1_can_set && personal_GameData.role == 'user') {
                socket.emit('PlayerClicked', [personal_GameData.currGameID, personal_GameData.role, cellIndex, currentPlayer, player1_can_set]);

            }; // the first player tries to click, but he must wait for his opponent

        } else { // some other mode

            // so the user can't leave the game directly after he setted 
            leaveGame_btn.removeEventListener('click', UserleavesGame);
            leaveGame_btn.style.color = '#56565659';
            setTimeout(() => {
                leaveGame_btn.addEventListener('click', UserleavesGame);
                leaveGame_btn.style.color = 'var(--font-color)';
            }, 2000);

            updateCell(cellIndex);

            if (curr_mode != GameMode[1].opponent) { // If not in KI Mode

                SecondPlayerTime.style.color = 'var(--font-color)';
                FirstPlayerTime.style.color = 'var(--font-color)';

                if (GameData.InnerGameMode == InnerGameModes[2]) { // blocker combat inner game mode
                    // Active Blocker blocks a cell
                    Activate_InteractiveBlocker();

                    // important stuff
                    clearInterval(firstClock);
                    clearInterval(secondClock);

                    // check winner after a time
                    setTimeout(() => {
                        checkWinner();
                    }, 1000);

                } else if (GameData.InnerGameMode == InnerGameModes[1] || GameData.InnerGameMode == InnerGameModes[3]) { // If other inner game mode => just check winner
                    checkWinner();
                };

            } else { // if in KI Mode just check the winner 
                checkWinner();
            };
        };
    };
};

// A message to all players that a player setted his form on a cell
// the update options event is in the server, here the options array gets copied
socket.on('player_clicked', Goptions => {
    // update cell
    options = Goptions[0];

    let cells = [...cellGrid.children];

    for (let i = 0; i < options.length; i++) {
        const element = options[i];

        cells[i].textContent = element;
    };

    // Check which inner game mode is activated
    if (GameData.InnerGameMode == InnerGameModes[2]) { // blocker combat inner game mode
        // Active Blocker blocks a cell
        Activate_InteractiveBlocker();

        // important stuff
        clearInterval(firstClock);
        clearInterval(secondClock);

        // check winner after a time
        setTimeout(() => {
            // update which player can set next
            player1_can_set = Goptions[1];

            // check the winner
            checkWinner();
        }, 1000);

    } else if (GameData.InnerGameMode == InnerGameModes[1] || GameData.InnerGameMode == InnerGameModes[3]) { // If other inner game mode => just check winner
        // update which player can set next
        player1_can_set = Goptions[1];
        // check the winner
        checkWinner();
    };
});

// normal update cell function when player in offline mode clicks cell
function updateCell(index) {
    options[index] = currentPlayer;

    let cells = [...cellGrid.children];
    cells[index].textContent = currentPlayer;
};

function Activate_PlayerClock(PlayerOne, PlayerTwo) {
    if (PlayerOne) {
        update1();
    };

    if (PlayerTwo) {
        update2();
    };
};

function update1() {
    // In online mode, the admin sends an emit to the server so the server sends an emit
    // to all clients
    if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'admin') {
        socket.emit('INI_playerTimer1', personal_GameData.currGameID);

    } else if (curr_mode != GameMode[2].opponent) {
        let Seconds = GameData.PlayerClock;

        SecondPlayerTime.textContent = `${GameData.PlayerClock}`;
        SecondPlayerTime.style.color = 'var(--font-color)';
        FirstPlayerTime.style.color = 'var(--font-color)';

        firstClock = setInterval(() => {
            Seconds--;
            FirstPlayerTime.textContent = `${Seconds}`;

            // time is almost out, dangerous
            if (Seconds <= 2) {
                FirstPlayerTime.style.color = 'red';
            };

            // Time is out. play cool animation and next player's turn
            if (Seconds == -1) {
                chooseWinnerWindowBtn.removeEventListener('click', openChooseWinnerWindow);
                restartBtn.removeEventListener('click', restartGame);
                leaveGame_btn.removeEventListener('click', UserleavesGame);

                leaveGame_btn.style.color = '#56565659';
                chooseWinnerWindowBtn.style.color = '#56565659';
                leaveGame_btn.style.color = '#56565659';

                FirstPlayerTime.textContent = `${0} `;
                clearInterval(firstClock);

                cellGrid.classList.remove('cellGrid_opacity');
                cellGrid.classList.add('cellGrid-alert');

                if (GameData.InnerGameMode == InnerGameModes[2]) {
                    Activate_InteractiveBlocker();
                };

                setTimeout(() => {
                    cellGrid.classList.remove('cellGrid-alert');
                    FirstPlayerTime.style.color = 'var(--font-color)';
                    cellGrid.style.backgroundColor = "";
                    // now it's player one turn
                    checkWinner();

                    chooseWinnerWindowBtn.addEventListener('click', openChooseWinnerWindow);
                    restartBtn.addEventListener('click', restartGame);
                    leaveGame_btn.addEventListener('click', UserleavesGame);

                    leaveGame_btn.style.color = 'var(--font-color)';
                    chooseWinnerWindowBtn.style.color = 'var(--font-color)';
                    restartBtn.style.color = 'var(--font-color)';
                }, 1000);
            };
        }, 1000);
    };
};

function update2() {
    // In online mode, the admin sends an emit to the server so the server sends an emit
    // to all clients
    if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'admin') {
        socket.emit('INI_playerTimer2', personal_GameData.currGameID);

    } else if (curr_mode != GameMode[2].opponent) {
        let Seconds = GameData.PlayerClock;

        FirstPlayerTime.textContent = `${GameData.PlayerClock}`;
        SecondPlayerTime.style.color = 'var(--font-color)';
        FirstPlayerTime.style.color = 'var(--font-color)';

        secondClock = setInterval(() => {
            Seconds--;
            SecondPlayerTime.textContent = `${Seconds}`;

            // time is almost out, dangerous
            if (Seconds <= 2) {
                SecondPlayerTime.style.color = 'red';
            };

            // Time is out. play cool animation and next player's turn
            if (Seconds == -1) {
                chooseWinnerWindowBtn.removeEventListener('click', openChooseWinnerWindow);
                restartBtn.removeEventListener('click', restartGame);
                leaveGame_btn.removeEventListener('click', UserleavesGame);

                leaveGame_btn.style.color = '#56565659';
                chooseWinnerWindowBtn.style.color = '#56565659';
                leaveGame_btn.style.color = '#56565659';

                SecondPlayerTime.textContent = `${0}`;
                clearInterval(secondClock);

                cellGrid.classList.remove('cellGrid_opacity');
                cellGrid.classList.add('cellGrid-alert');

                if (GameData.InnerGameMode == InnerGameModes[2]) {
                    Activate_InteractiveBlocker();
                };

                setTimeout(() => {
                    cellGrid.classList.remove('cellGrid-alert');
                    SecondPlayerTime.style.color = 'var(--font-color)';
                    cellGrid.style.backgroundColor = "";
                    // now it's player one turn
                    checkWinner();

                    chooseWinnerWindowBtn.addEventListener('click', openChooseWinnerWindow);
                    restartBtn.addEventListener('click', restartGame);
                    leaveGame_btn.addEventListener('click', UserleavesGame);

                    leaveGame_btn.style.color = 'var(--font-color)';
                    chooseWinnerWindowBtn.style.color = 'var(--font-color)';
                    restartBtn.style.color = 'var(--font-color)';
                }, 1000);
            };
        }, 1000);
    };
};

// from the server to all clients in online mode
socket.on('playerTimer1', () => {
    let Seconds = GameData.PlayerClock;

    SecondPlayerTime.textContent = `${GameData.PlayerClock}`;
    SecondPlayerTime.style.color = 'var(--font-color)';
    FirstPlayerTime.style.color = 'var(--font-color)';

    firstClock = setInterval(() => {
        Seconds--;
        FirstPlayerTime.textContent = `${Seconds}`;

        // time is almost out, dangerous
        if (personal_GameData.role == 'admin') {
            if (Seconds <= 2) {
                FirstPlayerTime.style.color = 'red';
            };
        };

        // Time is out. play cool animation and next player's turn
        if (Seconds == -1) {
            chooseWinnerWindowBtn.removeEventListener('click', openChooseWinnerWindow);
            restartBtn.removeEventListener('click', restartGame);
            leaveGame_btn.removeEventListener('click', UserleavesGame);

            leaveGame_btn.style.color = '#56565659';
            chooseWinnerWindowBtn.style.color = '#56565659';
            leaveGame_btn.style.color = '#56565659';

            FirstPlayerTime.textContent = `${0} `;
            clearInterval(firstClock);

            cellGrid.classList.remove('cellGrid_opacity');
            cellGrid.classList.add('cellGrid-alert');

            if (GameData.InnerGameMode == InnerGameModes[2]) {
                Activate_InteractiveBlocker();
            };

            setTimeout(() => {
                cellGrid.classList.remove('cellGrid-alert');
                FirstPlayerTime.style.color = 'var(--font-color)';
                cellGrid.style.backgroundColor = "";
                // now it's player two turn
                player1_can_set = false;
                checkWinner();

                leaveGame_btn.addEventListener('click', UserleavesGame);
                leaveGame_btn.style.color = 'var(--font-color)';

                if (personal_GameData.role == 'admin') {
                    chooseWinnerWindowBtn.addEventListener('click', openChooseWinnerWindow);
                    restartBtn.addEventListener('click', restartGame);
                    chooseWinnerWindowBtn.style.color = 'var(--font-color)';
                    restartBtn.style.color = 'var(--font-color)';
                };
            }, 1000);
        };
    }, 1000);
});

// from the server to all clients in online mode
socket.on('playerTimer2', () => {
    let Seconds = GameData.PlayerClock;

    FirstPlayerTime.textContent = `${GameData.PlayerClock}`;
    SecondPlayerTime.style.color = 'var(--font-color)';
    FirstPlayerTime.style.color = 'var(--font-color)';

    secondClock = setInterval(() => {
        Seconds--;
        SecondPlayerTime.textContent = `${Seconds}`;

        // time is almost out, dangerous
        if (personal_GameData.role == 'user') {
            if (Seconds <= 2) {
                SecondPlayerTime.style.color = 'red';
            };
        };

        // Time is out. play cool animation and next player's turn
        if (Seconds == -1) {
            chooseWinnerWindowBtn.removeEventListener('click', openChooseWinnerWindow);
            restartBtn.removeEventListener('click', restartGame);
            leaveGame_btn.removeEventListener('click', UserleavesGame);

            leaveGame_btn.style.color = '#56565659';
            chooseWinnerWindowBtn.style.color = '#56565659';
            leaveGame_btn.style.color = '#56565659';

            SecondPlayerTime.textContent = `${0}`;
            clearInterval(secondClock);

            cellGrid.classList.remove('cellGrid_opacity');
            cellGrid.classList.add('cellGrid-alert');

            if (GameData.InnerGameMode == InnerGameModes[2]) {
                Activate_InteractiveBlocker();
            };

            setTimeout(() => {
                cellGrid.classList.remove('cellGrid-alert');
                SecondPlayerTime.style.color = 'var(--font-color)';
                cellGrid.style.backgroundColor = "";
                // now it's player two turn
                player1_can_set = true;
                checkWinner();

                leaveGame_btn.addEventListener('click', UserleavesGame);
                leaveGame_btn.style.color = 'var(--font-color)';

                if (personal_GameData.role == 'admin') {
                    chooseWinnerWindowBtn.addEventListener('click', openChooseWinnerWindow);
                    restartBtn.addEventListener('click', restartGame);
                    chooseWinnerWindowBtn.style.color = 'var(--font-color)';
                    restartBtn.style.color = 'var(--font-color)';
                };
            }, 1000);
        };
    }, 1000);
});

function changePlayer(from_restart) {
    currentPlayer = (currentPlayer == PlayerData[1].PlayerForm) ? PlayerData[2].PlayerForm : PlayerData[1].PlayerForm;
    currentName = (currentName == PlayerData[1].PlayerName) ? PlayerData[2].PlayerName : PlayerData[1].PlayerName;

    // If in KI Mode and it is Ki's turn now
    if (curr_mode == GameMode[1].opponent) {
        if (currentPlayer == PlayerData[2].PlayerForm) {
            statusText.textContent = `Waiting for ${currentName}...`;
        };

        if (currentPlayer == PlayerData[1].PlayerForm) {
            statusText.textContent = `${currentName}'s turn`;
        };

    } else { // If not in KI Mode
        if (!from_restart) {

            // basic things
            clearInterval(firstClock);
            clearInterval(secondClock);
            if (currentPlayer == PlayerData[1].PlayerForm) {
                Activate_PlayerClock(true, false);

            } else if (currentPlayer == PlayerData[2].PlayerForm) {
                Activate_PlayerClock(false, true);
            };

            // If in Online Mode
            if (curr_mode == GameMode[2].opponent) {
                // "Your turn" for player who's turn
                socket.emit('changePlayer', personal_GameData.currGameID, currentName);

            } else { // if other mode
                statusText.textContent = `${currentName}'s turn`;
            };
        };
    };

    const el_cells = document.querySelectorAll('.cell');
    cells = el_cells;

    el_cells.forEach(cell => {
        cell.addEventListener('click', cellCicked);
    });
};

// additional change player function for online game mode
// This is from the server to all clients
socket.on('changePlayerTurnDisplay', (curr_name) => {
    // Change for all clients
    if (curr_name == PlayerData[1].PlayerName && personal_GameData.role == 'admin') { // INFO: admin is always player one
        statusText.textContent = `Your turn`;

    } else if (curr_name == PlayerData[1].PlayerName && personal_GameData.role == 'user') {
        statusText.textContent = `${curr_name}'s turn`;
    };

    if (curr_name == PlayerData[2].PlayerName && personal_GameData.role == 'user') { // INFO: user is always player two
        statusText.textContent = `Your turn`;

    } else if (curr_name == PlayerData[2].PlayerName && personal_GameData.role == 'admin') {
        statusText.textContent = `${curr_name}'s turn`;
    };
});

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

    if (winner == PlayerData[1].PlayerForm) {
        Player1_won = true;

    } else if (winner == PlayerData[2].PlayerForm) {
        Player2_won = true;
    };

    ProcessResult(Player1_won, Player2_won, roundWon, winner, WinCombination);
};

function ProcessResult(Player1_won, Player2_won, roundWon, winner, WinCombination) {
    // check if there are still availible cells remaining
    let ava_cells = check_RemainingCells();

    if (roundWon) {
        clearInterval(firstClock);
        clearInterval(secondClock);
        // Choose winner
        chooseSubWinner(Player1_won, Player2_won, WinCombination);

        setTimeout(() => {
            // Make cells die effect
            if (curr_field != 'Small Price' || curr_field != 'Thunder Advanture') {
                setTimeout(() => {
                    let grid = [...cellGrid.children];
                    // Make used cells die
                    for (cell of grid) {
                        if (cell.textContent == PlayerData[1].PlayerForm || cell.textContent == PlayerData[2].PlayerForm) {
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
                if (currentPlayer == PlayerData[1].PlayerForm && curr_mode == GameMode[1].opponent) {
                    setTimeout(() => {
                        changePlayer(false);
                        KI_Action();
                    }, 1000);

                } else {
                    // add access to set
                    setTimeout(() => {
                        running = true;
                        changePlayer(false);
                    }, 1600);
                };
            }, 600);
        }, 1500);

    } else if (ava_cells.length <= 0) {
        Call_UltimateWin(WinCombination);
        return;

    } else {
        running = false;
        if (currentPlayer == PlayerData[1].PlayerForm && curr_mode == GameMode[1].opponent) {
            changePlayer(false);
            setTimeout(() => {
                running = true;
                KI_Action();
            }, 1000);

        } else {
            setTimeout(() => {
                // add access to set
                running = true;
                changePlayer(false);
            }, 100);
        };
    };
};

// choose sub winner
function chooseSubWinner(Player1_won, Player2_won, WinCombination) {
    WinCombination.forEach(Ele => {
        Ele.classList.add('about-to-die-cell');
    });

    setTimeout(() => {
        if (Player1_won == true) {

            score_Player1_numb++;
            scorePlayer1.textContent = score_Player1_numb;

            if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'admin') {
                statusText.textContent = `You just gained a point!`;

            } else if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'user') {
                statusText.textContent = `${PlayerData[1].PlayerName} just gained a point!`;
            };

            Player1_won = false;

        } else if (Player2_won == true) {

            score_Player2_numb++;
            scorePlayer2.textContent = score_Player2_numb;
            statusText.textContent = `${PlayerData[2].PlayerName} just gained a point!`;

            if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'user') {
                statusText.textContent = `You just gained a point!`;

            } else if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'admin') {
                statusText.textContent = `${PlayerData[2].PlayerName} just gained a point!`;
            };

            Player2_won = false;
        };
    }, 2000);
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
    // Event
    if (curr_mode == GameMode[2].opponent) { // if in online mode
        // Send trigger emit to server so the server sends the "Reload_GlobalGame" emit to all clients
        socket.emit('Reload_OnlineGame', personal_GameData.currGameID, xCell_Amount);

    } else { // if other mode
        clearInterval(firstClock);
        clearInterval(secondClock);
        stopStatusTextInterval = true;
        cellGrid.classList.remove('cellGrid_opacity');
        changePlayer(true);
        setTimeout(() => {
            NxN_field.forEach(field => {
                if (field.getAttribute('title') == curr_field) {
                    initializeGame(field);
                };
            });

            // bug fix
            restartTimeout();
        }, 50);
    };
};

// so the user can't spam the reload button
function restartTimeout() {
    restartBtn.style.color = '#56565659';
    restartBtn.removeEventListener('click', restartGame);

    setTimeout(() => {
        restartBtn.style.color = 'var(--font-color)';
        restartBtn.addEventListener('click', restartGame);
    }, 2000);
};

// Online Game
// reload game for all clients
socket.on('Reload_GlobalGame', (Goptions) => {
    // update options
    options = Goptions
    OnlineGameData[2] = Goptions;

    clearInterval(firstClock);
    clearInterval(secondClock);
    stopStatusTextInterval = true;
    cellGrid.classList.remove('cellGrid_opacity');
    changePlayer(true);
    setTimeout(() => {
        NxN_field.forEach(field => {
            if (field.getAttribute('title') == curr_field) {
                initializeGame(field, 'OnlineMode', OnlineGameData);
            };
        });

        if (personal_GameData.role == 'admin') {
            // bug fix
            restartTimeout();
        };
    }, 50);
});

// Block used cells after a win
function single_CellBlock(cell) {
    cell.classList = "cell death-cell";
    cell.style.animation = "blackenCell 2s forwards"; // Animation aktivieren
    cell.removeEventListener('click', cellCicked);
    setTimeout(() => {
        cell.textContent = null;
    }, 2000);

    // Bug Fix
    if (curr_mode == GameMode[2].opponent) {
        socket.emit('resetOptions', personal_GameData.currGameID, xCell_Amount, message => {
            options = message;
        });

    } else {
        CreateOptions(); // local options
    };
};

// call Ultimate Game Win Function
function Call_UltimateWin(WinCombination) {
    chooseWinnerWindowBtn.removeEventListener('click', openChooseWinnerWindow);

    if (WinCombination == undefined) {
        setTimeout(() => {
            running = false;
            if (score_Player1_numb > score_Player2_numb) { // Player 1 has won
                UltimateGameWin(true, false);
            } else if (score_Player1_numb < score_Player2_numb) { // Player 2 has won
                UltimateGameWin(false, true);
            } else if (score_Player1_numb == score_Player2_numb) { // Tie
                UltimateGameWin(true, true);
            };
        }, 600);
    } else {
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
};

// Ultimate Game Win
function UltimateGameWin(player1_won, player2_won, WinCombination) {
    // Online or offline mode
    if (curr_mode == GameMode[2].opponent) {
        // send message to server
        socket.emit('Call_UltimateWin', personal_GameData.currGameID, [player1_won, player2_won, WinCombination]);

    } else {

        // so the user can't leave during the win animation
        leaveGame_btn.removeEventListener('click', UserleavesGame);
        restartBtn.removeEventListener('click', restartGame);
        leaveGame_btn.style.color = '#56565659';
        restartBtn.style.color = '#56565659';
        setTimeout(() => {
            leaveGame_btn.addEventListener('click', UserleavesGame);
            restartBtn.addEventListener('click', restartGame);
            leaveGame_btn.style.color = 'var(--font-color)';
            restartBtn.style.color = 'var(--font-color)';
        }, 9000);

        // basic stuff
        stopStatusTextInterval = false;
        cells.forEach(cell => {
            single_CellBlock(cell);
        });

        clearInterval(firstClock);
        clearInterval(secondClock);
        clearInterval(gameCounter);

        score_Player1_numb = 0;
        score_Player2_numb = 0;

        setTimeout(() => {
            cellGrid.classList.add('Invisible');
            statusText.classList.add('Invisible');
            GameFieldHeaderUnderBody.style.display = 'none';

            // restart Game counter
            let i = 5;
            var counter = setInterval(() => {
                if (!stopStatusTextInterval) {
                    statusText.textContent = `New game in ${i}`;
                    statusText.classList.remove('Invisible');
                    i--;
                    if (i <= -1) {
                        clearInterval(counter);
                        restartGame();
                    };
                } else {
                    GameFieldHeaderUnderBody.style.display = 'flex';
                    clearInterval(counter);
                };
            }, 1000);
        }, 2000);

        setTimeout(() => {
            cellGrid.style.display = 'none';
            UltimateWinTextArea.style.display = 'flex';
            if (player1_won && !player2_won) { // player 1 won (user)

                // Display win text in the proper way
                UltimateWinText.textContent = `${PlayerData[1].PlayerName} won it! 🏆`;

                if (curr_mode == GameMode[2].opponent) { // online friend 
                    setNew_SkillPoints(10);
                };
                if (curr_mode == GameMode[1].opponent) { // KI 
                    setNew_SkillPoints(1);
                };

            } else if (player2_won && !player1_won) { // player 2 won (admin)

                // Display win text in the proper way
                UltimateWinText.textContent = `${PlayerData[2].PlayerName} won it! 🏆`;

                if (curr_mode == GameMode[2].opponent) { // online friend
                    setNew_SkillPoints(10);
                };
                if (curr_mode == GameMode[1].opponent) { // KI 
                    setNew_SkillPoints(1);
                };

            } else if (player1_won && player2_won) {
                UltimateWinText.textContent = `GG Well played!`;
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
    leaveGame_btn.style.color = '#56565659';
    restartBtn.style.color = '#56565659';
    setTimeout(() => {
        leaveGame_btn.addEventListener('click', UserleavesGame);
        restartBtn.addEventListener('click', restartGame);
        leaveGame_btn.style.color = 'var(--font-color)';
        restartBtn.style.color = 'var(--font-color)';
    }, 9000);

    clearInterval(firstClock);
    clearInterval(secondClock);
    clearInterval(gameCounter);

    score_Player1_numb = 0;
    score_Player2_numb = 0;

    setTimeout(() => {
        cellGrid.classList.add('Invisible');
        statusText.classList.add('Invisible');
        GameFieldHeaderUnderBody.style.display = 'none';

        // restart Game counter
        let i = 5;
        var counter = setInterval(() => {
            if (!stopStatusTextInterval) {
                statusText.textContent = `New game in ${i}`;
                statusText.classList.remove('Invisible');
                i--;
                if (i <= -1) {
                    clearInterval(counter);
                    restartGame();
                };
            } else {
                GameFieldHeaderUnderBody.style.display = 'flex';
                clearInterval(counter);
            };
        }, 1000);
    }, 2000);

    setTimeout(() => {
        cellGrid.style.display = 'none';
        UltimateWinTextArea.style.display = 'flex';
        if (player1_won && !player2_won) { // player 1 won (user)

            // Display win text in the proper way
            if (personal_GameData.role == 'admin') {
                UltimateWinText.textContent = `You won it! 🏆`;

            } else {
                UltimateWinText.textContent = `${PlayerData[1].PlayerName} won it! 🏆`;
            };

            if (curr_mode == GameMode[2].opponent) { // online friend 
                // only the user which is the winner in this case, earns skill points
                if (personal_GameData.role == 'admin') {
                    setNew_SkillPoints(10);
                };
            };
            if (curr_mode == GameMode[1].opponent) { // KI 
                setNew_SkillPoints(1);
            };

        } else if (player2_won && !player1_won) { // player 2 won (admin)
            // Display win text in the proper way
            if (personal_GameData.role == 'user') {
                UltimateWinText.textContent = `You won it! 🏆`;

            } else {
                UltimateWinText.textContent = `${PlayerData[2].PlayerName} won it! 🏆`;
            };

            if (curr_mode == GameMode[2].opponent) { // online friend
                // only the user which is the winner in this case, earns skill points
                if (personal_GameData.role == 'user') {
                    setNew_SkillPoints(10);
                };
            };
            if (curr_mode == GameMode[1].opponent) { // KI 
                setNew_SkillPoints(1);
            };

        } else if (player1_won && player2_won) {
            UltimateWinText.textContent = `GG Well played!`;
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