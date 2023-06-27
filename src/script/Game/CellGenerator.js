// This file generates the TicTacToe field 
let cellGrid = document.querySelector('#cellGrid');

// field winning combinations
let WinConditions = [];
let options = [];

// Field x and y 
let yCell_Amount; // numb
let xCell_Amount; // numb

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