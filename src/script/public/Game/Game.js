const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restart-btn');

let running = false;
let stopStatusTextInterval = false;
let rounds_played = 0;

let curr_field = "";
let points_to_win = 0; // required amount of points to win

// Field x and y 
let yCell_Amount; // numb
let xCell_Amount; // numb

// Player 1 is always X and can start first
let PlayerData = {
    1: {
        'PlayerName': '',
        'PlayerForm': '',
        'AdvancedSkin': ''
    },
    2: {
        'PlayerName': '',
        'PlayerForm': '',
        'AdvancedSkin': ''
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

// The user can decide which patterns are allowed in the game
// !!! In advanced mode the patterns are already specified and cannot be modified by the user
let allowedPatterns = [];

// the user can only set a maximum amount of moves. If he didn't win the game but already hasn't any moves left. He lost
let MaxAmountOfMovesCount = 0;

// Initialize Game
// Allowed_Patterns = array with names of the allowed patterns
function initializeGame(field, onlineGame, OnlineGameDataArray, Allowed_Patterns, mapLevelName, required_amount_to_win, AdvantureLevel_InnerGameMode, maxAmoOfMoves) {
    // Define field data for game
    // If online game set online game data, if not set normal data
    let fieldIndex = Array.isArray(OnlineGameDataArray) ? OnlineGameDataArray[0] : field.getAttribute('index');
    let fieldTitle = Array.isArray(OnlineGameDataArray) ? OnlineGameDataArray[1] : field.getAttribute('title');

    if (inAdvantureMode) {
        // set up background data
        curr_field = mapLevelName;
        fieldTitle = mapLevelName;

    } else {
        curr_field = Fields[fieldIndex].name;
    };

    // make max amount of moves global availible if it exists
    maxAmoOfMoves != undefined ? MaxAmountOfMovesCount = maxAmoOfMoves : MaxAmountOfMovesCount = MaxAmountOfMovesCount;

    // The reqired amount to win a game (optional in normal games and normal in advanture mode)
    points_to_win = required_amount_to_win;

    // set up x and y coordinate
    xCell_Amount = Fields[fieldIndex].xyCellAmount;
    yCell_Amount = Fields[fieldIndex].xyCellAmount;

    // reset score
    score_Player1_numb = 0;
    score_Player2_numb = 0;
    rounds_played = 0;

    // set allowed patterns to global allowed patterns variable
    allowedPatterns = Allowed_Patterns;

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
    CreateWinConditions(xCell_Amount, Allowed_Patterns);

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

    if (curr_mode != GameMode[1].opponent && !inAdvantureMode) { // If not in KI Mode and not in advanture mode
        // Inner game Mode
        if (GameData.InnerGameMode == InnerGameModes[1]) { // Boneyard
            Start_Blocker(onlineGame);

        } else if (GameData.InnerGameMode == InnerGameModes[2]) { // Blocker Combat
            // Blocker blocks one single block after every set
            // Activate_InteractiveBlocker(); // Don't start at the beginning

        } else if (GameData.InnerGameMode == InnerGameModes[3]) { // Free Fight
            // no blocker
        };

    } else if (curr_mode == GameMode[1].opponent && inAdvantureMode) { // If in advanture mode
        // in advanture mode every level has a presetted inner game mode the user can't change
        GameData.InnerGameMode = AdvantureLevel_InnerGameMode;

        // If the map level inner game mode is Boneyard
        if (GameData.InnerGameMode == InnerGameModes[1]) {
            Start_Blocker(onlineGame);
        };
    };

    Find_MaxDepth();

    if (onlineGame == 'OnlineMode') {
        initializeDocument(field, fieldIndex, fieldTitle, true, OnlineGameDataArray, maxAmoOfMoves);
    } else {
        initializeDocument(field, fieldIndex, fieldTitle, false, OnlineGameDataArray, maxAmoOfMoves);
    };

    // if in 40x40 field, generate its properties: eye
    // or level 10: eye boss, or level 9: sun boss
    if (Fields[fieldIndex].size == "40x40" || current_selected_level == 10 && inAdvantureMode || current_selected_level == 9 && inAdvantureMode) {
        document.querySelector('#GameArea-FieldCircle').style.margin = "0 60px 0 0";
        lobbyFooterText.style.display = 'none';

        // in advanture map on the last level with the eye boss
        if (inAdvantureMode && current_selected_level == 10) {
            eye_40.style.display = 'flex';
            sun_40.style.display = 'none';
            init_eye();

        } else if (inAdvantureMode && current_selected_level == 9) {
            sun_40.style.display = 'flex';
            eye_40.style.display = 'none';
            init_sun();
        };

    } else {
        lobbyFooterText.style.display = 'flex';
        sun_40.style.display = 'none';
        eye_40.style.display = 'none';
        document.querySelector('#GameArea-FieldCircle').style.margin = "0 0 0 0";
    };
};

function initializeDocument(field, fieldIndex, fieldTitle, onlineMode, OnlineGameDataArray, maxAmoOfMoves) {
    GameField.style.display = 'flex';
    gameModeFields_Div.style.display = 'none';
    CheckmateWarnText.style.display = 'none';
    OnlineChat_btn.style.display = "none";
    // lobbyHeader.style.display = 'none';
    console.log(maxAmoOfMoves)

    // Init game title,game icon and game info
    GameTitle.textContent = fieldTitle;
    Game_Upper_Field_Icon.classList = `${Fields[fieldIndex].icon} field-card-header-icon`;
    GameField_FieldSizeDisplay.textContent = `${Fields[fieldIndex].size}`;
    GameField_BlockAmountDisplay.textContent = `${Fields[fieldIndex].blocks}`;

    inAdvantureMode ? GameField_AveragePlayTimeDisplay.textContent = `ave. playtime is unknown` : GameField_AveragePlayTimeDisplay.textContent = `ave. playtime ${Fields[fieldIndex].averagePlayTime}`;

    // cell grid things
    cellGrid.style.display = 'grid';
    cellGrid.classList.remove('Invisible');
    cellGrid.classList.remove('cellGrid-alert');
    cellGrid.classList.add('cellGrid_opacity');

    // if in mode x
    if (!onlineMode) {
        // How long the game is - Game Counter
        let GameSeconds = 0;
        GameField_TimeMonitor.textContent = '0 s.';
        clearInterval(gameCounter)
        gameCounter = setInterval(() => {
            GameSeconds++;
            GameField_TimeMonitor.textContent = GameSeconds + ' s.';
        }, 1000);

        restartBtn.style.display = 'block';
        chooseWinnerWindowBtn.style.display = 'block';
        restartBtn.style.color = 'var(font-color)';

    } else { // Is in online mode
        // Make sure that the user is not allowed to reload the game

        // The global game timer is by the admin
        if (personal_GameData.role == 'admin') {
            // html stuff
            restartBtn.style.display = 'block';
            chooseWinnerWindowBtn.style.display = 'block';
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

        OnlineChat_btn.style.display = "block";
    };

    if (inAdvantureMode) {
        restartBtn.style.display = 'none';
        chooseWinnerWindowBtn.style.display = 'none';
        MaxAmountOfMovesGameDisplay.style.display = 'block';
        MaxAmountOfMovesGameDisplay.textContent = `moves left: ${maxAmoOfMoves}`;
    } else {
        restartBtn.style.display = 'block';
        chooseWinnerWindowBtn.style.display = 'block';
        MaxAmountOfMovesGameDisplay.style.display = 'none';
    };

    // choose winner button
    chooseWinnerWindowBtn.addEventListener('click', openChooseWinnerWindow);

    // Init Player 
    initializePlayers(OnlineGameDataArray);
};

function initializePlayers(OnlineGameDataArray) {
    scorePlayer1.textContent = score_Player1_numb;
    scorePlayer2.textContent = score_Player2_numb;

    // Player Name
    PlayerData[1].PlayerName = curr_name1;
    PlayerData[2].PlayerName = curr_name2;
    // Player Form
    PlayerData[1].PlayerForm = curr_form1.toUpperCase();
    PlayerData[2].PlayerForm = curr_form2.toUpperCase();

    console.log(OnlineGameDataArray);

    // for online mode, for chat feature
    personalname = personal_GameData.role == "admin" ? personalname = PlayerData[1].PlayerName : personalname = PlayerData[2].PlayerName;

    // Advanced skin in Player data
    if (OnlineGameDataArray != undefined) { // in online mode
        PlayerData[1].AdvancedSkin = 'cell ' + OnlineGameDataArray[8];
        PlayerData[2].AdvancedSkin = 'cell ' + OnlineGameDataArray[9];

        // if player 1 uses an advanced skin
        if (OnlineGameDataArray[8] != "empty") {
            let span = document.createElement('span');
            span.className = OnlineGameDataArray[8];
            span.classList.add("sideScore_TemporarySpan1");

            namePlayer1.textContent = `${curr_name1} `;
            namePlayer1.appendChild(span);

        } else { // he uses normal skin with or with no color
            namePlayer1.textContent = curr_name1 + ` (${PlayerData[1].PlayerForm})`;

            // if previous span existed, remove it as a bug fix
            if (document.querySelector('.sideScore_TemporarySpan1')) {
                document.querySelector('.sideScore_TemporarySpan1').remove();
            };
        };

        // if player 2 uses an advanced skin
        if (OnlineGameDataArray[9] != "empty") {
            let span = document.createElement('span');
            span.className = OnlineGameDataArray[9];
            span.classList.add("sideScore_TemporarySpan2");

            namePlayer2.textContent = `${curr_name2} `;
            namePlayer2.appendChild(span);

        } else { // he uses normal skin with or with no color
            namePlayer2.textContent = curr_name2 + ` (${PlayerData[2].PlayerForm})`;

            // if previous span existed, remove it as a bug fix
            if (document.querySelector('.sideScore_TemporarySpan2')) {
                document.querySelector('.sideScore_TemporarySpan2').remove();
            };
        };

        // set color of player icon
        namePlayer1.style.color = OnlineGameDataArray[10];
        namePlayer2.style.color = OnlineGameDataArray[11];

    } else { // offline mode
        PlayerData[1].AdvancedSkin = 'cell ' + localStorage.getItem('userInfoClass');
        PlayerData[2].AdvancedSkin = 'cell empty'; // The second player can't choose between skin colors and advanced skins. He always uses normal white skin with normal letter

        // if player 1 uses an advanced skin
        if (localStorage.getItem('userInfoClass') != "empty") {
            let span = document.createElement('span');
            span.className = localStorage.getItem('userInfoClass');
            span.classList.add("sideScore_TemporarySpan1");

            namePlayer1.textContent = `${curr_name1} `;
            namePlayer1.appendChild(span);

        } else { // he uses normal skin with or with no color
            namePlayer1.textContent = curr_name1 + ` (${PlayerData[1].PlayerForm})`;

            // if previous span existed, remove it as a bug fix
            if (document.querySelector('.sideScore_TemporarySpan1')) {
                document.querySelector('.sideScore_TemporarySpan1').remove();
            };
        };

        // player 2 uses a normal skin in offline mode (player 2 is wether a KI or an offline friend on local computer)
        namePlayer2.textContent = curr_name2 + ` (${PlayerData[2].PlayerForm})`;

        // set color of player icon
        namePlayer1.style.color = localStorage.getItem('userInfoColor');
        namePlayer2.style.color = "var(--font-color)";
    };

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

        if (curr_mode == GameMode[1].opponent) {
            statusText.textContent = `Your turn`;
        };
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
    if (this.classList == "cell" && MaxAmountOfMovesCount > 0) { // cell is alive and useable
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
                socket.emit('PlayerClicked', [personal_GameData.currGameID, personal_GameData.role, cellIndex, currentPlayer, player1_can_set, localStorage.getItem('userInfoColor'), localStorage.getItem('userInfoClass')]);

            }; // the second player tries to click, but he must wait for his opponent;

            // Check if the second player (user) can set and the player that clicked it the user
            // if not, nothing must happen
            if (!player1_can_set && personal_GameData.role == 'user') {
                socket.emit('PlayerClicked', [personal_GameData.currGameID, personal_GameData.role, cellIndex, currentPlayer, player1_can_set, localStorage.getItem('userInfoColor'), localStorage.getItem('userInfoClass')]);

            }; // the first player tries to click, but he must wait for his opponent

        } else { // some other mode - offline mode obviously

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

                    // check winner after the active blocker did his stuff
                    setTimeout(() => {
                        checkWinner();
                    }, 1000);

                } else if (GameData.InnerGameMode == InnerGameModes[1] || GameData.InnerGameMode == InnerGameModes[3]) { // If other inner game mode => just check winner
                    checkWinner();
                };

            } else if (curr_mode == GameMode[1].opponent && !inAdvantureMode) { // if in KI Mode but not in Advanture mode => just check the winner 
                checkWinner();

            } else if (curr_mode == GameMode[1].opponent && inAdvantureMode) { // if in KI Mode and in Advanture mode 

                if (GameData.InnerGameMode == InnerGameModes[2]) { // blocker combat inner game mode
                    // Active Blocker blocks a cell
                    Activate_InteractiveBlocker();

                    // check winner after the active blocker did his stuff
                    setTimeout(() => {
                        checkWinner();
                    }, 1000);

                } else {
                    checkWinner();
                };
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

        if (element != '' && !cells[i].classList.contains('colored-cell') && Goptions[3] == "empty" && cells[i].classList.length == 1) {
            cells[i].style.color = Goptions[2];
            cells[i].classList.add('colored-cell');

            cells[i].textContent = element;

        } else if (element != '' && !cells[i].classList.contains('colored-cell') && Goptions[3] != "empty" && cells[i].classList.length == 1) {

            cells[i].style.color = "var(--font-color)";
            cells[i].className = `cell ${Goptions[3]}`;
        };
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

    // user uses an advanced skin
    if (PlayerData[1].AdvancedSkin != "cell empty" && currentPlayer == PlayerData[1].PlayerForm) {
        cells[index].className = `${PlayerData[1].AdvancedSkin}`;

    } else { // he uses normal skin
        cells[index].textContent = currentPlayer;

        if (currentPlayer == PlayerData[1].PlayerForm) cells[index].style.color = localStorage.getItem('userInfoColor');
    };

    MaxAmountOfMovesCount >= 1 ? MaxAmountOfMovesCount-- : MaxAmountOfMovesCount = MaxAmountOfMovesCount;
    MaxAmountOfMovesGameDisplay.textContent = `moves left: ${MaxAmountOfMovesCount}`;
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

function changePlayer(from_restart) {
    currentPlayer = (currentPlayer == PlayerData[1].PlayerForm) ? PlayerData[2].PlayerForm : PlayerData[1].PlayerForm;
    currentName = (currentName == PlayerData[1].PlayerName) ? PlayerData[2].PlayerName : PlayerData[1].PlayerName;

    // If in KI Mode and it is Ki's turn now
    if (curr_mode == GameMode[1].opponent) {
        if (currentPlayer == PlayerData[2].PlayerForm) {
            statusText.textContent = `Waiting for ${currentName}...`;
        };

        if (currentPlayer == PlayerData[1].PlayerForm) {
            statusText.textContent = `Your turn`;
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
        if (cell.classList.length <= 1) cell.addEventListener('click', cellCicked);
    });
};

function checkWinner() {
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

                    } else {
                        // other mode
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

    ProcessResult(Player1_won, Player2_won, roundWon, winner, WinCombination, extra_points);
};

function ProcessResult(Player1_won, Player2_won, roundWon, winner, WinCombination, extra_points) {
    // check if there are still availible cells remaining
    let ava_cells = check_RemainingCells();

    if (roundWon) { // someone won the round
        processResult_RoundWon(Player1_won, Player2_won, WinCombination, extra_points);

    } else if (ava_cells.length <= 0) { // there are literally no availible cells on the field to set => process who is the winner now
        Call_UltimateWin(WinCombination);
        return;

    } else if (inAdvantureMode) { // In the advanture mode there are special win conditions
        processResult_AdvantureMode(Player1_won, Player2_won, roundWon, winner, WinCombination);

    } else { // if nothing special happened , no one won and if not in advanture mode => do normal stuff
        processResult_continueGame();
    };
};

// process result of game: if a sub game round is won 
function processResult_RoundWon(Player1_won, Player2_won, WinCombination, extra_points) {
    clearInterval(firstClock);
    clearInterval(secondClock);
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
        rounds_played++;
        if (curr_field == 'Small Price' && rounds_played == 1 || curr_field == 'Thunder Advanture' && rounds_played == 1 || curr_field == 'Quick Death' && rounds_played == 1) {
            Call_UltimateWin(WinCombination);
            return;
        };

        // Change player things. execute this everytime
        setTimeout(() => {
            processResult_continueGame();
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
function processResult_continueGame() {
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
        }, 400);

    } else { // not in advanture mode
        // if in KI Mode and Player just setted his icon. Now it is KI's turn
        if (curr_mode == GameMode[1].opponent) {
            setTimeout(() => {
                // Check who can set next the bot or the player
                if (currentPlayer == PlayerData[1].PlayerForm) {
                    changePlayer(false);
                    KI_Action();

                } else {
                    changePlayer(false);
                    running = true;
                };
            }, 400);

        } else if (curr_mode != GameMode[1].opponent) { // It is not KI Mode
            // add access to set
            setTimeout(() => {
                running = true;
                changePlayer(false);
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

            // other mode
            if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'admin') {
                statusText.textContent = `You just gained a point!`;

            } else if (curr_mode == GameMode[2].opponent && personal_GameData.role == 'user') {
                statusText.textContent = `${PlayerData[1].PlayerName} just gained a point!`;
            };

            Player1_won = false;

        } else if (Player2_won == true) {

            score_Player2_numb = score_Player2_numb + 1 + extra_points;
            scorePlayer2.textContent = score_Player2_numb;
            statusText.textContent = `the unknown just gained a point`;

            // the opponent made a point in advanture mode
            if (inAdvantureMode) {
                if (score_Player2_numb >= points_to_win) {
                    statusText.textContent = `You lost against the evil. Are you willing to you try again?`;
                    Player2_won = false;
                    Call_UltimateWin();
                    return;
                };
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
                    initializeGame(field, undefined, undefined, allowedPatterns);
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
    firstClock = null;
    secondClock = null;
    stopStatusTextInterval = true;
    cellGrid.classList.remove('cellGrid_opacity');
    changePlayer(true);
    setTimeout(() => {
        NxN_field.forEach(field => {
            if (field.getAttribute('title') == curr_field) {
                initializeGame(field, 'OnlineMode', OnlineGameData, allowedPatterns);
            };
        });

        if (personal_GameData.role == 'admin') {
            // bug fix
            restartTimeout();
        };
    }, 50);
});

// Block used cells after a win
function single_CellBlock(cell, fromMap) {
    cell.className = "cell death-cell";
    cell.style.cursor = "default";
    if (fromMap == "fromMap") {
        cell.style.animation = "destroyCell 2s forwards"; // Animation aktivieren

    } else {
        cell.style.animation = "blackenCell 2s forwards"; // Animation aktivieren
    };

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
        CreateOptions("fromMap"); // local options
    };
};

// call Ultimate Game Win Function
function Call_UltimateWin(WinCombination) {
    CheckmateWarnText.style.display = "none" // just small bug fix nothing special
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
    if (curr_mode == GameMode[2].opponent) { // in online mode
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
            single_CellBlock(cell, "fromMap");
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
                };
            }, 1000);
        }, 2000);

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
                if (curr_mode == GameMode[2].opponent) { // online friend 
                    setNew_SkillPoints(10);
                };
                if (curr_mode == GameMode[1].opponent) { // KI 
                    if (inAdvantureMode) {
                        setNew_SkillPoints(20);

                    } else {
                        setNew_SkillPoints(1);
                    };
                };

            } else if (player2_won && !player1_won) { // player 2 won (admin)

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

                    if (curr_mode == GameMode[2].opponent) { // online friend
                        setNew_SkillPoints(10);
                    };
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
        let i = 4;
        var counter = setInterval(() => {
            if (!stopStatusTextInterval) {
                statusText.textContent = `leave game in ${i}`;
                statusText.classList.remove('Invisible');
                i--;
                if (i <= -1) {
                    clearInterval(counter);
                    // leave game after win and return to lobby
                    if (personal_GameData.role == "admin") UserleavesGame();
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
        if (player1_won && !player2_won) { // player 1 won (admin)

            // Display win text in the proper way
            if (personal_GameData.role == 'admin') {
                UltimateWinText.textContent = `You won it `;

                // continue with normal code
                let wins_storage = JSON.parse(localStorage.getItem('onlineMatches-won'));
                wins_storage++;
                localStorage.setItem('onlineMatches-won', wins_storage);

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

        } else if (player2_won && !player1_won) { // player 2 won (user)
            // Display win text in the proper way
            if (personal_GameData.role == 'user') {
                UltimateWinText.textContent = `You won it `;

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

        } else if (player1_won && player2_won) {
            UltimateWinText.textContent = `GG Well played `;
            // additional img svg
            let img = document.createElement('img');
            let br = document.createElement('br');
            img.src = "./assets/game/bleeding-eye.svg";
            img.width = "300";
            img.height = "300";
            UltimateWinText.appendChild(br);
            UltimateWinText.appendChild(img);
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

// additional change player function for online game mode
// This is from the server to all clients
socket.on('changePlayerTurnDisplay', (curr_name) => {
    // Change for all clients
    if (curr_name == PlayerData[1].PlayerName && personal_GameData.role == 'admin') { // INFO: admin is always player one
        statusText.textContent = `It is your turn ${PlayerData[1].PlayerName}`;

    } else if (curr_name == PlayerData[1].PlayerName && personal_GameData.role == 'user') {
        statusText.textContent = `${curr_name}'s turn`;
    };

    if (curr_name == PlayerData[2].PlayerName && personal_GameData.role == 'user') { // INFO: user is always player two
        statusText.textContent = `It is your turn ${PlayerData[2].PlayerName}`;

    } else if (curr_name == PlayerData[2].PlayerName && personal_GameData.role == 'admin') {
        statusText.textContent = `${curr_name}'s turn`;
    };
});