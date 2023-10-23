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
    if (curr_field == 'Thunder Advanture') { max_depth = 10 };
    if (curr_field == 'Small Price') { max_depth = 100 };
};

class HashTable {
    table = new Array(17);

    hash = (s, tableSize) => {
        let hash = 17;
        for (let i = 0; i < s.length; i++) {
            hash = (13 * hash * s.charCodeAt(i)) % tableSize;
        };
        return hash;
    };
    setItem = (key, value) => {
        const idx = this.hash(key, this.table.length);
        if (this.table[idx]) {
            this.table[idx].push([key, value]);
        } else {
            this.table[idx] = [
                [key, value]
            ];
        };
        this.table[idx] = [
            [key, value]
        ];
    };
    getItem = (key) => {
        const idx = this.hash(key, this.table.length);
        if (!this.table[idx]) return null;
        return this.table[idx].find(x => x[0] === key)[1];
    };

    init = () => {
        this.table = new Array(17);
    };
};
const tt = new HashTable;

// KI sets O somewhere
function KI_Actin() {
    // remove access to set X from Player1 
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
        cell.style.cursor = 'default';
    });

    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
            cells[i].textContent = PlayerData[2].PlayerForm;
            options[i] = PlayerData[2].PlayerForm;

            let score = minimax(cells, 0, -Infinity, Infinity, false);
            console.log(score);

            cells[i].textContent = '';
            options[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            };
        };
    };
    console.log(bestMove);

    // Ki move
    cells[bestMove].textContent = currentPlayer;
    options[bestMove] = currentPlayer;
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
function minima(cells, depth, alpha, beta, isMaximazing) {
    console.count();
    let result = minimax_checkWinner();
    if (result !== null) {
        return scores[result];
    };

    let alphaOrigin = alpha;
    let ttEntry = tt.getItem(JSON.stringify(cells));

    if (ttEntry != null && ttEntry.depth >= depth) {
        if (ttEntry.flag == "EXACT") {
            return ttEntry.bestScore;

        } else if (ttEntry.flag == alpha) {
            alpha = Math.max(alpha, ttEntry.bestScore);

        } else if (ttEntry.flag == beta) {
            beta = Math.min(beta, ttEntry.bestScore);
        };

        if (alpha >= beta) return ttEntry.bestScore;
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

        if (bestScore <= alphaOrigin) {
            flag = beta;

        } else if (bestScore >= beta) {
            flag = alpha;

        } else {
            flag = 'EXACT';
        };

        tt.setItem(JSON.stringify(cells), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

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

        if (bestScore <= alphaOrigin) {
            flag = beta;

        } else if (bestScore >= beta) {
            flag = alpha;

        } else {
            flag = 'EXACT';
        };

        tt.setItem(JSON.stringify(cells), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

        return bestScore;
    };
};

function negamax(cells, depth, alpha, beta, color) {
    console.count();

    let alphaOrigin = alpha;
    let ttEntry = tt.getItem(JSON.stringify(cells));

    if (ttEntry != null && ttEntry.depth >= depth) {

        if (ttEntry.flag == "EXACT") {
            return color * ttEntry.bestScore;

        } else if (ttEntry.flag == alpha) {
            alpha = Math.max(alpha, ttEntry.bestScore);

        } else if (ttEntry.flag == beta) {
            beta = Math.min(beta, ttEntry.bestScore);
        };
        if (alpha >= beta) return color * ttEntry.bestScore;
    };

    let result = minimax_checkWinner();
    if (result !== null || depth <= 0) {
        return color * scores[result];
    };

    let bestScore = -Infinity;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
            cells[i].textContent = PlayerData[color].PlayerForm;
            options[i] = PlayerData[color].PlayerForm;

            let score = -negamax(cells, depth - 1, -beta, -alpha, 3 - color);

            cells[i].textContent = '';
            options[i] = '';

            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, score);

            if (alpha >= beta) break;
        };
    };
    if (bestScore <= alphaOrigin) {
        flag = beta;

    } else if (bestScore >= beta) {
        flag = alpha;

    } else {
        flag = 'EXACT';
    };

    tt.setItem(JSON.stringify(cells), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

    return bestScore;
};

function KI_Action() {
    // remove access to set X from Player1 
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
        cell.style.cursor = 'default';
    });

    let bestMove = -1;
    let startTime = Date.now();
    let maxDepth = 1;

    while (Date.now() - startTime < 1000) { // Adjust the time limit as needed
        let tempBestMove = iterativeDeepening(cells, maxDepth);
        if (tempBestMove !== -1) {
            bestMove = tempBestMove;
        }
        maxDepth++;
    }

    console.log(bestMove);

    // Ki move
    cells[bestMove].textContent = currentPlayer;
    options[bestMove] = currentPlayer;
    // change Player
    checkWinner();

    // add access to set X from Player1 
    setTimeout(() => {
        cells.forEach(cell => {
            cell.addEventListener('click', cellCicked);
            cell.style.cursor = 'pointer';
        });
    }, 700);
}

function iterativeDeepening(cells, maxDepth) {
    let bestMove = -1;
    let bestScore = -Infinity;
    let alpha = -Infinity;
    let beta = Infinity;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.length <= 1 && cells[i].textContent == "") {
            cells[i].textContent = PlayerData[2].PlayerForm;
            options[i] = PlayerData[2].PlayerForm;

            let score = minimax(cells, 0, alpha, beta, false, maxDepth);
            console.log(score);

            cells[i].textContent = '';
            options[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        }
    }

    return bestMove;
};

// minimax algorithm
function minimax(cells, depth, alpha, beta, isMaximazing, max_depth) {
    console.count();
    let result = minimax_checkWinner();
    if (result !== null) {
        return scores[result];
    };

    let alphaOrigin = alpha;
    let ttEntry = tt.getItem(JSON.stringify(cells));

    if (ttEntry != null && ttEntry.depth >= depth) {
        if (ttEntry.flag == "EXACT") {
            return ttEntry.bestScore;

        } else if (ttEntry.flag == alpha) {
            alpha = Math.max(alpha, ttEntry.bestScore);

        } else if (ttEntry.flag == beta) {
            beta = Math.min(beta, ttEntry.bestScore);
        };

        if (alpha >= beta) return ttEntry.bestScore;
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

        if (bestScore <= alphaOrigin) {
            flag = beta;

        } else if (bestScore >= beta) {
            flag = alpha;

        } else {
            flag = 'EXACT';
        };

        tt.setItem(JSON.stringify(cells), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

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

        if (bestScore <= alphaOrigin) {
            flag = beta;

        } else if (bestScore >= beta) {
            flag = alpha;

        } else {
            flag = 'EXACT';
        };

        tt.setItem(JSON.stringify(cells), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

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

        if (cellD != undefined) {
            if (cellA == "" || cellB == "" || cellC == "" || cellD == "") {
                continue;
                // return 'tie';
            };
            if (cellA == cellB && cellB == cellC && cellC == cellD) {
                winner = cellA
                break;
            };

        } else {
            if (cellA == "" || cellB == "" || cellC == "") {
                continue;
                // return 'tie';
            };
            if (cellA == cellB && cellB == cellC) {
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