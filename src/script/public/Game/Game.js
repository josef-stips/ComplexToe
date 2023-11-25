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
    3: { // blocker, not a normal player
        'PlayerName': '',
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
    // 'X': -10,
    // 'O': 10,
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
let MaxAmountOfMovesCount = Infinity;

// default
UserSetPointsToWinGameInput.value = 10;

// in online mode there is the give up button and in the offline mode the choose winner button
let globalChooseWinnerBtn = null;

// player 3, the blocker can set
let player3_can_set = false;

// allowed patterns special for the ki mode
let allPatt_KIMode_Copy = [];

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
    // console.log(required_amount_to_win);
    !isNaN(required_amount_to_win) ? points_to_win = parseInt(required_amount_to_win) : points_to_win = points_to_win; // if parameter is a number

    // set up x and y coordinate
    xCell_Amount = Fields[fieldIndex].xyCellAmount;
    yCell_Amount = Fields[fieldIndex].xyCellAmount;

    // reset score
    score_Player1_numb = 0;
    score_Player2_numb = 0;
    rounds_played = 0;

    // set allowed patterns to global allowed patterns variable
    // console.log(Allowed_Patterns)
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

    // for KI Mode
    ki_board = 0b0;
    player_board = 0b0;
    blockages = 0b0;

    InnerFieldData_Indexes = {};
    InnerFieldData_Options = [];

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
    player3_can_set = false;

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
        // GameData.InnerGameMode = AdvantureLevel_InnerGameMode;
        GameData.InnerGameMode = InnerGameModes[1];

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
        document.querySelector('#GameArea-FieldCircle').style.margin = "0 var(--BossMode-fieldcircleMargin) 0 0";
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

        } else if (Fields[fieldIndex].size == "40x40") {
            eye_40.style.display = 'flex';
            sun_40.style.display = 'none';
            init_eye();
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

    // in online mode: display give up button, in offline mode: display choose winner button
    curr_mode == GameMode[2].opponent ? globalChooseWinnerBtn = GiveUp_btn : globalChooseWinnerBtn = chooseWinnerWindowBtn;

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

    // choose winner button
    chooseWinnerWindowBtn.addEventListener('click', openChooseWinnerWindow);
    // give up button
    giveUp_Yes_btn.addEventListener('click', function() { UserGivesUp(personal_GameData.role) }); // give up online game button close pop up btn on Yes request: User actually gives up

    // initialize display of the choose winner buttons, they will be modified later
    chooseWinnerWindowBtn.style.display = "none";
    GiveUp_btn.style.display = "none";

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
        globalChooseWinnerBtn.style.display = 'block';
        restartBtn.style.color = 'var(font-color)';

    } else { // Is in online mode
        // Make sure that the user is not allowed to reload the game

        // The global game timer is by the admin
        if (personal_GameData.role == 'admin') {
            // html stuff
            restartBtn.style.display = 'block';
            globalChooseWinnerBtn.style.display = 'block';
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
            GiveUp_btn.style.color = 'var(--font-color)';
            GiveUp_btn.style.display = 'block';

        } else if (personal_GameData.role == 'admin') {
            restartBtn.style.color = 'var(--font-color)';
            restartBtn.addEventListener('click', restartGame);
            GiveUp_btn.style.color = 'var(--font-color)';
            GiveUp_btn.style.display = 'block';

        } else if (personal_GameData.role == 'blocker') {
            restartBtn.style.color = '#56565659';
            restartBtn.removeEventListener('click', restartGame);
            giveUp_Yes_btn.removeEventListener('click', function() { UserGivesUp(personal_GameData.role) });
            GiveUp_btn.style.display = 'none';
        };

        OnlineChat_btn.style.display = "block";
    };

    if (inAdvantureMode) {
        restartBtn.style.display = 'none';
        globalChooseWinnerBtn.style.display = 'none';
        MaxAmountOfMovesGameDisplay.style.display = 'block';
        MaxAmountOfMovesGameDisplay.textContent = `moves left: ${maxAmoOfMoves}`;
    } else {
        restartBtn.style.display = 'block';
        globalChooseWinnerBtn.style.display = 'block';
        MaxAmountOfMovesGameDisplay.style.display = 'none';
    };

    (curr_mode == GameMode[2].opponent) ? GameFieldHeaderUnderBody.style.display = "none": GameFieldHeaderUnderBody.style.display = "flex";

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

        console.log(OnlineGameDataArray[10], OnlineGameDataArray[11]);
        // set color of player icon
        namePlayer1.style.color = OnlineGameDataArray[10];
        namePlayer2.style.color = OnlineGameDataArray[11];

        // blocker name if exists
        PlayerData[3].PlayerName = OnlineGameDataArray[12];

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
        namePlayer2.style.color = "gold";
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
        if (curr_mode != GameMode[2].opponent) Activate_PlayerClock(true, false); // first param: first player; second param: second player

    } else {
        GameFieldHeaderUnderBody.style.display = 'none';
    };

    // set up statusText
    if (curr_mode == GameMode[2].opponent) { // in online mode
        if (personal_GameData.role == "admin") statusText.textContent = `It is your turn ${currentName}`;
        if (personal_GameData.role == "user") statusText.textContent = `${currentName}'s turn`;
        if (personal_GameData.role == "blocker") statusText.textContent = `${currentName}'s turn`;

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
let lastCellIndex_Clicked = 0;
async function cellCicked() {
    if (this.classList == "cell" && MaxAmountOfMovesCount > 0 && running == true) { // cell is alive and useable
        const cellIndex = this.getAttribute("cell-index");
        // console.log(this.classList, options[cellIndex])

        // check if cell is already drawn or the game is running
        if (options[cellIndex] != "" || !running) {
            return;
        };
        // console.log(options[cellIndex])

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
                player1_can_set = false;
                await socket.emit('PlayerClicked', [personal_GameData.currGameID, personal_GameData.role, cellIndex, currentPlayer, player1_can_set, localStorage.getItem('userInfoColor'), localStorage.getItem('userInfoClass')]);
            }; // the second player tries to click, but he must wait for his opponent;

            // Check if the second player (user) can set and the player that clicked it the user
            // if not, nothing must happen
            if (!player1_can_set && personal_GameData.role == 'user') {
                player1_can_set = true;
                await socket.emit('PlayerClicked', [personal_GameData.currGameID, personal_GameData.role, cellIndex, currentPlayer, player1_can_set, localStorage.getItem('userInfoColor'), localStorage.getItem('userInfoClass')]);
            }; // the first player tries to click, but he must wait for his opponent

            // After a player finishes and inner game mode is blocker combat and the blocker clicked a cell
            if (player3_can_set && personal_GameData.role == 'blocker') {
                player3_can_set = false;
                socket.emit('BlockerCombat', personal_GameData.currGameID, cellIndex);
            };

        } else { // some other mode - offline mode obviously

            // so the user can't leave the game directly after he setted 
            leaveGame_btn.removeEventListener('click', UserleavesGame);
            leaveGame_btn.style.color = '#56565659';
            setTimeout(() => {
                leaveGame_btn.addEventListener('click', UserleavesGame);
                leaveGame_btn.style.color = 'var(--font-color)';
            }, 2000);

            updateCell(cellIndex);
            lastCellIndex_Clicked = cellIndex;

            if (curr_mode != GameMode[1].opponent) { // If not in KI Mode

                SecondPlayerTime.style.color = 'var(--font-color)';
                FirstPlayerTime.style.color = 'var(--font-color)';

                if (GameData.InnerGameMode == InnerGameModes[2]) { // blocker combat inner game mode
                    // Active Blocker blocks a cell
                    Activate_InteractiveBlocker();

                    // important stuff
                    killPlayerClocks();

                    // check winner after the active blocker did his stuff
                    setTimeout(() => {
                        checkWinner();
                    }, 1000);

                } else if (GameData.InnerGameMode == InnerGameModes[1] || GameData.InnerGameMode == InnerGameModes[3]) { // If other inner game mode => just check winner
                    checkWinner();
                };

            } else if (curr_mode == GameMode[1].opponent && !inAdvantureMode) { // if in KI Mode but not in Advanture mode => just check the winner
                statusText.textContent = "Waiting for Bot...";
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
        player1_can_set = Goptions[1];

        if (personal_GameData.role == "admin") {
            // important stuff
            killPlayerClocks("stop");
        };

        // now the third player can set his block
        player3_can_set = true;
        thirdPlayerSets();

    } else if (GameData.InnerGameMode == InnerGameModes[1] || GameData.InnerGameMode == InnerGameModes[3]) { // If other inner game mode => just check winner
        player1_can_set = Goptions[1];

        // check the winner
        checkWinner(false, "fromClick");
    };
});

