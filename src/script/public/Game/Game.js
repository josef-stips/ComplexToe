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

let player2_lastBarRelation = 0;
let player1_lastBarRelation = 0;

let GameSeconds = 0;

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

let PlayerXP = {
    1: null,
    2: null
};

let OnlinePlayerIDs = {
    1: null,
    2: null,
    3: null
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

// amount of moves the ki and player did
let MovesAmount_PlayerAndKi = 0;

// normal spell: the user can place two times in a row
let SpellsInStore = 0;

// check if player is allowed to set two times in a row
let PlayerIsAllowedToSetTwoTimes = false;

let UserClicksNTimesInARow = 0;

let AllUsersClickedSum = 0;

// only availible in costum user levels
let bgcolor1 = "";
let bgcolor2 = "";

let costumLevelIcon = "";

let creativeLevel_online_costumPatterns;

let costumXFromThirdParty;

let PlayingInCreatedLevel_AsGuest = false;

// player local storage setting 
let showBGColor = true;

// boss class
let current_level_boss = null;

// The whole algorithm switches between different board sizes and win conditions
// to prevent issues initialize an origin board_size 
let board_size;

let allGameData = [];

let killAllDrawnCells = false;
let stillActiveCells = [];

let max_amount_of_moves = null;

let patterns_used = [];

// all moves every player makes in one object
let all_game_moves = [];
let cell_indexes_blocked_by_blocker = [];

let CreativeLevel_from_onlineMode_costumPatterns_globalVar = null;

let fieldIndex;

let curr_music_name;

let review_mode_handler;

let boneyard_array = [];

let watch_mode = false;

let all_patterns_in_game = {
    // "pattern_name": {'structure': [0,1,2,3], 'value': 2},
};

let global_creative_level_data = null;

let globalLevelID = null;

let arena_mode = false;
let tournament_mode = false;

const universal_level_icons = {
    0: "assets/game/wolf-head.svg",
    1: "assets/game/winged-sword.svg",
    2: "assets/game/warlock-eye.svg",
    3: "assets/game/sunken-eye.svg",
    4: "assets/game/ore.svg",
    5: "assets/game/minerals.svg",
    6: "assets/game/crystal-eye.svg",
    7: "assets/game/fangs.svg",
    8: "assets/game/bleeding-eye.svg",
    9: "assets/game/crystal-bars.svg",
    10: "assets/game/battle-axe.svg",
    11: "assets/game/tribal-mask.svg",
    12: "assets/game/shattered-sword.svg",
    13: "assets/game/gluttonous-smile.svg",
    14: "assets/game/book-cover.svg"
};

// Initialize Game
// Allowed_Patterns = array with names of the allowed patterns
function initializeGame(field, onlineGame, OnlineGameDataArray, Allowed_Patterns, mapLevelName, required_amount_to_win, AdvantureLevel_InnerGameMode, maxAmoOfMoves, costumCoords,
    CreativeLevel_from_onlineMode_costumPatterns, p1_XP, p2_XP, review_mode, review_mode_data, creativeLevel_costumBotPatterns) {

    player1_score_bar_wrapper.style.background = `linear-gradient(105deg, #3f51b5 ${0}%, transparent ${5}%)`;
    player2_score_bar_wrapper.style.background = `linear-gradient(-105deg, darkred ${0}%, transparent ${5}%)`;

    sceneMode.default();

    if (review_mode) {
        review_mode_handler = new reviewModeHandler(review_mode_data, 'normal');
        review_mode_handler.init();
        return;
    };

    review_mode = false;

    // to have all info globally
    allGameData = [];
    patterns_used = [];
    cell_indexes_blocked_by_blocker = [];
    GameSeconds = 0;

    all_game_moves = [];

    player2_lastBarRelation = 0;
    player1_lastBarRelation = 0;

    boneyard_array = [];

    CreativeLevel_from_onlineMode_costumPatterns_globalVar = CreativeLevel_from_onlineMode_costumPatterns;

    global_creative_level_data = null;

    OnlinePlayerIDs = {
        1: null,
        2: null,
        3: null
    };

    PlayerXP = {
        1: p1_XP,
        2: p2_XP
    };

    for (const i of arguments) {
        allGameData.push(i);
    };

    max_amount_of_moves = maxAmoOfMoves;

    PatternGridWrapperForCostumPatterns.textContent = null;

    // console.log(allGameData);

    // Define field data for game

    // If online game set online game data, if not set normal data
    fieldIndex = Array.isArray(OnlineGameDataArray) ? OnlineGameDataArray[0] : field.getAttribute('index');
    let fieldTitle = Array.isArray(OnlineGameDataArray) ? OnlineGameDataArray[1] : field.getAttribute('title');

    if (inAdvantureMode) {
        // set up background data
        curr_field = mapLevelName;
        fieldTitle = mapLevelName;

    } else {

        curr_field = CreativeLevel_from_onlineMode_costumPatterns ? fieldTitle : Fields[fieldIndex].name;

        // right creative level name in offline mode
        if (curr_mode != GameMode[2].opponent && NewCreativeLevel) {
            curr_field = NewCreativeLevel.selectedLevel[8];
        };
    };

    current_level_boss && current_level_boss.delete();
    current_level_boss = null;

    // make max amount of moves global availible if it exists
    maxAmoOfMoves != undefined ? MaxAmountOfMovesCount = maxAmoOfMoves : MaxAmountOfMovesCount = Infinity;

    // The reqired amount to win a game (optional in normal games and normal in advanture mode)
    // console.log(required_amount_to_win);
    !isNaN(required_amount_to_win) ? points_to_win = parseInt(required_amount_to_win) : points_to_win = points_to_win; // if parameter is a number

    // console.log(Fields, fieldIndex, costumCoords);

    // set up x and y coordinates
    if (costumCoords) {
        // console.log(costumCoords[0], costumCoords);

        // for costum coords that have a different value e.g: 9x12 , 15x10
        let costumX = costumCoords[0];
        let costumY = costumCoords[1];

        if (costumX != undefined && !isNaN(costumX)) {
            // set user costum level coordinates
            xCell_Amount = costumX;
            yCell_Amount = costumY;

        } else {
            xCell_Amount = parseInt(Fields[fieldIndex].xyCellAmount);
            yCell_Amount = parseInt(Fields[fieldIndex].xyCellAmount);
        };

    } else {
        xCell_Amount = parseInt(Fields[fieldIndex].xyCellAmount);
        yCell_Amount = parseInt(Fields[fieldIndex].xyCellAmount);
    };

    // console.log(xCell_Amount, yCell_Amount);

    board_size = xCell_Amount;

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

    // console.log(xCell_Amount, yCell_Amount);

    //Creates TicTacToe field etc.
    let [pattern_structures, pattern_names, pattern_values] = initAllPatterns(Allowed_Patterns, CreativeLevel_from_onlineMode_costumPatterns_globalVar, xCell_Amount, yCell_Amount, creativeLevel_costumBotPatterns || {});
    CalculateBoundaries();
    CreateField();

    // for costum coords that have a different value e.g: 9x11 , 15x10
    // if (costumCoords) {
    //     let costumX = costumCoords[0];
    //     let costumY = costumCoords[1];

    //     console.log(costumX, costumY);

    //     if (costumX < costumY) {
    //         costumX = costumY;

    //     } else if (costumX > costumY) {};

    //     CreateWinConditions(costumX, Allowed_Patterns);

    // } else {
    CreateWinConditions(xCell_Amount, yCell_Amount, pattern_structures);
    // };

    // user costum patterns are only availible in user costum levels
    if (NewCreativeLevel || CreativeLevel_from_onlineMode_costumPatterns || PlayingInCreatedLevel) {
        if (personal_GameData.role == "user" || personal_GameData.role == "blocker") {
            PlayingInCreatedLevel_AsGuest = true;
        };
    };

    // for KI Mode
    ki_board = 0b0;
    player_board = 0b0;
    blockages = 0b0;
    Bitboard_spells = BigInt(0b0);

    MovesAmount_PlayerAndKi = 0;
    KI_play_mode = "defend";

    InnerFieldData_Indexes = {};
    InnerFieldData_Options = [];

    // spells
    SpellsInStore = 0;

    PlayerIsAllowedToSetTwoTimes = false;

    // add Event Listener
    const el_cells = [...cellGrid.children];
    cells = el_cells;

    // set up restart button
    restartBtn.addEventListener('click', restartGame);

    running = true;
    player1_can_set = true;
    player3_can_set = false;

    AllUsersClickedSum = 0;

    UltimateWinText.textContent = null;

    // In the online game mode the curr_innerGameMode gets its right value in serverHandler.js
    GameData.InnerGameMode = curr_innerGameMode;

    if (!inAdvantureMode) { // If not in KI Mode and not in advanture mode
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

        killAllDrawnCells = true;

        // in advanture mode every level has a presetted inner game mode the user can't change
        GameData.InnerGameMode = AdvantureLevel_InnerGameMode;

        // If the map level inner game mode is Boneyard
        if (GameData.InnerGameMode == InnerGameModes[1]) {
            Start_Blocker(onlineGame);
        };

        // every advanture mode level has invisible spells on the field
        // if the lucky user clicks on a cell that contains a spell he can , for example , place two times in a row
        SpellsSpawnRate();
    };

    Find_MaxDepth();

    if (onlineGame == 'OnlineMode') {
        initializeDocument(field, fieldIndex, fieldTitle, true, OnlineGameDataArray, maxAmoOfMoves, CreativeLevel_from_onlineMode_costumPatterns, costumCoords);
    } else {
        initializeDocument(field, fieldIndex, fieldTitle, false, OnlineGameDataArray, maxAmoOfMoves, CreativeLevel_from_onlineMode_costumPatterns, costumCoords);
    };

    // if in 40x40 field, generate its properties: eye
    // or level 10: eye boss, or level 9: sun boss
    if ( /*Fields[fieldIndex].size == "40x40" ||*/ current_selected_level == 10 && inAdvantureMode || current_selected_level == 9 && inAdvantureMode || current_selected_level == 4 &&
        inAdvantureMode) {

        document.querySelector('#GameArea-FieldCircle').style.margin = "0 0 0 1.5vw";
        lobbyFooterText.style.display = 'none';

        // in advanture map on the last level with the eye boss
        if (inAdvantureMode && current_selected_level == 10) {
            // eye_40.style.display = 'flex';
            // sun_40.style.display = 'none';
            // init_eye();
            current_level_boss = new Eye();
            current_level_boss.display();

        } else if (inAdvantureMode && current_selected_level == 9) {
            // sun_40.style.display = 'flex';
            // eye_40.style.display = 'none';
            // init_sun();
            current_level_boss = new Sun();
            current_level_boss.display();

        } else if (Fields[fieldIndex].size == "40x40") {
            // eye_40.style.display = 'flex';
            // sun_40.style.display = 'none';
            // init_eye();
            // current_level_boss = new Eye();
            // current_level_boss.display();

        } else if (inAdvantureMode && current_selected_level == 4) {
            current_level_boss = new StarEye();
            current_level_boss.display();
        };

    } else {
        lobbyFooterText.style.display = 'flex';
        sun_40.style.display = 'none';
        eye_40.style.display = 'none';
        boss.style.display = "none";
        document.querySelector('#GameArea-FieldCircle').style.margin = "0 0 0 1.5vw";
    };
    // console.log(fieldIndex);

    // if (personal_GameData.role == 'admin') {
    //     socket.emit('update_room_x_and_y', personal_GameData.currGameID, [xCell_Amount, yCell_Amount]);
    // };

    // play theme music 
    try {
        PauseMusic();
        CreateMusicBars(curr_music_name);
    } catch (error) {
        console.log('music name not found.');
    };
};

function initAllPatterns(official_patterns, costum_patterns, Fieldx, Fieldy, costum_bot_patterns) {
    xCell_Amount = 5;
    yCell_Amount = 5;
    CalculateBoundaries();

    all_patterns_in_game = {};
    let [pattern_structures, pattern_names, pattern_values] = BindPatternsWithCostumPatternsToIndexes(official_patterns, costum_patterns, Fieldx, Fieldy);
    // console.log(pattern_structures, pattern_names, costum_patterns, pattern_values);

    pattern_structures.forEach((s, i) => {
        all_patterns_in_game[pattern_names[i]] = { 'structure': s, 'value': pattern_values[i] };
    });

    Object.keys(costum_bot_patterns).forEach(n => {
        all_patterns_in_game[n] = { 'structure': costum_bot_patterns[n]['structure'], 'value': costum_bot_patterns[n]['value'] };
    });
    // console.log(all_patterns_in_game);
    xCell_Amount = Fieldx;
    yCell_Amount = Fieldy;

    return [pattern_structures, pattern_names, pattern_values];
};

function initializeDocument(field, fieldIndex, fieldTitle, onlineMode, OnlineGameDataArray, maxAmoOfMoves, CreativeLevel_from_onlineMode_costumPatterns, costumCoords) {
    if (localStorage.getItem('sett-ShowFieldData') == null) {
        localStorage.setItem('sett-ShowFieldData', 'true');
    };

    // Hide unnecessary elements
    GameField.style.display = 'flex';
    gameModeFields_Div.style.display = 'none';
    CheckmateWarnText.style.display = 'none';
    OnlineChat_btn.style.display = "none";
    CloseOnlinePopUps(true);
    CreateLevelScene.style.display = "none";
    HeaderWrapper.style.height = '7.5%';
    lobbyFooter.style.background = "#15171a";
    lobbyFooter.style.width = "100%";
    cellGrid.style.pointerEvents = 'all';
    review_mode_game_footer.style.display = 'none';
    localStorage.getItem('sett-ShowFieldData') == 'true' ? document.querySelector('.GameField-info-corner').style.display = "flex" : document.querySelector('.GameField-info-corner').style.display = "none";
    watching_count_el.textContent = `watching: ${0}`;
    YouWatchGameEl.style.display = 'none';
    watching_count_el.style.display = 'none';
    statusText.style.display = 'flex';
    GameFieldHeaderUnder.style.display = 'flex';

    review_mode_action_wrapper.style.display = "none";
    review_moves_wrapper.style.display = "none";

    gameLog_btn.classList.add('blured');

    pointsToAchieve_ScoreBar.forEach(textEl => {
        textEl.style.display = 'block';
        textEl.textContent = ` / ${points_to_win}`;
    });

    scorePlayer1.style.display = 'block';
    scorePlayer2.style.display = 'block';

    // Initialize leaderboard scores
    leaderboard_player1_score.textContent = "0";
    leaderboard_player2_score.textContent = "0";

    // Remove event listeners and set cursor to default for cells
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
        cell.style.cursor = "default";

        cell.addEventListener('mouseenter', function a() {
            cell_mouseEnter(cell);
        });

        cell.addEventListener('mouseleave', function a() {
            cell_mouseLeave(cell);
        });
    });

    // Set choose winner button based on game mode
    curr_mode == GameMode[2].opponent ? globalChooseWinnerBtn = GiveUp_btn : globalChooseWinnerBtn = chooseWinnerWindowBtn;

    // Initialize game title and info
    if (CreativeLevel_from_onlineMode_costumPatterns || NewCreativeLevel) {

        if (costumCoords[0] != undefined && !isNaN(costumCoords[0])) {

            GameField_FieldSizeDisplay.textContent = `${costumCoords[0]}x${costumCoords[1]}`;
            GameField_BlockAmountDisplay.textContent = `${costumCoords[0]*costumCoords[1]}`;

        } else { // offline mode

            GameTitle.textContent = fieldTitle;
            GameField_FieldSizeDisplay.textContent = `${Fields[fieldIndex].size}`;
            GameField_BlockAmountDisplay.textContent = `${Fields[fieldIndex].blocks}`;
        };

    } else {

        GameTitle.textContent = fieldTitle;
        GameField_FieldSizeDisplay.textContent = `${Fields[fieldIndex].size}`;
        GameField_BlockAmountDisplay.textContent = `${Fields[fieldIndex].blocks}`;
    };

    SetGameFieldIconForCurrentField(parseInt(xCell_Amount), fieldIndex, CreativeLevel_from_onlineMode_costumPatterns);
    !inPlayerLevelsScene && SetBGColorForCurrentField(parseInt(xCell_Amount));
    inAdvantureMode ? GameField_AveragePlayTimeDisplay.textContent = `ave. playtime is unknown` : GameField_AveragePlayTimeDisplay.textContent = `ave. playtime ${Fields[fieldIndex].averagePlayTime}`;

    // Display game grid
    cellGrid.style.display = 'grid';
    cellGrid.classList.remove('Invisible');
    cellGrid.classList.remove('cellGrid-alert');
    cellGrid.classList.add('cellGrid_opacity');
    cellGrid.style.opacity = "1";

    // Initialize choose winner and give up buttons
    chooseWinnerWindowBtn.addEventListener('click', openChooseWinnerWindow);
    giveUp_Yes_btn.removeEventListener('click', giveUp_Yes_btn.fn);
    giveUp_Yes_btn.addEventListener('click', giveUp_Yes_btn.fn = function() { UserGivesUp(personal_GameData.role) });

    chooseWinnerWindowBtn.style.display = "none";
    GiveUp_btn.style.display = "none";
    globalChooseWinnerBtn.style.display = "block";

    // Initialize game elements based on mode
    if (!onlineMode) {

        // Offline mode
        GameField_TimeMonitor.textContent = '0 s.';
        clearInterval(gameCounter);
        gameCounter = null;
        gameCounter = setInterval(() => {
            GameSeconds++;
            GameField_TimeMonitor.textContent = GameSeconds + ' s.';
        }, 1000);

        restartBtn.style.display = 'block';
        globalChooseWinnerBtn.style.display = 'block';
        restartBtn.style.color = 'var(font-color)';
        addAccessToAnything("TimerEnded", "fromBeginning");
        ChangeGameBG(bgcolor1, bgcolor2);

    } else {

        // Online mode
        if (personal_GameData.role == 'admin') {

            restartBtn.style.display = 'block';
            globalChooseWinnerBtn.style.display = 'block';
            GameField_TimeMonitor.textContent = '0 s.';
            clearInterval(gameCounter);
            gameCounter = null;

            gameCounter = setInterval(() => {
                socket.emit('globalTimer', personal_GameData.currGameID);
            }, 1000);
        };

        if (personal_GameData.role == 'user') { // view from second player

            restartBtn.style.color = '#56565659';
            restartBtn.removeEventListener('click', restartGame);

            GiveUp_btn.style.color = 'var(--font-color)';
            GiveUp_btn.style.display = 'block';

        } else if (personal_GameData.role == 'admin') { // view from first player

            restartBtn.style.color = 'var(--font-color)';
            restartBtn.addEventListener('click', restartGame);

            GiveUp_btn.style.color = 'var(--font-color)';
            GiveUp_btn.style.display = 'block';

        } else if (personal_GameData.role == 'blocker') { // view from third player

            restartBtn.style.color = '#56565659';
            restartBtn.removeEventListener('click', restartGame);

            giveUp_Yes_btn.removeEventListener('click', giveUp_Yes_btn.fn);
            GiveUp_btn.style.display = 'none';
        };

        addAccesOnlineMode("TimerEnded", "fromBeginning");
        OnlineChat_btn.style.display = "block";
        socket.emit("ChangeBGColor", personal_GameData.currGameID, bgcolor1, bgcolor2);
    };

    // Advanture mode settings
    if (inAdvantureMode) {

        restartBtn.style.display = 'none';
        globalChooseWinnerBtn.style.display = 'none';
        MaxAmountOfMovesGameDisplay.style.display = 'flex';
        MaxAmountOfMovesGameDisplay.textContent = `moves left: ${maxAmoOfMoves}`;
        AdvantureMode_SpellDisplay.style.display = "flex";
        SpellAmountDisplay.textContent = SpellsInStore;

    } else {

        restartBtn.style.display = 'block';
        personal_GameData.role != "blocker" ? globalChooseWinnerBtn.style.display = 'block' : globalChooseWinnerBtn.style.display = 'none';
        MaxAmountOfMovesGameDisplay.style.display = 'none';
        AdvantureMode_SpellDisplay.style.display = "none";
    };

    // Choose winner button display based on mode
    if (PlayingInCreatedLevel || CreativeLevel_from_onlineMode_costumPatterns) {

        globalChooseWinnerBtn.style.display = "none";
        GiveUp_btn.style.display = "none";
        chooseWinnerWindowBtn.style.display = "none";

    } else if (curr_mode == GameMode[3].opponent) {

        globalChooseWinnerBtn.style.display = "block";
    };

    if (onlineMode) {
        if (allow_players_watch_el.querySelector('i').className != 'fa-regular fa-check-square') {
            watching_count_el.style.display = 'none';
            restartBtn.style.display = 'flex';

        } else {
            watching_count_el.style.display = 'flex';
            restartBtn.style.display = 'none';
        };
    };

    // Adjust cell width and height
    let cellWidth = cellGrid.children[0].getBoundingClientRect().width;
    [...cellGrid.children].forEach(cell => {
        cell.style.width = `${cellWidth}px`;
        cell.style.height = `${cellWidth}px`;
    });

    fetch_spinner.setAttribute('in_use', 'false');
    fetch_spinner.setAttribute('in_use_in_lobby', 'false');
    Lobby_footer.querySelector('.fetch_spinner') && Lobby_footer.querySelector('.fetch_spinner').remove();

    if (arena_mode) {
        chooseWinnerWindowBtn.style.display = 'none';
        GiveUp_btn.style.display = 'none';
        TrainingArenaDifficutlyModeGameDisplay.style.display = 'flex';
        TrainingArenaDifficutlyModeGameDisplayText.textContent = training_arena.mode.toUpperCase();
        TrainingArenaDifficutlyModeGameDisplayText.style.color = training_arena.mode_color;

    } else {
        TrainingArenaDifficutlyModeGameDisplay.style.display = 'none';
    };

    if (tournament_mode) {
        ChangeGameBG(bgcolor1, bgcolor2);
    } else {};

    if (tournament_mode || inAdvantureMode) {
        field_deco_wrapper.style.display = 'flex';

    } else {
        field_deco_wrapper.style.display = 'flex';
    };

    // Initialize players
    initializePlayers(OnlineGameDataArray);
};

