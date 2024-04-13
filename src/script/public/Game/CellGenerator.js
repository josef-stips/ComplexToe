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

    boundaries.push(0);

    for (let i = xCell_Amount; i < xCell_Amount * xCell_Amount; i = i + xCell_Amount) boundaries.push(i);

    boundaries.push(xCell_Amount * xCell_Amount);
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
    const maxGridSize = "var(--max-cellGrid-size)";

    if (xCell_Amount <= 25) {
        cell.style.fontSize = `calc((${maxGridSize} / ${xCell_Amount}) - 10px)`;

    } else {
        cell.style.fontSize = `calc((${maxGridSize} / ${xCell_Amount}) - 5px)`;
    };

    return cell;
};

// Generates an 2-dimensional array with all possible win combination for a 10x10 field
function CreateWinConditions(NxN, Allowed_Patterns) {
    xCell_Amount = NxN;
    CalculateBoundaries();

    WinConditions.length = 0;

    let list = GamePatternsList;
    let patterns = Allowed_Patterns.map(name => list[name]);

    console.log(NxN, Allowed_Patterns, list, patterns);

    patterns.forEach(pattern => CostumWinPattern(pattern, NxN, NxN));
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