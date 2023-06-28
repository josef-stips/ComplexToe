const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restart-btn');

let currentPlayer = "X";
let running = false;

let curr_mode = "";
let curr_field = "";

function initializeGame(field) {
    let fieldTitle = field.getAttribute('title');
    let fieldIndex = field.getAttribute('index');

    console.log(fieldIndex, Fields)

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
    scorePlayer1.textContent = "0"
    scorePlayer2.textContent = "0";
    // set up statusText
    statusText.textContent = `${currentPlayer}'s turn`;

    console.log(WinConditions)
    console.log(options)
};

function cellCicked() {
    const cellIndex = this.getAttribute("cell-index");

    // check if cell is already drawn or the game is running
    if (options[cellIndex] != "" || !running) {
        return;
    };

    updateCell(this, cellIndex);
    checkWinner();
};

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
};

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
};

function checkWinner() {
    let roundWon = false;

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
                break;
            };

        } else { // pattern with 5 blocks
            if (cellA == "" || cellB == "" || cellC == "" || cellD == "" || cellE == "") {
                continue
            };

            if (cellA == cellB && cellB == cellC && cellC == cellD && cellD == cellE) {
                roundWon = true;
                break;
            };
        };
    };

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;

    } else if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;

    } else { changePlayer(); };
};

function restartGame() {
    changePlayer();

    NxN_field.forEach(field => {
        if (field.getAttribute('title') == curr_field) {
            initializeGame(field);
        };
    });
};