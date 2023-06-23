// This file generates the TicTacToe field 
let cellGrid = document.querySelector('#cellGrid');

// field winning combinations
let WinConditions = [];
let options = [];

// Field x and y 
let yCell_Amount = 10;
let xCell_Amount = 10;

// Creates the TicTacToe Field
function CreateField() {
    cellGrid.textContent = null;

    for (let i = 0; i < xCell_Amount * yCell_Amount; i++) {
        generateCell(i);
    };
    // css
    cellGrid.style.gridTemplateColumns = `repeat(${xCell_Amount}, auto)`
};

// Generates a cell for the field
function generateCell(index) {
    let cell = document.createElement('div');
    cell.classList = "cell";
    cell.setAttribute('cell-index', index);

    cellGrid.appendChild(cell);
};

// Generates an 2-dimensional array with all possible win combination for a 10x10 field
function CreateWinConditions() {
    // use win comb algorithm executer from 10x10.js
    Create_10x10_WinCombis();
};

// Create Options that are live in the game  
function CreateOptions() {
    options = [];

    for (i = 0; i < xCell_Amount * yCell_Amount; i++) {
        options.push("");
    };
};