// normal update cell function when player in offline mode clicks cell
function updateCell(index) {
    options[index] = currentPlayer;

    // player_board ^= (1 << index);
    // console.log(index);

    let cells = [...cellGrid.children];

    // user uses an advanced skin
    if (PlayerData[1].AdvancedSkin != "cell empty" && currentPlayer == PlayerData[1].PlayerForm) {
        cells[index].className = `${PlayerData[1].AdvancedSkin}`;

    } else { // he uses normal skin
        cells[index].textContent = currentPlayer;

        if (currentPlayer == PlayerData[1].PlayerForm) cells[index].style.color = localStorage.getItem('userInfoColor');
    };

    MaxAmountOfMovesCount >= 1 && MaxAmountOfMovesCount != Infinity ? MaxAmountOfMovesCount-- : MaxAmountOfMovesCount = MaxAmountOfMovesCount;
    MaxAmountOfMovesGameDisplay.textContent = `moves left: ${MaxAmountOfMovesCount}`;
};

// the third player (blocker) can set
function thirdPlayerSets() {
    console.log(personal_GameData.role, running, player1_can_set, player3_can_set)
    if (personal_GameData.role == "blocker") {
        // add blocker access to set
        cells.forEach(cell => {
            cell.addEventListener('click', cellCicked);
            console.log("lol")
        });
        statusText.textContent = "You can block now!";
        running = true;

    } else { // for the other player in the lobby
        // remove other player access to set
        cells.forEach(cell => {
            cell.removeEventListener('click', cellCicked);
        });
        statusText.textContent = `Wait for ${PlayerData[3].PlayerName} to block.`;
    };
};

