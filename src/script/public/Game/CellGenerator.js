// This file generates the TicTacToe field 
let cellGrid = document.querySelector('#cellGrid');

// field winning combinations
let WinConditions = [];
let options = [];

// Creates the TicTacToe Field
function CreateField() {
    cellGrid.textContent = null;

    for (let i = 0; i < xCell_Amount * yCell_Amount; i++) {
        generateCell(i);
    };
    // css
    cellGrid.style.gridTemplateColumns = `repeat(${xCell_Amount}, auto)`;
};

// Generates a cell for the field
function generateCell(index) {
    let cell = document.createElement('div');
    cell.classList = "cell";
    cell.setAttribute('cell-index', index);

    cell.addEventListener('click', () => {
        btn_sound2.volume = 0.075;
        btn_sound2.play();
    });

    // configure cell size
    if (xCell_Amount == 5) {
        cell.style.width = "10.4vh";
        cell.style.height = "10.4vh";
        cell.style.fontSize = "79px";

    } else if (xCell_Amount == 10) {
        cell.style.width = "5vh";
        cell.style.height = "5vh";
        cell.style.fontSize = "47px";

    } else if (xCell_Amount == 15) {
        cell.style.width = "3.23vh";
        cell.style.height = "3.23vh";
        cell.style.fontSize = "30px";

    } else if (xCell_Amount == 20) {
        cell.style.width = "2.34vh";
        cell.style.height = "2.34vh";
        cell.style.fontSize = "24px";

        // KI specified Game Boards
    } else if (xCell_Amount == 3) {
        cell.style.width = "12.4vh";
        cell.style.height = "12.4vh";
        cell.style.fontSize = "100px";

    } else if (xCell_Amount == 4) {
        cell.style.width = "12.4vh";
        cell.style.height = "12.4vh";
        cell.style.fontSize = "88px";
    };

    cellGrid.appendChild(cell);
};

// Generates an 2-dimensional array with all possible win combination for a 10x10 field
function CreateWinConditions(NxN) {
    WinConditions.length = 0;

    if (NxN == 5) {
        Create_5x5_WinCombis(); // use win comb algorithm executer from 5x5.js

    } else if (NxN == 10) {
        Create_10x10_WinCombis(); // use win comb algorithm executer from 10x10.js

    } else if (NxN == 15) {
        Create_15x15_WinCombis(); // use win comb algorithm executer from 15x15.js

    } else if (NxN == 20) {
        Create_20x20_WinCombis(); // use win comb algorithm executer from 20x20.js

    } else if (NxN == 4) {
        Create_4x4_WinCombis(); // use win comb algorithm executer from 15x15.js

    } else if (NxN == 3) {
        Create_3x3_WinCombis(); // use win comb algorithm executer from 20x20.js
    };
};

// Create Options that are live in the game  
function CreateOptions() {
    // reset 
    options.length = 0;

    // create
    for (i = 0; i < xCell_Amount * yCell_Amount; i++) {
        options.push("");
    };
};

// Game Mode: Boneyard
// When the Game starts, this "Blocker" blocks some random cells so the gameplay is more enjoyable
// The Blocker takes a 3x3 field and sets n blocks on a random coordinate 
function Start_Blocker() {
    let Grid = [...cellGrid.children];

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
            Grid[RIndex].textContent = null;
        }, 100);
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
function Activate_InteractiveBlocker() {
    // remove access to set
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
    });
    running = false;

    let Grid = [...cellGrid.children];
    let RIndex = Math.floor(Math.random() * Grid.length);

    if (Grid[RIndex].classList.length <= 1) {
        Grid[RIndex].classList = "cell death-cell";
        Grid[RIndex].style.backgroundColor = "var(--font-color)";
        Grid[RIndex].removeEventListener('click', cellCicked);
        setTimeout(() => {
            Grid[RIndex].textContent = null;
        }, 100);
    };
};