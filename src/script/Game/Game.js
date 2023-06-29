const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restart-btn');

let running = false;

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

function initializeGame(field) {
    let fieldTitle = field.getAttribute('title');
    let fieldIndex = field.getAttribute('index');

    console.log(fieldIndex, Fields)

    // reset score
    score_Player1_numb = 0;
    score_Player2_numb = 0;

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
    const cells = document.querySelectorAll('.cell');

    // Adds click event to every single cell and starts game
    cells.forEach(cell => {
        cell.addEventListener('click', cellCicked);
    });
    // set up restart button
    restartBtn.addEventListener('click', restartGame);
    running = true;

    initializeDocument(field, fieldIndex, fieldTitle);

    Start_Blocker();
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
    // Init Player 
    initializePlayers();

    console.log(WinConditions)
    console.log(options)
};

function initializePlayers() {
    scorePlayer1.textContent = score_Player1_numb;
    scorePlayer2.textContent = score_Player2_numb;

    namePlayer1.textContent = curr_name1;
    namePlayer2.textContent = curr_name2;

    PlayerData[1].PlayerName = curr_name1;
    PlayerData[2].PlayerName = curr_name2;

    currentName = PlayerData[1].PlayerName;
    currentPlayer = PlayerData[1].PlayerForm;

    // set up statusText
    statusText.textContent = `${currentName}'s turn`;
};

function cellCicked() {
    if (this.classList == "cell") { // cell is alive and useable
        const cellIndex = this.getAttribute("cell-index");

        // check if cell is already drawn or the game is running
        if (options[cellIndex] != "" || !running) {
            return;
        };

        updateCell(this, cellIndex);
        checkWinner();

    };
};

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
};

function changePlayer() {
    currentPlayer = (currentPlayer == PlayerData[1].PlayerForm) ? PlayerData[2].PlayerForm : PlayerData[1].PlayerForm;
    currentName = (currentName == PlayerData[1].PlayerName) ? PlayerData[2].PlayerName : PlayerData[1].PlayerName;
    statusText.textContent = `${currentName}'s turn`;
};

function checkWinner() {
    let roundWon = false;
    let Player1_won = false; // check if x has won
    let Player2_won = false; // check if o has won

    for (let i = 0; i < WinConditions.length; i++) {
        const condition = WinConditions[i];

        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];
        let cellD = options[condition[3]];
        let cellE = options[condition[4]]; // fifth block

        if (cellE == undefined) { // if pattern with 4 blocks

            if (cellA == "" || cellB == "" || cellC == "" || cellD == "") {
                continue
            };

            if (cellA == cellB && cellB == cellC && cellC == cellD) {
                roundWon = true;

                console.log(cellA, cellB, cellC, cellD)

                // check wether X or O has won
                if (cellA == "X") {
                    Player1_won = true;

                } else if (cellA == "O") {
                    Player2_won = true;
                };

                break;
            };

        } else { // pattern with 5 blocks
            if (cellA == "" || cellB == "" || cellC == "" || cellD == "" || cellE == "") {
                continue
            };

            if (cellA == cellB && cellB == cellC && cellC == cellD && cellD == cellE) {
                roundWon = true;

                console.log(cellA, cellB, cellC, cellD, cellE)

                // check wether X or O has won
                if (cellA == "X") {
                    Player1_won = true;

                } else if (cellA == "O") {
                    Player2_won = true;
                };

                break;
            };
        };
    };

    if (roundWon) {
        running = false;

        if (Player1_won == true) {

            score_Player1_numb++;
            scorePlayer1.textContent = score_Player1_numb;

            Player1_won = false;

        } else if (Player2_won == true) {

            score_Player2_numb++;
            scorePlayer2.textContent = score_Player2_numb;

            Player2_won = false;
        };

        let grid = [...cellGrid.children];
        // Make used cells die
        for (cell of grid) {

            if (cell.textContent == "X" || cell.textContent == "O") {
                single_CellBlock(cell);
            };
        };

        setTimeout(() => {
            running = true;

            if (currentPlayer == "X" && curr_mode == GameMode[1].opponent) {
                KI_Action();

            } else {
                changePlayer();
            };

        }, 1000);

    } else if (!options.includes("")) {
        statusText.textContent = "Draw";
        running = false;

    } else {
        if (currentPlayer == "X" && curr_mode == GameMode[1].opponent) {
            KI_Action();

        } else {
            changePlayer();
        };
    };
};

function restartGame() {
    changePlayer();

    NxN_field.forEach(field => {
        if (field.getAttribute('title') == curr_field) {
            initializeGame(field);
        };
    });
};

// Block used cells after a win
function single_CellBlock(cell) {
    cell.classList = "cell death-cell";
    cell.style.animation = "blackenCell 2s forwards"; // Animation aktivieren
    cell.textContent = null;
    cell.removeEventListener('click', cellCicked);

    // Bug Fix
    CreateOptions();
};

// KI sets O somewhere
function KI_Action() {
    let cells = [...cellGrid.children];

    changePlayer();

    // remove access to set X from Player1 
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
        cell.style.cursor = 'default';
    });

    // KI sets O
    setTimeout(() => {
        let randomIndex = Math.floor(Math.random() * cells.length);
        let availibeCells = [];

        console.log(cells[randomIndex].style.backgroundColor)
        console.log(cells[randomIndex].classList)
        console.log(cells[randomIndex].className)

        cells.forEach(cell => {
            if (cell.classList.length <= 1 && cell.textContent == "") {
                availibeCells.push(cell.getAttribute('cell-index'));
            };
        });

        if (availibeCells.length >= 1) {
            let randomCellIndex = Math.floor(Math.random() * availibeCells.length);

            let rnd_cell = availibeCells[randomCellIndex];
            let index = cells[rnd_cell].getAttribute('cell-index');

            cells[rnd_cell].textContent = currentPlayer;
            options[index] = currentPlayer;
        };

        checkWinner();
    }, 500);

    setTimeout(() => {
        // remove access to set X from Player1 
        cells.forEach(cell => {
            cell.addEventListener('click', cellCicked);
            cell.style.cursor = 'pointer';
        });
    }, 700);
};