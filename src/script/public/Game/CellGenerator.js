// This file generates the TicTacToe field 

// field winning combinations
let WinConditions = [];
let options = [];

let cellSize;

let boundaries = [];

// calculate boundaries to prevent winning condition glitches
const CalculateBoundaries = () => {
    xCell_Amount = parseInt(xCell_Amount);
    yCell_Amount = parseInt(yCell_Amount);
    boundaries = [];

    boundaries.push(0);

    for (let i = xCell_Amount; i < xCell_Amount * yCell_Amount; i = i + xCell_Amount) boundaries.push(i);

    boundaries.push(xCell_Amount * yCell_Amount);

    // when y is bigger than x continue to add more boundaries to fill the whole grid with win combinations
    if (yCell_Amount > xCell_Amount) {
        for (i = 0; i < yCell_Amount - xCell_Amount; i++) {
            boundaries.push(xCell_Amount * yCell_Amount + xCell_Amount * i)
        };
    };
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
    cell.className = "cell";
    cell.setAttribute('cell-index', index);

    cell.addEventListener('click', () => {
        playBtn_Audio_2();
    });

    let Cell = ConfigureCellSize(cell, xCell_Amount);
    cellGrid.appendChild(Cell);

    if (xCell_Amount > yCell_Amount) {
        cellGrid.style.gridAutoRows = "min-content";
    };

    if (xCell_Amount < yCell_Amount) {
        cellGrid.style.overflowY = "visible";
        cellGrid.style.margin = "auto";
        ComplexToeField.style.overflowY = "auto";
        ComplexToeField.style.height = "auto";
        ComplexToeField.style.display = "grid";
        ComplexToeField.style.alignItems = "";
        ComplexToeField.style.justifyContent = "";
        document.querySelector(".GameArea-SideInfo-Footer").style.margin = "0 0 7.5% 0";
        document.querySelector("#GameArea-FieldIcon").style.margin = "0.75vh 0 1vh 0";
        Game_Upper_Field_Icon.style.margin = "0 0 5px 0";

    } else {
        cellGrid.style.overflowY = "unset";
        cellGrid.style.margin = "-15px auto";
        ComplexToeField.style.height = "55vh";
        ComplexToeField.style.overflowY = "unset";
        ComplexToeField.style.display = "flex";
        ComplexToeField.style.alignItems = "flex-start";
        ComplexToeField.style.justifyContent = "center";
        document.querySelector(".GameArea-SideInfo-Footer").style.margin = "";
        document.querySelector("#GameArea-FieldIcon").style.margin = "0 0 1vh 0";
    };
};

// configure cell size 
const ConfigureCellSize = (cell, xCell_Amount) => {
    // configure cell font size
    const maxGridSize = "var(--max-cellGrid-size)";

    if (xCell_Amount <= 25) {
        cell.style.fontSize = `calc((${maxGridSize} / ${xCell_Amount}) - 1vh)`;

    } else {
        cell.style.fontSize = `calc((${maxGridSize} / ${xCell_Amount}) - 1vh)`;
    };

    return cell;
};

// Generates an 2-dimensional array with all possible win combination for a 10x10 field
function CreateWinConditions(x, y, structures) {
    console.log(xCell_Amount, yCell_Amount, boundaries, structures);

    WinConditions.length = 0; // reset
    structures.forEach(pattern => CostumWinPattern(pattern, x, y)); // create
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
            let Index = result[i][RIndex];

            // Zufälliges Kind-Element auswählen und Hintergrundfarbe auf Schwarz setzen
            Grid[Index].style.backgroundColor = "var(--font-color)";
            Grid[Index].classList = "cell death-cell";
            Grid[Index].removeEventListener('click', cellCicked);

            boneyard_array.push(Index);

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

        cell_indexes_blocked_by_blocker.push(RIndex);

        blockages |= (RIndex << 1); // update bitboard
    };
};