function initializePlayers(OnlineGameDataArray) {
    scorePlayer1.textContent = score_Player1_numb;
    scorePlayer2.textContent = score_Player2_numb;

    scoreUp_animation(1, score_Player1_numb, points_to_win);
    scoreUp_animation(2, score_Player2_numb, points_to_win);

    player1_score_bar_wrapper.style.background = `linear-gradient(105deg, #3f51b5 ${0}%, transparent ${5}%)`;
    player2_score_bar_wrapper.style.background = `linear-gradient(-105deg, darkred ${0}%, transparent ${5}%)`;

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
            namePlayer1.textContent = curr_name1 + ` - ${PlayerData[1].PlayerForm}`;

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
            namePlayer2.textContent = curr_name2 + ` - ${PlayerData[2].PlayerForm}`;

            // if previous span existed, remove it as a bug fix
            if (document.querySelector('.sideScore_TemporarySpan2')) {
                document.querySelector('.sideScore_TemporarySpan2').remove();
            };
        };

        // set color of player icon
        namePlayer1.style.color = OnlineGameDataArray[10];
        namePlayer2.style.color = OnlineGameDataArray[11];

        // blocker name if exists
        PlayerData[3].PlayerName = OnlineGameDataArray[12];

        personal_GameData.role == "blocker" && (personalname = PlayerData[3].PlayerName); // for third player

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
            namePlayer1.textContent = curr_name1 + ` - ${PlayerData[1].PlayerForm}`;

            // if previous span existed, remove it as a bug fix
            if (document.querySelector('.sideScore_TemporarySpan1')) {
                document.querySelector('.sideScore_TemporarySpan1').remove();
            };
        };

        // player 2 uses a normal skin in offline mode (player 2 is wether a KI or an offline friend on local computer)
        namePlayer2.textContent = curr_name2 + ` - ${PlayerData[2].PlayerForm}`;

        // set color of player icon
        namePlayer1.style.color = localStorage.getItem('userInfoColor');
        curr_mode == GameMode[1].opponent ? namePlayer2.style.color = "gold" : namePlayer2.style.color = "white";

        if (arena_mode) {
            namePlayer2.style.color = "white";
        };
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

    // Define minimax scores for KI Mode
    scores[PlayerData[1].PlayerForm] = -1;
    scores[PlayerData[2].PlayerForm] = 1;
    scores['tie'] = 0;

    // Adds click event to every single cell and starts game
    cells.forEach(cell => {
        cell.addEventListener('click', cellCicked);
        cell.style.cursor = "pointer";
    });

    StartGameAnimation();
};

