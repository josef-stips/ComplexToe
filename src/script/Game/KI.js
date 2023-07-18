// ai difficulty levels
let ai_difficulty = {
    1: {
        'difficulty_level': 'level 1',
        'name': 'washing machine',
        'max_depth': 1
    },
    2: {
        'difficulty_level': 'level 2',
        'name': 'crazy wedding',
        'max_depth': 3
    },
    3: {
        'difficulty_level': 'level 3',
        'name': 'insane storm',
        'max_depth': 7
    },
};

// how deep the minimax algorithm must search
let max_depth;

function Find_MaxDepth() {
    if (curr_field == 'Thunder Advanture') { max_depth = 6 };
    if (curr_field == 'Small Price') { max_depth = 100 };
};

// KI sets O somewhere
function KI_Action() {
    // remove access to set X from Player1 
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
        cell.style.cursor = 'default';
    });

    // call minimax algorithm
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
            cells[i].textContent = PlayerData[2].PlayerForm;
            options[i] = PlayerData[2].PlayerForm;
            let score = minimax(cells, 0, -Infinity, Infinity, false);
            cells[i].textContent = '';
            options[i] = '';

            if (score > bestScore) {
                bestScore = score;
                move = i;
            };
        };
    };

    // Ki move
    cells[move].textContent = currentPlayer;
    options[move] = currentPlayer;
    // change Player
    checkWinner();

    // add access to set X from Player1 
    setTimeout(() => {
        cells.forEach(cell => {
            cell.addEventListener('click', cellCicked);
            cell.style.cursor = 'pointer';
        });
    }, 700);
};

// minimax algorithm
function minimax(cells, depth, alpha, beta, isMaximazing) {
    let result = minimax_checkWinner();
    if (result !== null) {
        return scores[result];
    };

    if (isMaximazing) {
        let bestScore = -Infinity;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
                // check possible game states
                cells[i].textContent = PlayerData[2].PlayerForm;
                options[i] = PlayerData[2].PlayerForm;
                let score = minimax(cells, depth + 1, alpha, beta, false);
                cells[i].textContent = '';
                options[i] = '';

                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);

                if (beta <= alpha) break;
                if (depth >= max_depth) break;
            };
        };
        return bestScore;

    } else {
        let bestScore = Infinity;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
                // check possible game states
                cells[i].textContent = PlayerData[1].PlayerForm;
                options[i] = PlayerData[1].PlayerForm;
                let score = minimax(cells, depth + 1, alpha, beta, true);
                cells[i].textContent = '';
                options[i] = '';

                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);

                if (beta <= alpha) break;
                if (depth >= max_depth) break;
            };
        };
        return bestScore;
    };
};

// This is just for the minimax algorithm
function minimax_checkWinner() {
    let winner = null;

    for (let i = 0; i < WinConditions.length; i++) {
        const condition = WinConditions[i];

        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];
        let cellD = options[condition[3]];
        let cellE = options[condition[4]]; // fifth block

        // Check win
        if (cellE == undefined && cellD != undefined) { // if pattern with 4 blocks

            if (cellA == "" || cellB == "" || cellC == "" || cellD == "") { // Check win for a 4 block pattern combination
                continue
            };
            if (cellA == cellB && cellB == cellC && cellC == cellD) {
                winner = cellA
                break;
            };

        } else if (cellD == undefined && cellE == undefined && cellC != undefined) { // Check win for a 3 block pattern combination

            if (cellA == "" || cellB == "" || cellC == "") {
                continue
            };
            if (cellA == cellB && cellB == cellC) {
                winner = cellA
                break;
            };

        } else if (cellD != undefined && cellE != undefined) { // Check win for a 5 block pattern combination

            if (cellA == "" || cellB == "" || cellC == "" || cellD == "" || cellE == "") {
                continue
            };
            if (cellA == cellB && cellB == cellC && cellC == cellD && cellD == cellE) {
                winner = cellA
                break;
            };
        };
    };

    let openSpots = 0;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
            openSpots++;
        };
    };

    if (winner == null && openSpots == 0) { return 'tie' } else { return winner };
};