// When the blocker combat inner game mode is activated and a player sets his form
// The global blocker cell click event sends the updated cell grid with the new block to all players
socket.on('blockerCombat_action', Goptions => {
    let Grid = [...cellGrid.children];

    // update old array with modified version
    options = Goptions;

    for (let i = 0; i < options.length; i++) {
        let el = options[i];

        // update Grid
        if (Grid[i].classList.length <= 1 && el == '%%') {
            Grid[i].textContent = null;
            Grid[i].classList = "cell death-cell";
            Grid[i].style.backgroundColor = "var(--font-color)";
            Grid[i].removeEventListener('click', cellCicked);

            // This just deletes all '%%' from the options array that were used to block the game cells by their index
            // no callback or something on this one
            socket.emit('BlockerCombatFinalProcess', personal_GameData.currGameID, i);
            break;
        };
    };

    // At the end: Continue the game 
    checkWinner(false, "fromClick");
});

async function changePlayer(from_restart, fromClick) {
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
            await killPlayerClocks();
            if (currentPlayer == PlayerData[1].PlayerForm) {
                if (curr_mode != GameMode[2].opponent) {
                    Activate_PlayerClock(true, false);
                } else {
                    // start player clock for a player
                    await killPlayerClocks("Reset&&Continue", "player1_timer_event", "player1_timer", 1) // the params are only for online mode
                };

            } else if (currentPlayer == PlayerData[2].PlayerForm) {
                if (curr_mode != GameMode[2].opponent) {
                    Activate_PlayerClock(false, true)
                } else {
                    // start player clock for a player
                    await killPlayerClocks("Reset&&Continue", "player2_timer_event", "player2_timer", 2) // the params are only for online mode
                };
            };
            // in online mode the player things get handled in the server wih the "playerClocks" function above
            // This function with the given data send an emit to server which handles the request

            // if NOT in online mode
            if (curr_mode != GameMode[2].opponent) {
                // "Your turn" for player who's turn
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
        killPlayerClocks();
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

// a user gives up in online game mode
// only the admin and the user can give up. Since the blocker is not a player he also can't give up
function UserGivesUp(user_role) {
    DarkLayer.style.display = "none";
    GiveUpPopUp.style.display = "none";

    console.log(user_role)
    console.log(score_Player1_numb, score_Player2_numb)
    console.log(score_Player1_numb > score_Player2_numb)
    console.log(score_Player1_numb == score_Player2_numb)
    console.log(score_Player1_numb < score_Player2_numb)

    switch (user_role) {
        case 'admin':
            // if admin had more points than user but gives up
            if (score_Player1_numb > score_Player2_numb) {
                // make the score the same
                score_Player1_numb = Infinity;
                score_Player2_numb = Infinity;
                Call_UltimateWin();
                return;

            } else if (score_Player1_numb == score_Player2_numb) {
                // score is already the same but make it the same 
                score_Player1_numb = Infinity;
                score_Player2_numb = Infinity;
                Call_UltimateWin();
                return;

            } else if (score_Player1_numb < score_Player2_numb) {
                // if the admin has less points than user, the user wins obviously
                score_Player1_numb = -Infinity;
                score_Player2_numb = Infinity;
                Call_UltimateWin();
                return;
            };
            break;

        case 'user':
            // if admin had more points than user but gives up
            if (score_Player2_numb > score_Player1_numb) {
                // make the score the same
                score_Player1_numb = Infinity;
                score_Player2_numb = Infinity;
                Call_UltimateWin();
                return;

            } else if (score_Player2_numb == score_Player1_numb) {
                // score is already the same but make it the same 
                score_Player1_numb = Infinity;
                score_Player2_numb = Infinity;
                Call_UltimateWin();
                return;

            } else if (score_Player2_numb < score_Player1_numb) {
                // if the user has less points than admin, the admin wins obviously
                score_Player1_numb = Infinity;
                score_Player2_numb = -Infinity;
                Call_UltimateWin();
                return;
            };
            break;
    };
};

// Online Game
// reload game for all clients
socket.on('Reload_GlobalGame', (Goptions) => {
    // update options
    options = Goptions
    OnlineGameData[2] = Goptions;

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
    cell.style.color = "white";
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

// additional change player function for online game mode
// This is from the server to all clients
socket.on('changePlayerTurnDisplay', (currPlayer) => {
    // Change for all clients
    if (currPlayer == PlayerData[1].PlayerForm && personal_GameData.role == 'admin') { // INFO: admin is always player one
        statusText.textContent = `It is your turn ${PlayerData[1].PlayerName}`;

    } else if (currPlayer == PlayerData[1].PlayerForm && personal_GameData.role == 'user') {
        statusText.textContent = `${PlayerData[1].PlayerName}'s turn`;

    } else if (currPlayer == PlayerData[1].PlayerForm && personal_GameData.role == 'blocker') {
        statusText.textContent = `${PlayerData[1].PlayerName}'s turn`;
    };

    if (currPlayer == PlayerData[2].PlayerForm && personal_GameData.role == 'user') { // INFO: user is always player two
        statusText.textContent = `It is your turn ${PlayerData[2].PlayerName}`;

    } else if (currPlayer == PlayerData[2].PlayerForm && personal_GameData.role == 'admin') {
        statusText.textContent = `${PlayerData[2].PlayerName}'s turn`;

    } else if (currPlayer == PlayerData[2].PlayerForm && personal_GameData.role == 'blocker') {
        statusText.textContent = `${PlayerData[2].PlayerName}'s turn`;
    };
});