const StartGameAnimation = () => {
    let player1_iconWrapper = document.createElement('span');
    let player2_iconWrapper = document.createElement('span');

    gameStartAnimation_el.style.display = 'flex';
    gameStartAnimation_el.style.opacity = '1';

    GamePlayerBarInnerWrappers[0].textContent = `${PlayerData[2].PlayerName}`;
    GamePlayerBarInnerWrappers[1].textContent = `${PlayerData[1].PlayerName}`;

    if (PlayerData[2].AdvancedSkin != "cell empty") {
        DisplayPlayerIcon_at_el(player2_iconWrapper, PlayerData[2].AdvancedSkin, 'white', PlayerData[2].PlayerForm);
    } else {
        player2_iconWrapper.textContent = `- ${PlayerData[2].PlayerForm}`;
    };

    if (PlayerData[1].AdvancedSkin != "cell empty") {
        DisplayPlayerIcon_at_el(player1_iconWrapper, PlayerData[1].AdvancedSkin, 'white', PlayerData[1].PlayerForm);
    } else {
        player1_iconWrapper.textContent = `- ${PlayerData[1].PlayerForm}`;
    };

    player1_iconWrapper.classList.remove('cell');
    player2_iconWrapper.classList.remove('cell');
    player1_iconWrapper.style.fontSize = '8vw';
    player2_iconWrapper.style.fontSize = '8vw';

    GamePlayerBarInnerWrappers[0].appendChild(player2_iconWrapper);
    GamePlayerBarInnerWrappers[1].appendChild(player1_iconWrapper);
};

gameStartAnimation_el.addEventListener('animationend', () => {
    gameStartAnimation_el.style.display = 'none';
});

// cell mouse enter
function cell_mouseEnter(cell) {
    let AdvancedSkin;

    if (curr_mode == GameMode[2].opponent) { // online mode
        AdvancedSkin = `cell ${localStorage.getItem("userInfoClass")}`;

    } else {
        AdvancedSkin = PlayerData[1].AdvancedSkin;
    };

    if (!cell.classList.contains("draw") && !cell.classList.contains("death-cell")) {

        // Display player symbol or advanced skin
        if (curr_mode != GameMode[3].opponent && AdvancedSkin != "cell empty") { // online mode | advanture mode

            if (personal_GameData.role != "blocker") {

                let str = AdvancedSkin;
                let parts = str.split(" "); // Trennung anhand des Leerzeichens

                let part1 = parts[0]; // Erster Teil des geteilten Strings
                let part2 = parts[1]; // Zweiter Teil des geteilten Strings
                let part3 = parts[2]; // Zweiter Teil des geteilten Strings

                cell.classList.add(part1);
                cell.classList.add(part2);
                cell.classList.add(part3);
            };

        } else if (curr_mode != GameMode[3].opponent && AdvancedSkin == "cell empty") {

            if (personal_GameData.role != "blocker") {

                cell.style.color = localStorage.getItem('userInfoColor');

                if (personal_GameData.role == "admin") {
                    cell.textContent = PlayerData[1].PlayerForm;
                };

                if (personal_GameData.role == "user") {
                    cell.textContent = PlayerData[2].PlayerForm;
                };
            };

        } else if (curr_mode == GameMode[3].opponent && currentPlayer != PlayerData[1].PlayerForm) { // offline mode and player 2 turn 

            cell.textContent = currentPlayer;
            cell.style.color = "white";

        } else if (curr_mode == GameMode[3].opponent && currentPlayer == PlayerData[1].PlayerForm) { // offline mode and player 1 turn

            if (AdvancedSkin != "cell empty") {
                let str = AdvancedSkin;
                let parts = str.split(" "); // Trennung anhand des Leerzeichens

                let part1 = parts[0]; // Erster Teil des geteilten Strings
                let part2 = parts[1]; // Zweiter Teil des geteilten Strings
                let part3 = parts[2]; // Zweiter Teil des geteilten Strings

                cell.classList.add(part1);
                cell.classList.add(part2);
                cell.classList.add(part3);

            } else {
                cell.textContent = currentPlayer;
                cell.style.color = localStorage.getItem('userInfoColor');
            };
        };
    };
};

// cell mouse leave
function cell_mouseLeave(cell) {
    if (!cell.classList.contains("draw") && !cell.classList.contains("death-cell")) {

        cell.textContent = '';
        cell.className = "cell";
        cell.style.color = "white";
    };
};

// when the game starts, for all players in the game, 
// the global game timer recieves the global timer from the server and displays it
socket.on('display_GlobalGameTimer', timer => {
    GameSeconds++;
    GameField_TimeMonitor.textContent = `${timer} s.`;
});

// Only availible in user created levels
socket.on("GetBgcolors", (bg1, bg2) => {
    ChangeGameBG(bg1, bg2);
});

// Change backgroundColor
const ChangeGameBG = (bg1, bg2, reset, to_standard) => {
    if (to_standard) {
        Lobby.style.background = ``;
        return;
    };

    if (reset || reset && personal_GameData.role == "user" && personal_GameData.currGameID != null || localStorage.getItem("sett-ShowBGColor") == "false") {
        Lobby.style.background = `unset`;
        // lobbyHeader.style.backgroundColor = "#15171a";

    } else if (reset == undefined || personal_GameData.role == "user" && personal_GameData.currGameID != null && reset == undefined && localStorage.getItem("sett-ShowBGColor") == "true") {
        Lobby.style.background = `linear-gradient(45deg, ${bg1}, ${bg2})`;
        // lobbyHeader.style.backgroundColor = "unset";
    };
};

// the normal card level in complex toe als have bg colors to make them more unique etc.
const SetBGColorForCurrentField = (xy) => {
    if (localStorage.getItem("sett-ShowBGColor") == "true" && !NewCreativeLevel && !tournament_mode) {
        switch (xy) {
            case 5:
                bgcolor1 = "#e9967a57";
                bgcolor2 = "#bb634557";
                break;

            case 10:
                bgcolor1 = "#ff7f5078";
                bgcolor2 = "#bf5c3778";
                break;

            case 15:
                bgcolor1 = "#e91e6352";
                bgcolor2 = "#ed143d12";
                break;

            case 20:
                if (!inAdvantureMode) {
                    bgcolor1 = "#5684ab61";
                    bgcolor2 = "#2e567861";

                } else if (inAdvantureMode) {
                    Lobby.style.background = "linear-gradient(45deg, #e9967a57, #bb634557)";
                };
                break;

            case 25:
                bgcolor1 = "#ff980024";
                bgcolor2 = "#ff572261";
                break;

            case 30:
                if (!inAdvantureMode) {
                    bgcolor1 = "#93cf954f";
                    bgcolor2 = "#4caf5063";

                } else if (inAdvantureMode) {
                    Lobby.style.background = "linear-gradient(45deg, rgba(147, 78, 40, 0.54), rgb(155 76 63 / 63%))";
                };
                break;

            case 40:
                bgcolor1 = "#f436364a";
                bgcolor2 = "#f436364a";
                break;
        };

    } else {
        Lobby.style.background = "";
    };

    if (tournament_mode) {
        bgcolor1 = "#171023";
        bgcolor2 = "rgb(151 135 53 / 7%)";
    };
};

// every card field has its own img icon or fontawesome icon
const SetGameFieldIconForCurrentField = (xy, fieldIndex, fromCreativeLevel, forTournamentMode_fromReviewMode) => {
    if (!NewCreativeLevel && !tournament_mode) {
        switch (xy) {
            case 5:
                if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
                let img = document.createElement("img");
                img.src = "./assets/game/warlord-helmet.svg";
                img.width = "35";
                img.height = "35";
                img.style.margin = "0.5vh 0 0 0";
                img.style.transform = "rotate(90deg)";
                Game_Upper_Field_Icon.appendChild(img);
                Game_Upper_Field_Icon.classList = "";
                break;

            case 10:
                if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
                let img1 = document.createElement("img");
                img1.src = "./assets/game/wolf-head.svg";
                img1.width = "35";
                img1.height = "35";
                img1.style.margin = "0.5vh 0 0 0";
                Game_Upper_Field_Icon.appendChild(img1);
                Game_Upper_Field_Icon.classList = "";
                break;

            case 15:
                if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
                let img3 = document.createElement("img");
                img3.src = "./assets/game/shattered-sword.svg";
                img3.width = "31";
                img3.height = "31";
                img3.style.margin = "0.5vh 0.1vw 0 0";
                img3.style.transform = "scaleX(-1)";
                Game_Upper_Field_Icon.appendChild(img3);
                Game_Upper_Field_Icon.classList = "";
                break;

            case 20:
                if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
                let img2 = document.createElement("img");
                img2.src = "./assets/game/dragon-head.svg";
                img2.width = "35";
                img2.height = "35";
                img2.style.margin = "0.5vh 0 0 0";
                img2.style.transform = "rotate(90deg) scaleY(-1)";
                Game_Upper_Field_Icon.appendChild(img2);
                Game_Upper_Field_Icon.classList = "";
                break;

            case 25:
                if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
                Game_Upper_Field_Icon.classList = `${Fields[fieldIndex].icon} field-card-header-icon`;
                break;

            case 30:
                if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
                Game_Upper_Field_Icon.classList = `${Fields[fieldIndex].icon} field-card-header-icon`;
                break;

            case 40:
                if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
                let img4 = document.createElement("img");
                img4.src = "./assets/game/semi-closed-eye.svg";
                img4.width = "40";
                img4.height = "40";
                img4.style.margin = "0.3vh 0 0 0";
                Game_Upper_Field_Icon.appendChild(img4);
                Game_Upper_Field_Icon.classList = "";
                break;
        };

    } else if (NewCreativeLevel) {

        if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
        let img5 = document.createElement("img");
        img5.src = NewCreativeLevel.Settings.levelicon[NewCreativeLevel.selectedLevel[4]];
        img5.width = "31";
        img5.height = "31";
        img5.style.margin = "0.5vh 0 0 0";
        Game_Upper_Field_Icon.appendChild(img5);
        Game_Upper_Field_Icon.classList = "";
        return
    };

    if (tournament_mode || forTournamentMode_fromReviewMode) {
        if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
        let img11 = document.createElement("img");
        img11.src = "assets/game/sunken-eye.svg";
        img11.width = "31";
        img11.height = "31";
        img11.style.margin = "0.5vh 0 0 0";
        Game_Upper_Field_Icon.appendChild(img11);
        Game_Upper_Field_Icon.classList = "";
        return;
    };

    // online game in creative level
    if (fromCreativeLevel) {
        let icon = null;

        if (PlayingInCreatedLevel_AsGuest) {
            icon = costumLevelIcon;

        } else if (player_levels_handler.online_level_overview_handler) {
            icon = universal_level_icons[player_levels_handler.online_level_overview_handler.level.icon];
        };

        if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
        let img5 = document.createElement("img");
        img5.src = icon;
        img5.width = "31";
        img5.height = "31";
        img5.style.margin = "0.5vh 0 0 0";
        Game_Upper_Field_Icon.appendChild(img5);
        Game_Upper_Field_Icon.classList = "";
        return;
    };

    if (review_mode && review_mode_handler.entry.level_icon) {
        if (Game_Upper_Field_Icon.querySelector("img")) Game_Upper_Field_Icon.querySelector("img").remove();
        let img5 = document.createElement("img");
        img5.src = review_mode_handler.levelicons[review_mode_handler.entry.level_icon];
        img5.width = "31";
        img5.height = "31";
        img5.style.margin = "0.5vh 0 0 0";
        Game_Upper_Field_Icon.appendChild(img5);
        Game_Upper_Field_Icon.classList = "";
        return;
    };
};

