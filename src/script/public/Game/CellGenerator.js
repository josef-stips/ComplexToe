// This file generates the TicTacToe field 

// field winning combinations
let WinConditions = [];
let options = [];

let cellSize;

let boundaries = [];

// calculate boundaries to prevent winning condition glitches
const CalculateBoundaries = () => {
    xCell_Amount = parseInt(xCell_Amount);
    boundaries = [];
    for (let i = xCell_Amount; i < xCell_Amount * xCell_Amount; i = i + xCell_Amount) boundaries.push(i);
};

// Creates the TicTacToe Field
function CreateField() {
    cellGrid.textContent = null;

    for (let i = 0; i < xCell_Amount * yCell_Amount; i++) {
        generateCell(i);
    };
    // css
    cellGrid.style.gridTemplateColumns = `repeat(${xCell_Amount}, 1fr)`;
};

// Generates a cell for the field
function generateCell(index) {
    let cell = document.createElement('div');
    cell.classList = "cell";
    cell.setAttribute('cell-index', index);

    cell.addEventListener('click', () => {
        playBtn_Audio_2();
    });

    let Cell = ConfigureCellSize(cell, xCell_Amount);

    cellGrid.appendChild(Cell);
};

// configure cell size 
const ConfigureCellSize = (cell, xCell_Amount) => {
    // configure cell size
    if (xCell_Amount == 5) {
        cell.style.fontSize = "79px";

    } else if (xCell_Amount == 10) {
        cell.style.fontSize = "47px";

    } else if (xCell_Amount == 15) {
        cell.style.fontSize = "24px";

    } else if (xCell_Amount == 20) {
        cell.style.fontSize = "20.5px";

        // KI specified Game Boards
    } else if (xCell_Amount == 3) {
        cell.style.fontSize = "100px";

    } else if (xCell_Amount == 4) {
        cell.style.fontSize = "88px";

        // Advanced Game Boards
    } else if (xCell_Amount == 25) {
        cell.style.fontSize = "13.5px";

    } else if (xCell_Amount == 30) {
        cell.style.fontSize = "11px";

    } else if (xCell_Amount == 40) {
        cell.style.fontSize = "var(--font-size-for-40x40-field)";
    };

    return cell;
};

// Generates an 2-dimensional array with all possible win combination for a 10x10 field
function CreateWinConditions(NxN, Allowed_Patterns) {
    WinConditions.length = 0;

    if (NxN == 5) {
        Create_5x5_WinCombis(Allowed_Patterns); // use win comb algorithm executer from 5x5.js

    } else if (NxN == 10) {
        Create_10x10_WinCombis(Allowed_Patterns); // use win comb algorithm executer from 10x10.js

    } else if (NxN == 15) {
        Create_15x15_WinCombis(Allowed_Patterns); // use win comb algorithm executer from 15x15.js

    } else if (NxN == 20) {
        Create_20x20_WinCombis(Allowed_Patterns); // use win comb algorithm executer from 20x20.js

    } else if (NxN == 25) {
        Create_25x25_WinCombis(Allowed_Patterns); // use win comb algorithm executer from 10x10.js

    } else if (NxN == 30) {
        Create_30x30_WinCombis(Allowed_Patterns); // use win comb algorithm executer from 15x15.js

    } else if (NxN == 40) {
        Create_40x40_WinCombis(Allowed_Patterns); // use win comb algorithm executer from 20x20.js

    } else if (NxN == 4) {
        Create_4x4_WinCombis(); // use win comb algorithm executer from 15x15.js

    } else if (NxN == 3) {
        Create_3x3_WinCombis(); // use win comb algorithm executer from 20x20.js
    };
};

// Create Options that are live in the game  
function CreateOptions(fromMap) {
    // reset 
    options.length = 0;
    // create
    options = Array(xCell_Amount * yCell_Amount).fill('');

    // bug fix
    if (fromMap == "fromMap") {
        setTimeout(() => {
            let cells = [...cellGrid.children];
            cells.forEach(cell => {
                cell.textContent = null;
                (cell.classList.contains("death-cell")) ? cell.className = "cell death-cell": cell.className = "cell";
            });
        }, 500);
    };
};

// Game Mode: Boneyard
// When the Game starts, this "Blocker" blocks some random cells so the gameplay is more enjoyable
// The Blocker takes a 3x3 field and sets n blocks on a random coordinate 
function Start_Blocker(onlineGame) {
    let Grid = [...cellGrid.children];

    // if in online mode
    if (onlineGame == 'OnlineMode' && personal_GameData.role == 'admin') {
        // X by X field for blocker 
        let XbyX = [
            [0, 1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
        ];
        let targetNumber = Grid.length - 1; // Hier kannst du die gewünschte Zielzahl angeben
        let result = continueArray(XbyX, targetNumber);

        // random option indexes 
        socket.emit('Global_Boneyard', [personal_GameData.currGameID, result, options, xCell_Amount]);

        // !! The final part is in serverHandler.js

    } else if (onlineGame != 'OnlineMode') { // if in normal mode
        // X by X field for blocker 
        let XbyX = [
            [0, 1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
        ];
        let targetNumber = Grid.length - 1; // Hier kannst du die gewünschte Zielzahl angeben
        let result = continueArray(XbyX, targetNumber);

        // Anzahl der Elemente, die schwarz gefärbt werden sollen
        for (i = 0; i < result.length; i++) {
            let RIndex = Math.floor(Math.random() * result[i].length);
            let Index = result[i][RIndex]

            // Zufälliges Kind-Element auswählen und Hintergrundfarbe auf Schwarz setzen
            Grid[Index].style.backgroundColor = "var(--font-color)";
            Grid[Index].classList = "cell death-cell";
            Grid[Index].removeEventListener('click', cellCicked);

            setTimeout(() => {
                Grid[Index].textContent = null;
            }, 100);
        };
    };
};
// Just a function from the blocker
function continueArray(XbyX, targetNumber) {
    let lastRow = XbyX[XbyX.length - 1];
    let currentNumber = lastRow[lastRow.length - 1] + 1;

    while (currentNumber <= targetNumber) {
        let newRow = [];
        for (let i = 0; i < lastRow.length; i++) {
            newRow.push(currentNumber);
            currentNumber++;
            if (currentNumber > targetNumber) {
                break;
            };
        };
        XbyX.push(newRow);
        lastRow = newRow;
    };
    return XbyX;
};

// GameMode: Blocker Combat
// Everytime when a player do his set, this interactive blocker blocks one "random" cell in his near
// This specific function is only availible in offline mode
function Activate_InteractiveBlocker() {
    // remove access to set
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
    });
    running = false;

    // blocker functionality ------------
    let Grid = [...cellGrid.children];

    // random index in the grid
    var RIndex = Math.floor(Math.random() * Grid.length);

    // update Grid
    if (Grid[RIndex].classList.length <= 1) {
        Grid[RIndex].textContent = null;
        Grid[RIndex].classList = "cell death-cell";
        Grid[RIndex].style.backgroundColor = "var(--font-color)";
        Grid[RIndex].style.color = "var(--font-color)";
        Grid[RIndex].removeEventListener('click', cellCicked);

        blockages |= (RIndex << 1); // update bitboard
    };
};