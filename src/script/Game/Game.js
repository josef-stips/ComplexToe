const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restart-btn');

let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    //Creates TicTacToe field etc.
    CreateField();
    CreateWinConditions();
    CreateOptions();

    const cells = document.querySelectorAll('.cell');

    // Adds click event to every single cell and starts game
    cells.forEach(cell => {
        cell.addEventListener('click', cellCicked);
    });
    // set up restart button
    restartBtn.addEventListener('click', restartGame);

    // start game
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
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
    initializeGame();
};