// user clicked some cell
let lastCellIndex_Clicked = 0;
async function cellCicked() {
    // console.log(this.classList, MaxAmountOfMovesGameDisplay, running);
    if (!this.classList.contains("draw") && !this.classList.contains("death-cell") && MaxAmountOfMovesCount > 0 && running == true) { // cell is alive and useable
        const cellIndex = this.getAttribute("cell-index");

        // console.log(options[cellIndex]);

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
                player1_can_set = false;
                await socket.emit('PlayerClicked', [personal_GameData.currGameID, personal_GameData.role, cellIndex, PlayerData[1].PlayerForm, player1_can_set, localStorage.getItem('userInfoColor'), localStorage.getItem('userInfoClass')]);
            }; // the second player tries to click, but he must wait for his opponent;

            // Check if the second player (user) can set and the player that clicked it the user
            // if not, nothing must happen
            if (!player1_can_set && personal_GameData.role == 'user') {
                player1_can_set = true;
                await socket.emit('PlayerClicked', [personal_GameData.currGameID, personal_GameData.role, cellIndex, PlayerData[2].PlayerForm, player1_can_set, localStorage.getItem('userInfoColor'), localStorage.getItem('userInfoClass')]);
            }; // the first player tries to click, but he must wait for his opponent

            // After a player finishes and inner game mode is blocker combat and the blocker clicked a cell
            if (player3_can_set && personal_GameData.role == 'blocker') {
                player3_can_set = false;
                socket.emit('BlockerCombat', personal_GameData.currGameID, cellIndex);
            };

        } else { // some other mode - offline mode obviously

            AllUsersClickedSum++;

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

                if (GameData.InnerGameMode == InnerGameModes[2] && AllUsersClickedSum % 2 == 0) { // blocker combat inner game mode
                    // Active Blocker blocks a cell
                    Activate_InteractiveBlocker();

                    // important stuff
                    killPlayerClocks();

                    // check winner after the active blocker did his stuff
                    setTimeout(() => {
                        checkWinner();
                    }, 1000);

                } else if (GameData.InnerGameMode == InnerGameModes[1] || GameData.InnerGameMode == InnerGameModes[3] || AllUsersClickedSum % 2 != 0) { // If other inner game mode => just check winner
                    checkWinner();
                };

            } else if (curr_mode == GameMode[1].opponent && !inAdvantureMode) { // if in KI Mode but not in Advanture mode => just check the winner
                statusText.textContent = "Waiting for Bot...";
                checkWinner();

            } else if (curr_mode == GameMode[1].opponent && inAdvantureMode) { // if in KI Mode and in Advanture mode 

                // check if player found spell
                let foundSpell = isBitSetBIGINT(Bitboard_spells, cellIndex);
                if (foundSpell) UserFoundSpell(cellIndex);

                // other
                if (GameData.InnerGameMode == InnerGameModes[2] && AllUsersClickedSum % 2 == 0) { // blocker combat inner game mode
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

// A message to all players that a player placed his (form/icon/skin whatever you call it) on a cell
// the update options event is in the server, here the options array gets copied
socket.on('player_clicked', Goptions => {
    if (running) {
        // update cell
        options = Goptions[0];
        cells = [...cellGrid.children];

        if (watch_mode) {
            global_online_games_handler.current_selected_game_instance.watch_mode_handler.init_cells(options, global_online_games_handler.current_selected_game_instance.game_data);
            return;
        };

        for (let i = 0; i < options.length; i++) {
            const element = options[i];

            if (element != '' && !cells[i].classList.contains('colored-cell') && Goptions[3] == "empty" && !cells[i].classList.contains("draw") && !cells[i].classList.contains("death-cell")) {

                cells[i].style.color = Goptions[2];
                cells[i].classList.add('colored-cell');

                cells[i].textContent = element;

                cells[i].className = cells[i].className.replace(PlayerData[1].AdvancedSkin, "");
                cells[i].className = cells[i].className.replace(PlayerData[2].AdvancedSkin, "");

                cells[i].style.opacity = "1";
                cells[i].classList.add("draw");

                all_game_moves.push(i);

            } else if (element != '' && !cells[i].classList.contains('colored-cell') && Goptions[3] != "empty" && !cells[i].classList.contains("draw") && !cells[i].classList.contains("death-cell")) {

                cells[i].style.color = "var(--font-color)";
                cells[i].className = `cell ${Goptions[3]}`;
                cells[i].textContent = "";

                cells[i].style.opacity = "1";
                cells[i].classList.add("draw");

                all_game_moves.push(i);
            };
        };

        AllUsersClickedSum++;

        if (watch_mode) {
            checkWinner(false, "fromClick");
            return;
        };

        // Check which inner game mode is activated
        if (GameData.InnerGameMode == InnerGameModes[2] && AllUsersClickedSum % 2 == 0) { // blocker combat inner game mode
            player1_can_set = Goptions[1];

            if (personal_GameData.role == "admin") {
                // important stuff
                killPlayerClocks(false, "stop");
            };

            // now the third player can set his block
            player3_can_set = true;
            thirdPlayerSets();

        } else if (GameData.InnerGameMode != InnerGameModes[2] || AllUsersClickedSum % 2 == 1) { // If other inner game mode => just check winner
            player1_can_set = Goptions[1];

            // check the winner
            checkWinner(false, "fromClick");
        };
    };
});

// normal update cell function when player in offline mode clicks cell
function updateCell(index) {
    options[index] = currentPlayer;
    all_game_moves.push(index);

    MovesAmount_PlayerAndKi++;

    let cells = [...cellGrid.children];

    // user uses an advanced skin
    if (PlayerData[1].AdvancedSkin != "cell empty" && currentPlayer == PlayerData[1].PlayerForm) {
        cells[index].className = `${PlayerData[1].AdvancedSkin}`;
        cells[index].textContent = "";

    } else { // he uses normal skin
        cells[index].textContent = currentPlayer;

        if (currentPlayer == PlayerData[1].PlayerForm) {
            cells[index].style.color = localStorage.getItem('userInfoColor')

        } else {
            cells[index].style.color = "white";
        };

        cells[index].className = "cell";
    };

    cells[index].style.opacity = "1";
    cells[index].classList.add("draw");

    // for advanture mode: bug fix
    if (InnerFieldData_Options.length > 0) InnerFieldData_Options[InnerFieldData_Indexes[index]] = currentPlayer;

    MaxAmountOfMovesCount >= 1 && MaxAmountOfMovesCount != Infinity ? MaxAmountOfMovesCount-- : MaxAmountOfMovesCount = MaxAmountOfMovesCount;
    MaxAmountOfMovesGameDisplay.textContent = `moves left: ${MaxAmountOfMovesCount}`;
};

// the third player (blocker) can set
function thirdPlayerSets() {
    // console.log(personal_GameData.role, running, player1_can_set, player3_can_set)
    if (personal_GameData.role == "blocker") {

        // add blocker access to set
        cells.forEach(cell => {
            cell.addEventListener('click', cellCicked);
        });

        statusText.textContent = "You can block now!";
        running = true;

    } else { // for the other player in the lobby

        // remove other player access to set
        cells.forEach(cell => {
            cell.removeEventListener('click', cellCicked);
        });

        statusText.textContent = `Wait for ${PlayerData[3].PlayerName} to block.`;

        if (watch_mode) {
            statusText.textContent = `Wait for ${global_online_games_handler.current_selected_game_instance.game_data.player3_name} to block.`;
        };
    };
};

// When the blocker combat inner game mode is activated and a player places his block
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

            cell_indexes_blocked_by_blocker.push(i);

            // This just deletes all '%%' from the options array that were used to block the game cells by their index
            // no callback or something on this one
            socket.emit('BlockerCombatFinalProcess', personal_GameData.currGameID, i);
            break;
        };
    };

    // At the end: Continue the game 
    checkWinner(false, "fromClick");
    player3_can_set = false;
});

