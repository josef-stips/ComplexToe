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
    cell.style.height = "5vh"

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

// When the Game starts, this "Blocker" blocks some random cells so the gameplay is more enjoyable
function Start_Blocker() {
    let Grid = [...cellGrid.children];
    let numToColor = Math.floor(Grid.length / 4); // Anzahl der Elemente, die schwarz gefärbt werden sollen

    if (Grid.length == 25) {
        numToColor = Math.floor(Grid.length / 7); // Anzahl der Elemente, die schwarz gefärbt werden sollen
    };

    if (Grid.length == 9 || Grid.length == 16) {
        numToColor = 0;
    };

    console.log(Grid);

    for (let i = 0; i < numToColor; i++) {
        // Zufälligen Index generieren
        let randomIndex = Math.floor(Math.random() * Grid.length);

        // Zufälliges Kind-Element auswählen und Hintergrundfarbe auf Schwarz setzen
        Grid[randomIndex].style.backgroundColor = "black";
        Grid[randomIndex].classList = "cell death-cell";
        Grid[randomIndex].removeEventListener('click', cellCicked);
    };
};