async function changePlayer(from_restart, fromClick) {
    // console.log("from change player function:", from_restart, currentPlayer, curr_mode);

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

                if (curr_mode != GameMode[2].opponent) { // offline mode
                    Activate_PlayerClock(true, false);

                } else {

                    // start player clock for a player
                    personal_GameData.role == "admin" && await killPlayerClocks(false, "Reset&&Continue", "player1_timer_event", "player1_timer", 1) // the params are only for online mode
                };

            } else if (currentPlayer == PlayerData[2].PlayerForm) {

                if (curr_mode != GameMode[2].opponent) { // offline mode
                    Activate_PlayerClock(false, true);

                } else {

                    // start player clock for a player
                    personal_GameData.role == "admin" && await killPlayerClocks(false, "Reset&&Continue", "player2_timer_event", "player2_timer", 2) // the params are only for online mode
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

    const el_cells = [...cellGrid.children];
    cells = el_cells;

    el_cells.forEach(cell => {
        if (!cell.classList.contains("draw") && !cell.classList.contains("death-cell")) {
            cell.addEventListener('click', cellCicked);
            cell.style.cursor = "pointer";
        };
    });
};

// check remaining white cells
function check_draw(options, cells) {
    const bigboard = convert_board_into_bit_board(options, cells);
    const bit_conditions = convert_conditions_into_bits(WinConditions);
    const boardSize = xCell_Amount * yCell_Amount;

    // check on every positon of the board every pattern of its validation
    for (let i = 0; i < boardSize; i++) {
        for (let bit_condition of bit_conditions) {

            // let shift = i - (bit_condition.toString(2).length);
            let shift = boardSize - (bit_condition.toString(2).length);

            for (let shift_idx = 0; shift_idx < shift; shift_idx++) {

                if (((bigboard >> BigInt(shift_idx)) & bit_condition) == BigInt(0)) {
                    // console.log("es kann noch gesetzt werden:", shift_idx, ((bigboard >> BigInt(i)) & bit_condition), ((bigboard >> BigInt(i)) & bit_condition).toString(2), shift, bigboard, i, bit_condition, bit_condition.toString(2), bit_condition.toString(2).length);
                    return false;
                };
            };
        };
    };

    // console.log("es kann nicht mehr gesetzt werden");
    return true;
};

// restart game
function restartGame() {
    // Event
    if (curr_mode == GameMode[2].opponent) { // if in online mode
        // Send trigger emit to server so the server sends the "Reload_GlobalGame" emit to all clients
        socket.emit('Reload_OnlineGame', personal_GameData.currGameID, xCell_Amount, yCell_Amount);

    } else { // if other mode
        killPlayerClocks(true);
        stopStatusTextInterval = true;
        cellGrid.classList.remove('cellGrid_opacity');
        changePlayer(true);
        setTimeout(() => {
            // console.log(allGameData);

            player1_score_bar_wrapper.style.background = `linear-gradient(105deg, #3f51b5 ${0}%, transparent ${5}%)`;
            player2_score_bar_wrapper.style.background = `linear-gradient(-105deg, darkred ${0}%, transparent ${5}%)`;

            initializeGame(allGameData[0], allGameData[1], allGameData[2], allGameData[3], allGameData[4], allGameData[5], allGameData[6], allGameData[7], allGameData[8], allGameData[9]);

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

    if (user_role == "admin") {
        // if admin had more points than user but gives up -> user wins nevertheless
        score_Player1_numb = -Infinity;
        score_Player2_numb = Infinity;
        Call_UltimateWin(undefined, true);

    } else if (user_role == "user") {
        // if admin had more points than user but gives up -> admin wins nevertheless
        score_Player1_numb = Infinity;
        score_Player2_numb = -Infinity;
        Call_UltimateWin(undefined, true);
    };
};

// Online Game
// reload game for all clients
socket.on('Reload_GlobalGame', (Goptions) => {

    if (watch_mode) {
        setTimeout(() => {
            // global_online_games_handler.current_selected_game_instance.open_game();
        }, 1000);
        return;
    };

    // update options
    options = Goptions
    OnlineGameData[2] = Goptions;

    killPlayerClocks(true);
    stopStatusTextInterval = true;
    cellGrid.classList.remove('cellGrid_opacity');
    changePlayer(true);
    setTimeout(() => {
        player1_score_bar_wrapper.style.background = `linear-gradient(105deg, #3f51b5 ${0}%, transparent ${5}%)`;
        player2_score_bar_wrapper.style.background = `linear-gradient(-105deg, darkred ${0}%, transparent ${5}%)`;

        initializeGame(allGameData[0], allGameData[1], allGameData[2], allGameData[3], allGameData[4], allGameData[5], allGameData[6], allGameData[7], allGameData[8], allGameData[9]);

        if (personal_GameData.role == 'admin') {
            // bug fix
            restartTimeout();
        };
    }, 50);
});

// Block used cells after a win
function single_CellBlock(cell, fromMap, WinCombination) {
    // just different animation style
    if (fromMap == "fromMap") {
        cell.style.animation = "destroyCell 2s forwards"

    } else {
        cell.style.animation = "blackenCell 2s forwards"; // Animation aktivieren
    };

    cell.className = "cell death-cell";
    cell.style.cursor = "default";
    cell.style.color = "white";
    cell.style.borderColor = "white";

    cell.removeEventListener('click', cellCicked);
    // setTimeout(() => {
    cell.textContent = null;
    // }, 2000);

    if (watch_mode) return;

    // Bug Fix
    if (curr_mode == GameMode[2].opponent) {
        socket.emit('resetOptions', personal_GameData.currGameID, xCell_Amount, killAllDrawnCells, [...WinCombination].map(cell => Number(cell.getAttribute("cell-index"))), options, message => {
            options = message;
        });

    } else {
        if (killAllDrawnCells) {
            CreateOptions("fromMap"); // local options

        } else {
            if (WinCombination) {
                WinCombination.forEach(cell => options[Number(cell.getAttribute("cell-index"))] = "");
            };
        };
    };
};

// cool end game animation
const EndGameGameAnimation = (text, OnGameEnd) => {
    return new Promise((resolve) => {
        if (!document.body.querySelector(".WhiteLayer")) {

            // remove access to anything and close all pop ups
            removeAccessToAnything();

            // play sound
            if (OnGameEnd) {
                playBattleEndTheme();

            } else {
                play_GameAnimationSound();
            };

            GameAnimation(text, true, "second_ani")
                .then(resolve);

        } else resolve();
    });
};

// cool game animation
const GameAnimation = (text, OnGameEnd, aniType = "default") => {
    return new Promise((resolve) => {
        if (!document.body.querySelector(".WhiteLayer")) {
            // remove access to anything and close all pop ups
            removeAccessToAnything();

            // play sound
            if (OnGameEnd) {
                playBattleEndTheme();

            } else {
                play_GameAnimationSound();
            };

            if (aniType == "default") {
                defaultGameAnimation(text)
                    .then(resolve);

            } else {
                secondGameAnimation(text, OnGameEnd)
                    .then(resolve);
            };

        } else resolve();
    });
};

// second game animation
const secondGameAnimation = (text, OnGameEnd) => {
    return new Promise(resolve => {

        // create white layer
        let layer = document.createElement("div");
        layer.classList.add("WhiteLayer");

        // create sword
        let sword = document.createElement("img");
        sword.classList.add("BigScreenSword_side1");
        sword.width = "500";
        sword.height = "500";
        sword.src = "assets/game/winged-sword.svg";

        // create sword 2
        let sword2 = document.createElement("img");
        sword2.classList.add("BigScreenSword_side2");
        sword2.width = "500";
        sword2.height = "500";
        sword2.src = "assets/game/winged-sword.svg";

        // create Text 
        let Text = document.createElement("h1");
        Text.style.fontSize = "10vh";
        Text.style.zIndex = "19999"
        Text.textContent = text;

        if (OnGameEnd) {
            // create Text 
            UltimateWinText.classList.add("BigScreenText");
            UltimateWinText.textContent = text;
        };

        sword.addEventListener("animationend", () => {
            sword.style.opacity = "0";
            sword2.style.opacity = "0";

            setTimeout(() => {
                sword.remove();
                sword2.remove();
                Text.classList.add("BigScreenText2");
                document.body.appendChild(Text);

                Text.addEventListener("animationend", () => {
                    setTimeout(() => {
                        layer.style.opacity = "0";
                        Text.style.opacity = "0";

                        setTimeout(() => {
                            Text.remove();
                            layer.remove();

                            // add access to anything
                            addAccessToAnything(undefined, true, true);

                            resolve();
                        }, 200);

                        if (OnGameEnd) {
                            // display end game pop up
                            DisplayPopUp_PopAnimation(endGameStatsPopUp, "flex", true);

                            // display end game leaderboard
                            EndGame_Leaderboard();

                            starsHandler.check();

                            // show play time
                            displayPlayTime();
                        };
                    }, 1250);
                });
            }, 200);
        });

        document.body.appendChild(sword);
        document.body.appendChild(sword2);
        document.body.appendChild(layer);
    });
};

// default game animation
const defaultGameAnimation = (text) => {
    return new Promise(resolve => {

        // create white layer
        let layer = document.createElement("div");
        layer.classList.add("WhiteLayer");
        // create sword
        let sword = document.createElement("img");
        sword.classList.add("BigScreenSword");
        sword.width = "500";
        sword.height = "500";
        sword.src = "assets/game/winged-sword.svg";
        // create Text 
        let Text = document.createElement("h1");
        Text.style.fontSize = "10vh";
        Text.textContent = text;

        sword.addEventListener("animationend", () => {
            sword.style.opacity = "0";

            setTimeout(() => {
                sword.remove();
                Text.classList.add("BigScreenText2");
                document.body.appendChild(Text);

                Text.addEventListener("animationend", () => {
                    setTimeout(() => {
                        layer.style.opacity = "0";
                        Text.style.opacity = "0";

                        setTimeout(() => {
                            Text.remove();
                            layer.remove();

                            // add access to anything
                            addAccessToAnything(undefined, true, true);

                            resolve();
                        }, 200);
                    }, 1250);
                });
            }, 200);
        });

        document.body.appendChild(sword);
        document.body.appendChild(layer);
    });
};

// display end game leader board
const EndGame_Leaderboard = () => {
    leaderboard_player1.textContent = PlayerData[1].PlayerName;
    leaderboard_player2.textContent = PlayerData[2].PlayerName;

    function scorePlayer1() {
        let i = 0;

        return new Promise(done => {
            if (score_Player1_numb == Infinity) {
                leaderboard_player1_score.textContent = "Won";
                done();

            } else {
                let interval = setInterval(() => {
                    if (i >= score_Player1_numb) {
                        clearInterval(interval);
                        interval = null;

                        done();
                        return;
                    };

                    i++;
                    leaderboard_player1_score.textContent = i;
                    playBtn_Audio_2();

                }, 100);
            };
        });
    };

    function scorePlayer2() {
        let i = 0;

        return new Promise(done => {
            if (score_Player2_numb == Infinity) {
                leaderboard_player2_score.textContent = "Won";
                done()

            } else {
                let interval = setInterval(() => {
                    if (i >= score_Player2_numb) {
                        clearInterval(interval);
                        interval = null;

                        done();
                        return;
                    };

                    i++;
                    leaderboard_player2_score.textContent = i;
                    playBtn_Audio_2();

                }, 100);
            };
        });
    };

    setTimeout(() => {
        scorePlayer1().then(scorePlayer2);
    }, 750);
};

// display play time
function displayPlayTime() {
    endGameStats_playTime.textContent = `Playtime: ${GameField_TimeMonitor.textContent}`;
};

// In KI mode: The unknown can place two times in a row
const Check_KI_canSetTwoTimesInARow = (level_index) => { // level_index = current playing advanture map level
    switch (level_index) {
        case 3:
            if (score_Player1_numb == 1) {
                KI_PlacesTwoTimesInARow();
                return true;
            };
            break;
        case 4:
            if (score_Player1_numb == 3) {
                KI_PlacesTwoTimesInARow();
                return true;
            };
            break;

        case 5:
            if (score_Player1_numb == 4) {
                KI_PlacesTwoTimesInARow();
                return true;
            };
            break;

        case 6:
            if (score_Player1_numb == 6 || score_Player1_numb == 9 || score_Player1_numb == 12) {
                KI_PlacesTwoTimesInARow();
                return true;
            };
            break;

        case 7:
            if (score_Player1_numb == 1 || score_Player1_numb == 5 || score_Player1_numb == 6 || score_Player1_numb == 8) {
                KI_PlacesTwoTimesInARow();
                return true;
            };
            break;

        case 8:
            if (score_Player1_numb == 3 || score_Player1_numb == 6 || score_Player1_numb == 9) {
                KI_PlacesTwoTimesInARow();
                return true;
            };
            break;

        case 9:
            if (score_Player1_numb == 3 || scorePlayer1 == 9 || score_Player1_numb == 6) {
                KI_PlacesTwoTimesInARow();
                return true;
            };
            break;

        case 10:
            if (score_Player1_numb == 3 || score_Player1_numb == 5 || score_Player1_numb == 8 ||
                score_Player1_numb == 12 || score_Player1_numb == 14) {
                KI_PlacesTwoTimesInARow();
                return true;
            };
            break;
    };
    return false;
};

// Dynamically during the game: new winnin combinations
const NewWinCombisDuringGame = () => {
    if (inAdvantureMode) {
        switch (current_selected_level) {
            case 4:
                if (score_Player1_numb == 4) {
                    allowedPatterns = ["dia2", "vert"];
                    GameAnimation("New Winning Combinations!");
                };
                break;

            case 5:
                if (score_Player1_numb == 6) {
                    allowedPatterns = ["diamond", "branch1"];
                    GameAnimation("New Winning Combinations!");
                };
                break;

            case 7:
                if (score_Player1_numb == 7) {
                    allowedPatterns = ["branch1", "star"];
                    GameAnimation("New Winning Combinations!");
                }
                if (score_Player1_numb == 4) {
                    allowedPatterns = ["branch2", "star"];
                    GameAnimation("New Winning Combinations!");
                };
                break;

            case 8:
                if (score_Player1_numb == 4) {
                    allowedPatterns = ["L1", "L2"];
                    GameAnimation("New Winning Combinations!");
                };
                break;

            case 9:
                if (score_Player1_numb == 15) {
                    allowedPatterns = ["W4", "diamond"];
                    GameAnimation("New Winning Combinations!");
                }
                if (score_Player1_numb == 18) {
                    allowedPatterns = ["W4", "W2", "diamond"];
                    GameAnimation("New Winning Combinations!");
                };
                break;

            case 10:
                if (score_Player1_numb == 9) {
                    allowedPatterns = ["diamond"];
                    GameAnimation("New Winning Combinations!");
                }
                if (score_Player1_numb == 11) {
                    allowedPatterns = ["vert", "W4"];
                    GameAnimation("New Winning Combinations!");
                }
                if (score_Player1_numb == 13) {
                    allowedPatterns = ["star", "W3"];
                    GameAnimation("New Winning Combinations!");
                };
                break;
        };
        GenerateOriginWinConds();
    };
};

// KI places two times in a row
const KI_PlacesTwoTimesInARow = () => {
    ki.canSetTwoTimes = true;
    GameAnimation("The unknown can set two times!").then(() => {
        win_found = false;
        changePlayer();
        ki.init();
    });
};

// additional change player function for online game mode
// This is from the server to all clients
socket.on('changePlayerTurnDisplay', (currPlayer) => {
    // Change for all clients
    ChangePlayer(currPlayer);
});

const ChangePlayer = (currPlayer) => {
    currentPlayer = currPlayer;

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
};

const ChangePlayerOnNumber = (currPlayer) => { // 1,2,3 instead of PlayerForms

    if (player3_can_set) return;

    if (currPlayer == 1 && personal_GameData.role == 'admin') { // INFO: admin is always player one

        currentPlayer = PlayerData[1].PlayerForm;
        statusText.textContent = `It is your turn ${PlayerData[1].PlayerName}`;
        player1_can_set = true;

    } else if (currPlayer == 1 && personal_GameData.role == 'user') {

        currentPlayer = PlayerData[1].PlayerForm;
        statusText.textContent = `${PlayerData[1].PlayerName}'s turn`;
        player1_can_set = true;

    } else if (currPlayer == 1 && personal_GameData.role == 'blocker') {

        currentPlayer = PlayerData[1].PlayerForm;
        statusText.textContent = `${PlayerData[1].PlayerName}'s turn`;
        player1_can_set = true;
    };

    if (currPlayer == 2 && personal_GameData.role == 'user') { // INFO: user is always player two

        currentPlayer = PlayerData[2].PlayerForm;
        statusText.textContent = `It is your turn ${PlayerData[2].PlayerName}`;
        player1_can_set = false;

    } else if (currPlayer == 2 && personal_GameData.role == 'admin') {

        currentPlayer = PlayerData[2].PlayerForm;
        statusText.textContent = `${PlayerData[2].PlayerName}'s turn`;
        player1_can_set = false;

    } else if (currPlayer == 2 && personal_GameData.role == 'blocker') {

        currentPlayer = PlayerData[2].PlayerForm;
        statusText.textContent = `${PlayerData[2].PlayerName}'s turn`;
        player1_can_set = false;
    };

    if (watch_mode) {
        if (currPlayer == 1) {
            statusText.textContent = `${global_online_games_handler.current_selected_game_instance.game_data.player1_name}'s turn`;
        };

        if (currPlayer == 2) {
            statusText.textContent = `${global_online_games_handler.current_selected_game_instance.game_data.player2_name}'s turn`;
        };

        if (player3_can_set) {
            statusText.textContent = `${global_online_games_handler.current_selected_game_instance.game_data.player3_name}'s turn`;
        };
    };
};

// wheel of fortune after game
wheelOfFortuneAfterGameBtn.addEventListener("click", () => {
    play_door_open_sound();
    play_wheel_theme();

    endGameStatsPopUp.style.display = "none";
    tournaments_scene.style.display = 'none';
    DarkLayerAnimation(wheel_of_fortune_scene, GameField);
    sceneMode.full();

    wheel_of_fortune_handler.open();
});

wheel_scene_close_btn.addEventListener("click", () => {
    playBtn_Audio_2();

    let open_scnene = !wheel_of_fortune_handler.entered_scene ? GameField : gameModeCards_Div;

    DarkLayerAnimation(open_scnene, wheel_of_fortune_scene).then(() => {

        wheel_of_fortune_handler.entered_scene && DisplayPopUp_PopAnimation(skinShop, "flex");

        if (!wheel_of_fortune_handler.entered_scene) {
            DarkLayer.style.display = 'flex';
        };

        setTimeout(() => {
            sceneMode.default();

            if (!wheel_of_fortune_handler.entered_scene) {

                endGameStatsPopUp.style.display = "flex";
                DarkLayer.style.display = "flex";
                playBattleEndTheme();

            } else {
                playShopTheme();
            };

            wheel_of_fortune_handler.entered_scene = null;
        }, 500);
    });
});

wheel_bet_input.addEventListener("input", () => {
    if (wheel_of_fortune_handler.allow_to_spin) {
        wheel_of_fortune_handler.bet = Number(wheel_bet_input.value);
        wheel_of_fortune_handler.init_slots();
    };
});

wheel_bet_input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && wheel_of_fortune_handler.allow_to_spin) {
        wheel_play_btn.click();
    };
});

wheel_play_btn.addEventListener("click", () => {
    if (wheel_of_fortune_handler.bet != 0 && wheel_of_fortune_handler.allow_to_spin || wheel_of_fortune_handler.allow_to_spin && wheel_of_fortune_handler.free_spins_amount > 0) {
        playBtn_Audio_2();
        wheel_of_fortune_handler.spin();

    } else {
        AlertText.textContent = "You have to input a bet";
        DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
    };
});

class WheelOfFortuneHandler {
    constructor() {
        this.bet = 0;

        this.possible_slots = {
            0: { type: "gem", amount: this.bet * 1 / 3 },
            1: { type: "keys", amount: Math.random() * this.bet * 1 / 100 },
            2: { type: "x", amount: Math.random() * 3 },
            3: { type: "skin", amount: 1 },
            4: { type: "free spin", amount: Math.random() * 2 },
            5: { type: "explored_item", amount: undefined }
        };

        this.taken_rewards = {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null
        };

        this.slots = {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null
        };

        this.allow_to_spin = true;
        this.reward = null;
        this.free_spins_amount = 0;

        // from local storage
        this.storage_gems = Number(localStorage.getItem("GemsItem"));
        this.storage_x = Number(localStorage.getItem("ItemX"));
        this.storage_keys = Number(localStorage.getItem("keys"));

        this.entered_scene = null;
    };

    init_scene() {
        try {
            !wheel_right_wrapper_header.querySelector(".KEYicon_skinShop") && wheel_right_wrapper_header.appendChild(CurrencySkinShopDisplay.cloneNode(true));
            wheel_right_wrapper_header.querySelector(".exploredItems_bookBtn").addEventListener("click", () => {
                DisplayPopUp_PopAnimation(exploredItems_PopUp, "flex", false);
                exploredItems_preview(0);
            });

            wheel_right_wrapper_header.querySelector(".KEYicon_skinShop").textContent = this.storage_keys;
            wheel_right_wrapper_header.querySelector(".xIcon_skinShop").textContent = this.storage_x;
            wheel_right_wrapper_header.querySelector(".gemsIcon_skinShop").textContent = this.storage_gems;

        } catch (error) {
            console.log(error);
        };
        // wheel_right_wrapper_header.querySelector(".CurrencySkinShopDisplay").appendChild(storeIcon.cloneNode(true));
    };

    open() {
        this.init_slots();
    };

    init_slots() {
        [...wheel_slot_contents].map((slot, i) => {

            let rnd_index = Math.floor(Math.random() * Object.keys(this.possible_slots).length);
            let slot_reward = this.possible_slots[rnd_index];

            this.init_slot_content(slot, slot_reward, i);
        });
    };

    init_slot_content_gem(slot_content, slot_reward, slot_index) {
        slot_content.classList.add("fa-solid");
        slot_content.classList.add("fa-gem");

        wheel_left_wrapper_text_els[slot_index].textContent = `... ${Math.floor(1 + (1.5 * this.bet * 0.9))}+ gems`;
    };

    init_slot_content(slot_content, slot_reward, slot_index) {
        slot_content.textContent = null;
        slot_content.className = "wheel_slot_content";
        slot_content.style.opacity = "1";
        slot_content.querySelector("img") && slot_content.querySelector("img").remove();

        slot_content.setAttribute("slot_type", slot_reward.type);

        switch (slot_reward.type) {

            case "gem":
                this.init_slot_content_gem(slot_content, slot_reward, slot_index);
                break;

            case "keys":

                slot_content.classList.add("fa-solid");
                slot_content.classList.add("fa-key");

                wheel_left_wrapper_text_els[slot_index].textContent = `... ${ Math.floor(1 + (0.035 * this.bet))}+ keys`;
                break;

            case "x":

                slot_content.classList.add("fa-solid");
                slot_content.classList.add("fa-x");

                wheel_left_wrapper_text_els[slot_index].textContent = `... ${Math.floor(1 + (1 * this.bet / 300))}+ X`;
                break;

            case "skin":

                if (this.bet < 200) {
                    this.init_slot_content_gem(slot_content, slot_reward, slot_index);
                    return;
                };

                let possible_skins = this.check_skins();
                let rnd_skin = possible_skins[Math.floor(Math.random() * Object.keys(possible_skins).length)];

                slot_content.classList.add("fa-solid");
                slot_content.classList.add(`fa-${rnd_skin}`);
                slot_content.setAttribute("reward_skin_name", rnd_skin);

                wheel_left_wrapper_text_els[slot_index].innerHTML = `... the <i class="fas fa-${rnd_skin}"></i> skin`;
                break;

            case "free spin":
                let img = document.createElement("img");
                img.src = "assets/game/sun-spear.svg";

                slot_content.appendChild(img);
                wheel_left_wrapper_text_els[slot_index].innerHTML = `... <img src="assets/game/sun-spear.svg"> free spins`;
                break;

            case "explored_item":

                slot_content = this.explored_items_reward_handle(slot_content, slot_index);
                break;
        };
    };

    check_skins() {
        let skins = JSON.parse(localStorage.getItem("Skins"));
        let skin_names = Object.keys(skins);
        let reward_skins_list = [...reward_skins].map(skin => skin.getAttribute("name"));
        // console.log(reward_skins_list, skins, skin_names);

        return reward_skins_list.filter(skin => !skins[skin]);
    };

    explored_items_reward_handle(slot_content, slot_index) {
        let items = JSON.parse(localStorage.getItem("ExploredItems"));
        let forbidden_items = ["abandonedEye"];

        if (this.bet < 400) {
            forbidden_items.push("encryptedWriting");
            forbidden_items.push("asteroid");
        };
        if (this.bet < 100) {
            forbidden_items.push("diamonds");
        };

        items = Object.keys(items).filter(item => !forbidden_items.includes(item));

        let rnd_index = Math.floor(Math.random() * Object.keys(items).length);
        let rnd_item = items[rnd_index];

        let img = document.createElement("img");
        img = display_explored_item_after_storage_name(rnd_item, img);
        slot_content.appendChild(img);
        slot_content.setAttribute("explored_item_type_for_reward", rnd_item);

        wheel_left_wrapper_text_els[slot_index].innerHTML = `<p>...</p>`;
        wheel_left_wrapper_text_els[slot_index].appendChild(img.cloneNode(true));
        // wheel_left_wrapper_text_els[slot_index].textContent += `${rnd_item}`;

        return slot_content;
    };

    async spin() {
        const can_spin = this.can_spin();

        if (!can_spin) {
            AlertText.textContent = "Your bet is too high";
            DisplayPopUp_PopAnimation(alertPopUp, "flex", true);
            return;
        };

        wheel_play_btn.disabled = true;
        wheel_play_btn.blur();
        wheel_play_btn.classList.add('disabled');
        this.allow_to_spin = false;

        await this.update_gems();
        await this.spin_animation();
        const reward_el = this.find_reward();
        await this.reward_animation(reward_el);
        let amount = this.confirm_reward(reward_el);
        // reward_animator_item_amount.textContent = amount;
        await open_reward_animator(reward_el, amount);
        await this.reward_fly(reward_el);
        await this.wheel_reset();

        wheel_play_btn.disabled = false;
        wheel_play_btn.focus();
        wheel_play_btn.classList.remove('disabled');
        this.allow_to_spin = true;
    };

    can_spin() {
        return (this.bet <= this.storage_gems) ? true : false;
    };

    update_gems() {
        if (this.free_spins_amount > 0) {
            this.free_spins_amount--;
            wheel_free_spin_amount_el.textContent = this.free_spins_amount;

        } else {
            this.storage_gems = this.storage_gems - this.bet;
            localStorage.setItem("GemsItem", this.storage_gems);

            wheel_right_wrapper_header.querySelector(".gemsIcon_skinShop").textContent = this.storage_gems;
            gemsIcon_skinShop.textContent = this.storage_gems;
            gemsIcon.textContent = this.storage_gems;
        };
    };

    async spin_animation() {
        return new Promise(resolve => {
            const rnd_spin_time = Math.random() * 4 + 3;
            let clack_interval = null;

            let totalRotation = 0;
            const startTime = performance.now();
            const duration = rnd_spin_time * 1000;
            const randomOffset = Math.random() * 360;

            function animate(time) {
                const elapsed = time - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutSine(progress);
                const rotation = easedProgress * 360 * 5;

                const currentRotation = totalRotation + rotation + randomOffset;
                wheel.style.transform = `rotate(${currentRotation}deg)`;

                if (progress < 1) {
                    requestAnimationFrame(animate);

                } else {
                    clearInterval(clack_interval);
                    clack_interval = null;
                    totalRotation += rotation;
                    resolve();
                };
            };

            clack_interval = setInterval(() => {
                play_clack_sound();
            }, 100);

            requestAnimationFrame(animate);
        });
    };

    find_reward() {
        let array = [...wheel_slot_contents].filter((element) => {
            const aRect = element.getBoundingClientRect();
            const bRect = wheel_stick.getBoundingClientRect();

            return !(((aRect.top + aRect.height) < (bRect.top)) ||
                (aRect.top > (bRect.top + bRect.height)) ||
                ((aRect.left + aRect.width) < bRect.left) ||
                (aRect.left > (bRect.left + bRect.width)));
        });

        if (array.length > 1) {
            const bRect = wheel_stick.getBoundingClientRect();
            array.sort((a, b) => {
                const aRect = a.getBoundingClientRect();
                const bRectA = b.getBoundingClientRect();
                return getDistance(aRect, bRect) - getDistance(bRectA, bRect);
            });
        };

        // console.log(array);
        return array[0];
    };

    reward_animation(reward_item) {
        return new Promise(resolve => {
            // console.log(reward_item);

            reward_item.style.animation = `reward_found 1s linear`;
            reward_item.parentElement.style.animation = `reward_found_parent_ani 1s linear`;
            reward_item.addEventListener("animationend", () => {
                reward_item.style.animation = `unset`;
                reward_item.parentElement.style.animation = `unset`;
                resolve();
            });
        });
    };

    reward_fly(el) {
        return new Promise(resolve => {
            let destination;
            let is_free_spin = false;

            switch (el.getAttribute("slot_type")) {

                case "explored_item":
                    destination = wheel_right_wrapper_header.querySelector(".exploredItems_bookBtn").getBoundingClientRect();
                    break;

                case "skin":
                    destination = headerUserBtn.getBoundingClientRect();
                    break;

                case "x":
                    destination = wheel_right_wrapper_header.querySelector(".XBtn").getBoundingClientRect();
                    break;

                case "gem":
                    destination = wheel_right_wrapper_header.querySelector(".Gem_Wrapper").getBoundingClientRect();
                    break;

                case "keys":
                    destination = wheel_right_wrapper_header.querySelector(".KEYICON_Wrapper").getBoundingClientRect();
                    break;

                case "free spin":
                    is_free_spin = true;
                    destination = wheel_free_spin_wrapper.getBoundingClientRect();
                    break;
            };

            el.classList.add("floating_reward");
            document.body.appendChild(el.cloneNode(true));
            let bodyEl = document.body.querySelectorAll(".floating_reward")[1];
            let elRect = el.getBoundingClientRect();

            bodyEl.classList.remove("wheel_slot_content");
            bodyEl.style.zIndex = `1`;
            bodyEl.style.position = `absolute`;
            bodyEl.style.top = `calc(${elRect.top}px + 12vh)`;
            bodyEl.style.right = `${elRect.right}px`;
            bodyEl.style.bottom = `${elRect.bottom}px`;
            bodyEl.style.left = `${elRect.left}px`;
            el.style.opacity = "0";

            setTimeout(() => {
                bodyEl.classList.add("body_el1");

                bodyEl.style.top = `${destination.top}px`;
                bodyEl.style.right = `${destination.right}px`;
                bodyEl.style.bottom = `${destination.bottom}px`;
                bodyEl.style.left = `${destination.left}px`;

                if (is_free_spin) {
                    this.free_spins_amount = 1 + Math.floor(this.free_spins_amount + (1 * this.bet / 200));
                    wheel_free_spin_amount_el.textContent = this.free_spins_amount;
                };

                setTimeout(() => {
                    bodyEl.remove();
                    resolve();
                }, 1000);
            }, 200);
        });
    };

    wheel_reset() {
        return new Promise(resolve => {
            wheel.style.opacity = "0";

            setTimeout(() => {
                this.init_slots();
                wheel.style.opacity = "1";
                resolve();
            }, 1000);
        });
    };

    confirm_reward(reward_el) {
        let type = reward_el.getAttribute("slot_type")
        let amount = 1;

        switch (type) {

            case "explored_item":
                let explored_item_type = reward_el.getAttribute("explored_item_type_for_reward");
                amount = this.confirm_reward_explored_item(explored_item_type);
                break;

            case "skin":
                this.confirm_reward_skin(reward_el);
                break;

            case "x":
                amount = this.confirm_reward_currency(reward_el, type);
                break;

            case "gem":
                amount = this.confirm_reward_currency(reward_el, type);
                break;

            case "keys":
                amount = this.confirm_reward_currency(reward_el, type);
                break;
        };

        return amount;
    };

    confirm_reward_currency(reward_el, type) {
        let amount;

        switch (type) {

            case "x":
                let strg_x = Number(localStorage.getItem("ItemX"));
                let new_amount = Math.floor(1 + strg_x + (1 * this.bet / 300));

                this.storage_x = new_amount;
                amount = new_amount - strg_x;
                localStorage.setItem("ItemX", this.storage_x);

                break;

            case "gem":
                let strg_gem = Number(localStorage.getItem("GemsItem"));
                let new_amount_gem = Math.floor(strg_gem + (1.5 * this.bet * 0.9));

                this.storage_gems = new_amount_gem;
                amount = new_amount_gem - strg_gem;
                localStorage.setItem("GemsItem", this.storage_gems);
                break;

            case "keys":
                let strg_key = Number(localStorage.getItem("keys"));
                let new_amount_key = Math.floor(1 + strg_key + (0.035 * this.bet));

                this.storage_keys = new_amount_key;
                amount = new_amount_key - strg_key;
                localStorage.setItem("keys", this.storage_keys);
                break;
        };

        this.init_scene();
        return amount;
    };

    confirm_reward_skin(reward_el) {
        selected_skin = {
            name: reward_el.getAttribute("reward_skin_name"),
            skin_type: 'skin',
            price: 'none',
            price_type: 'none'
        };
        buySkin();
    };

    confirm_reward_explored_item(type) {
        let item_storage = JSON.parse(localStorage.getItem("ExploredItems"));
        let item_amount = item_storage[type];
        let new_item_amount;

        switch (type) {

            case "asteroid":
                new_item_amount = Math.floor(item_amount + (1 * this.bet / 500));
                break;

            case "minerals":
                new_item_amount = Math.floor(item_amount + (1 * this.bet / 3));
                break;

            case "ore":
                new_item_amount = Math.floor(item_amount + (1 * this.bet / 3));
                break;

            case "diamonds":
                new_item_amount = Math.floor(item_amount + (1 * this.bet / 15));
                break;

            case "encryptedWriting":
                new_item_amount = Math.floor(item_amount + (1 * this.bet / 500));
                break;

            case "abandonedEye":
                new_item_amount = Math.floor(item_amount + (1 * this.bet / 3000));
                break;
        };

        item_storage[type] = new_item_amount;
        localStorage.setItem("ExploredItems", JSON.stringify(item_storage));

        return new_item_amount - item_amount;
    };
};

const wheel_of_fortune_handler = new WheelOfFortuneHandler();
wheel_of_fortune_handler.init_scene();

// review mode
class reviewModeHandler {
    constructor(entry, entry_opened_from_scene_x) {
        this.entry = entry;
        this.moves = entry.moves;
        this.curr_move_idx = 0;
        this.curr_move_val = 0;

        this.list = review_moves_list;
        this.cells = [...cellGrid.children];

        this.blocker = null;
        this.total_moves_length = this.moves.length + entry.cells_blocked_by_blocker.length

        this.board
        this.bitboard = BigInt(0b0);
        this.patterns = []; // patterns as bigint binarys
        this.original_patterns = []; // patterns as arrays 
        this.win_patterns_on_nth_move = []; // associate every pattern on their move index that realised them

        this.settings = {
            'allow_music': 'true'
        };

        this.levelicons = {
            0: "assets/game/wolf-head.svg",
            1: "assets/game/winged-sword.svg",
            2: "assets/game/warlock-eye.svg",
            3: "assets/game/sunken-eye.svg",
            4: "assets/game/ore.svg",
            5: "assets/game/minerals.svg",
            6: "assets/game/crystal-eye.svg",
            7: "assets/game/fangs.svg",
            8: "assets/game/bleeding-eye.svg",
            9: "assets/game/crystal-bars.svg",
            10: "assets/game/battle-axe.svg",
            11: "assets/game/tribal-mask.svg",
            12: "assets/game/shattered-sword.svg",
            13: "assets/game/gluttonous-smile.svg",
            14: "assets/game/book-cover.svg"
        };

        this.entry_opened_from_scene_x = entry_opened_from_scene_x;
    };

    init() {
        // console.log(this.entry);

        this.init_patterns_list(this.entry);

        this.events();
        this.init_settings();

        this.init_doc(this.entry);
        this.init_game_field_icon(this.entry);
        this.init_player_icon(this.entry);
        this.init_player(this.entry);
        this.init_field(this.entry);

        this.entry.moves.length > 0 && this.init_moves_list(this.entry, this.moves);
        this.entry.moves.length > 0 && this.current_move(this.entry);
    };

    init_settings() {
        let sett0 = localStorage.getItem('sett-MusicInReview');

        if (sett0 == null) {
            localStorage.setItem('sett-MusicInReview', 'true');

        } else {
            this.settings['allow_music'] = sett0;
        };
    };

    init_patterns_list(entry) {
        this.original_patterns = entry.patterns_used.map(obj => obj.indexes);
        this.patterns = convertToBinary(this.original_patterns);
        this.win_patterns_on_nth_move = entry.patterns_used.map(obj => obj.on_nth_move);

        if (entry.cells_blocked_by_blocker.length > 0) {

            // in blocker combat mode, every 3rd move is a blockage move
            this.win_patterns_on_nth_move = this.win_patterns_on_nth_move.map(move => {
                let n_blockages = (move / 3) + 1;

                return move + n_blockages
            });
        };
    };

    create_bitmap() {
        let board = [...review_mode_handler.cells].map(el => el.textContent.length > 0 || el.classList.contains('fa-solid') ? 1 : 0);

        this.bitboard = BigInt(0b0);
        for (const [i, val] of board.entries()) val && (this.bitboard |= (BigInt(1) << BigInt(i)));
    };

    check_winnner() {
        for (const [i, pattern] of this.patterns.entries()) {

            if ((this.bitboard & pattern) == pattern) {
                this.blacken_cells(this.original_patterns[i], this.win_patterns_on_nth_move[i]);
            };
        };
    };

    blacken_cells(pattern, on_nth_move) {
        // console.log(pattern);

        if (!this.entry.kill_cells_after_point) { // only blacken cells of pattern

            for (const i of pattern) {
                this.blacken_cell(this.cells[i]);
            };

        } else {
            this.moves.map((i, index) => { // blacken all cells on the field
                if (index > on_nth_move) return;

                if (this.cells[i].textContent.length > 0 || this.cells[i].classList.contains('fa-solid')) {
                    this.blacken_cell(this.cells[i]);
                };
            });
        };
    };

    blacken_cell(cell) {
        cell.style.background = `white`;
        cell.style.color = `white`;

        setTimeout(() => {
            cell.textContent = ``;
            cell.className = 'cell';
        }, 200);
    };

    events() {
        review_mode_back_btn.removeEventListener('click', review_mode_back_btn.ev);
        review_mode_forth_btn.removeEventListener('click', review_mode_forth_btn.ev);

        review_mode_back_btn.addEventListener('click', review_mode_back_btn.ev = () => {
            try {
                this.curr_move_idx > 0 && this.curr_move_idx--;
                this.current_move(this.entry);
                centerCurrentMove((window.innerHeight / 17) / -1);
                playBtn_Audio_2();
            } catch (error) {
                console.log(error);
            };
        });

        review_mode_forth_btn.addEventListener('click', review_mode_forth_btn.ev = () => {
            try {
                this.curr_move_idx < this.total_moves_length - 1 && this.curr_move_idx++;
                this.current_move(this.entry);
                centerCurrentMove(window.innerHeight / 17);
                playBtn_Audio_2();
            } catch (error) {
                console.log(error);
            };
        });

        review_moves_wrapper.addEventListener('keydown', (e) => {
            if (e.code == "ArrowDown") {
                e.preventDefault();
                review_mode_forth_btn.click();
            };

            if (e.code == "ArrowUp") {
                e.preventDefault();
                review_mode_back_btn.click();
            };
        });

        review_mode_start_move_btn.removeEventListener('click', review_mode_start_move_btn.ev);
        review_mode_end_move_btn.removeEventListener('click', review_mode_end_move_btn.ev);

        review_mode_start_move_btn.addEventListener('click', review_mode_start_move_btn.ev = () => {
            try {
                this.curr_move_idx = 0;
                this.current_move(this.entry);
                centerCurrentMove((this.list.scrollTop) / -1);
                playBtn_Audio_2();
            } catch (error) {
                console.log(error);
            };
        });

        review_mode_end_move_btn.addEventListener('click', review_mode_end_move_btn.ev = () => {
            try {
                this.curr_move_idx = this.total_moves_length - 1
                this.current_move(this.entry);
                centerCurrentMove(this.list.scrollHeight);
                playBtn_Audio_2();
            } catch (error) {
                console.log(error);
            };
        });

        review_mode_question_btn.removeEventListener('click', review_mode_question_btn.ev);
        review_mode_question_btn.addEventListener('click', review_mode_question_btn.ev = () => {
            let QA_box = new QABOX(4, ['W: winning move', 'L: misleading move', 'N: neutral move', 'B: blocker move'], { 'W': 'green', 'L': 'red', 'N': 'slategray', 'B': 'slategrey' }, { 'W': [0, 0.5, 0, 0], 'N': [0, 0.5, 0, 0], 'L': [0, 0.5, 0, 0], 'B': [0, 0.5, 0, 0] });
            QA_box.open();
        });
    };

    init_doc(entry) {
        CloseOnlinePopUps(true);

        cellGrid.style.opacity = '1';
        document.querySelector('.GameField-info-corner').style.display = "none";
        OnlineChat_btn.style.display = "none";
        GameFieldHeaderUnder.style.display = 'none';
        AdvantureMode_SpellDisplay.style.display = 'none';
        MaxAmountOfMovesGameDisplay.style.display = 'none';
        chooseWinnerWindowBtn.style.display = 'none';
        GiveUp_btn.style.display = 'none';
        restartBtn.style.display = 'none';
        cellGrid.style.display = 'grid';
        cellGrid.style.pointerEvents = 'none';
        lobbyFooter.style.background = "#15171a";
        lobbyFooter.style.width = "100%";
        review_moves_wrapper.style.display = 'flex';
        review_mode_action_wrapper.style.display = 'flex';
        review_mode_game_footer.style.display = 'flex';
        statusText.style.display = 'flex';
        watching_count_el.style.display = 'none';
        watching_count_el.textContent = `watching: None`;
        YouWatchGameEl.style.display = 'none';
        TrainingArenaDifficutlyModeGameDisplay.style.display = 'none';

        pointsToAchieve_ScoreBar.forEach(textEl => {
            textEl.style.display = 'none';
        });

        scorePlayer1.style.display = 'none';
        scorePlayer2.style.display = 'none';

        setTimeout(() => {
            review_mode_handler.list.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 600);

        gameLog_btn.classList.remove('blured');

        player1_score_bar_wrapper.style.background = `linear-gradient(105deg, #3f51b5 ${0}%, transparent ${5}%)`;
        player2_score_bar_wrapper.style.background = `linear-gradient(-105deg, darkred ${0}%, transparent ${5}%)`;

        this.blocker = entry.blocker_name.trim().length > 0 ? entry.blocker_name : 'None';

        game_footer_blocker_used_el.textContent = `${this.blocker}`;
        game_footer_field_mode_el.textContent = `${entry.field_mode}`;
        game_footer_game_type_el.textContent = `${entry.game_mode}`;
        game_footer_date.textContent = `${formatDate(entry.match_date)}`;
        game_footer_winner_el.textContent = `${entry.p1_points > entry.p2_points ? entry.p1_name : entry.p2_name}`;

        pointsToAchieve_ScoreBar[0].textContent = `/ ${entry.points_to_win}`;
        pointsToAchieve_ScoreBar[1].textContent = `/ ${entry.points_to_win}`;

        ChangeGameBG(entry.bg1, entry.bg2);
        PauseMusic();

        if (this.settings['allow_music'] == 'true') {
            curr_music_name = document.querySelector(`audio#${entry.music_name}`);
            CreateMusicBars(curr_music_name);
        };
    };

    init_game_field_icon(entry) {
        if (Object.keys(entry.tournament_data || {}).length > 0) {
            SetGameFieldIconForCurrentField(entry.field_size[0], entry.field_index, false, true);
            return;
        };

        if (entry.p2_id > 0) {
            costumLevelIcon = this.levelicons[entry.level_icon];
            SetGameFieldIconForCurrentField(entry.field_size[0], entry.field_index, true);
        } else {
            SetGameFieldIconForCurrentField(entry.field_size[0], entry.field_index, false);
        };
    };

    init_player_icon(entry) {
        let p1_icon_wrapper = document.createElement('i');
        let p2_icon_wrapper = document.createElement('i');

        if (entry.p1_icon.length > 1) {
            DisplayPlayerIcon_at_el(p1_icon_wrapper, entry.p1_icon, entry.p1_color, entry.p1_icon);

        } else {
            p1_icon_wrapper.textContent = `- ${entry.p1_icon}`;
        };

        if (entry.p2_icon.length > 1) {
            DisplayPlayerIcon_at_el(p2_icon_wrapper, entry.p2_icon, entry.p2_color, entry.p2_icon);

        } else {
            p2_icon_wrapper.textContent = `- ${entry.p2_icon}`;
        };

        namePlayer1.textContent = entry.p1_name;
        namePlayer2.textContent = entry.p2_name;

        p1_icon_wrapper.classList.add('p_icon_wrapper');
        p2_icon_wrapper.classList.add('p_icon_wrapper');

        namePlayer1.append(p1_icon_wrapper);
        namePlayer2.append(p2_icon_wrapper);
    };

    init_player(entry) {

        player1_score_bar_wrapper.style.background = `linear-gradient(105deg, #3f51b5 ${100}%, transparent ${5}%)`;
        player2_score_bar_wrapper.style.background = `linear-gradient(-105deg, darkred ${100}%, transparent ${5}%)`;

        // Player Name
        PlayerData[1].PlayerName = entry.p1_name;
        PlayerData[2].PlayerName = entry.p2_name;

        // Player Form
        PlayerData[1].PlayerForm = entry.p1_icon.toUpperCase();
        PlayerData[2].PlayerForm = entry.p2_icon.toUpperCase();

        points_to_win = entry.points_to_win;
    };

    init_field(entry) {
        xCell_Amount = entry.field_size[0];
        yCell_Amount = entry.field_size[1];

        CreateOptions();
        CalculateBoundaries();
        CreateField();

        this.cells = [...cellGrid.children];

        setTimeout(() => {
            const cellWidth = this.cells[0].getBoundingClientRect().width;
            this.cells.forEach(cell => {
                cell.style.width = `${cellWidth}px`;
                cell.style.height = `${cellWidth}px`;
            });
        }, 500);

        if (entry.field_mode == 'Boneyard') {
            entry.boneyard_arr.map((index, i) => {
                this.cells[index].style.background = 'white';
            });
        };
    };

    init_moves_list(entry, moves) {
        this.list.textContent = null;

        let j = 0;
        let k = 0;
        let move_lenght_sum = moves.length + entry.cells_blocked_by_blocker.length;

        for (let i = 0; i < move_lenght_sum; i++) {
            let move = moves[k];

            let player_index = i % 3;
            let normal_player_index = i % 2;
            let player_x_move;
            let move_idx;

            if (entry.field_mode === 'Blocker Combat') {

                if (player_index === 0) {
                    player_x_move = entry.p1_name;
                    move_idx = move;
                    k++;

                } else if (player_index === 1) {
                    player_x_move = entry.p2_name;
                    move_idx = move;
                    k++;

                } else if (player_index === 2) {
                    player_x_move = entry.blocker_name;
                    move_idx = entry.cells_blocked_by_blocker[j];
                    j++;
                };

            } else {
                player_x_move = normal_player_index == 0 ? entry.p1_name : entry.p2_name;
                move_idx = move;
                k++;
            };

            this.create_list_item(i, player_x_move, move_idx, j, k);
        };
    };

    create_list_item(i, player_x_move, move, blockages_in, k) { // k: player moves counter
        let bot_move = false;
        let state = {};
        blockages_in = blockages_in + 1;
        // console.log(i, player_x_move, move, blockages_in, k)

        let item = document.createElement('li');
        let wrapper1 = document.createElement('div');
        let wrapper2 = document.createElement('div');
        let state_el = document.createElement('p');
        let data_el = document.createElement('p');

        data_el.textContent = `${i + 1}: ${player_x_move} | idx: ${move}`;

        if (player_x_move != this.entry.p1_name && player_x_move != this.entry.p2_name) {
            bot_move = true;
            item.classList.add('bot_move_entry');
            state['bin'] = 0b011

        } else {

            if (this.win_patterns_on_nth_move.includes(i)) {
                state['bin'] = 0b10

            } else if (this.win_patterns_on_nth_move.includes(i + 1) || this.win_patterns_on_nth_move.includes(i + 2) && this.entry.blocker) {
                state['bin'] = 0b01;

            } else {
                state['bin'] = 0b0;
            };
        };

        // determine move state | evaluate
        if ((state['bin'] & 0b11) === 0b10) {
            state['color'] = 'green';
            state['text'] = 'W';

        } else if ((state['bin'] & 0b11) === 0b00) {
            state['color'] = 'slategray';
            state['text'] = 'N';

        } else if (state['bin'] == 0b011) {
            state['color'] = 'slategrey';
            state['text'] = 'B';

        } else {
            state['color'] = 'red';
            state['text'] = 'L';
        };

        state_el.style.color = state['color'];
        state_el.textContent = state['text'];

        wrapper1.append(data_el);
        wrapper2.append(state_el);
        item.append(wrapper1);
        item.append(wrapper2);
        this.list.append(item);
    };

    current_move(entry) {
        this.curr_move_val = this.moves[this.curr_move_idx];

        this.moves.map((move, i) => {
            this.cells[move].textContent = null;
            this.cells[move].className = 'cell';
            this.cells[move].style.color = 'white';
        });

        this.cells.map((val, i, arr) => {
            val.style.transition = 'background 0.2s linear';
            let move = Number(val.getAttribute('cell-index'));
            !entry.boneyard_arr.includes(move) && (val.style.background = 'unset');
        });

        [...this.list.children].forEach(el => {
            el.style.borderLeft = `none`;
            el.setAttribute("current", "true");
        });

        [...this.list.children][this.curr_move_idx].style.borderLeft = `0.3vh solid #009fff`;
        [...this.list.children][this.curr_move_idx].setAttribute("current", "true");

        let j = 0;
        let k = 0;
        let move_lenght_sum = this.moves.length + entry.cells_blocked_by_blocker.length;

        for (let i = 0; i < move_lenght_sum; i++) {
            if (i > this.curr_move_idx) break;

            let move = this.moves[k];

            let player_index = i % 3;
            let normal_player_index = i % 2;
            let player_x_move;
            let player_x_color;
            let player_x_name;
            let move_idx;

            if (entry.field_mode === 'Blocker Combat') {

                if (player_index === 0) {
                    player_x_move = entry.p1_icon;
                    player_x_color = entry.p1_color;
                    player_x_name = entry.p1_name;
                    move_idx = move;
                    k++;

                } else if (player_index === 1) {
                    player_x_move = entry.p2_icon;
                    player_x_color = entry.p2_color;
                    player_x_name = entry.p2_name;
                    move_idx = move;
                    k++;

                } else if (player_index === 2) {
                    this.cells[entry.cells_blocked_by_blocker[j]].style.background = 'white';
                    j++;

                    statusText.textContent = `${entry.blocker_name} blocks`;
                    continue;
                };

            } else {
                player_x_move = normal_player_index == 0 ? entry.p1_icon : entry.p2_icon;
                player_x_color = normal_player_index == 0 ? entry.p1_color : entry.p1_color;
                player_x_name = normal_player_index == 0 ? entry.p1_name : entry.p2_name;

                move_idx = move;
                k++;
            };

            statusText.textContent = `${player_x_name}'s turn`;

            if (player_x_move.length > 1) {
                DisplayPlayerIcon_at_el(this.cells[move_idx], player_x_move, player_x_color, player_x_move);
                this.cells[move_idx].classList.add('cell');

            } else {
                this.cells[move_idx].textContent = player_x_move;
                this.cells[move_idx].style.color = player_x_color;
            };
        };

        this.create_bitmap();
        this.check_winnner();
    };
};

function centerCurrentMove(numb) {
    review_mode_handler.list.scrollTo({
        top: review_mode_handler.list.scrollTop + numb,
        behavior: 'smooth'
    });
};