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
    if (curr_field != 'Small Price') { max_depth = Infinity };
    if (curr_field == 'Small Price') { max_depth = Infinity };
};

class HashTable {
    table = new Array(3);

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
        // return this.table[idx].find(x => x[0] === key) != undefined ? this.table[idx].find(x => x[0] === key)[1] : null;
        return this.table[idx].find(x => x[0] === key)[1];
    };

    init = () => {
        this.table = new Array(3);
    };
};
const tt = new HashTable;

function getMVVLVAValue(piece) {
    const pieceValues = {
        'X': 5, // Wert von 'X'
        'O': 3, // Wert von 'O'
        '': 0 // Wert von leeren Zellen
    };
    return pieceValues[piece];
}

function compareMoves(a, b) {
    const pieceA = options[a];
    const pieceB = options[b];
    const valueA = getMVVLVAValue(pieceA);
    const valueB = getMVVLVAValue(pieceB);

    // Sortiere absteigend, damit die wertvollsten Züge zuerst kommen
    return valueB - valueA;
}

function bitboardIndex(row, col) {
    return row * 3 + col;
}

function setBit(bitboard, index, value) {
    return value ? (bitboard | (1 << index)) : (bitboard & ~(1 << index));
}

function isBitSet(bitboard, index) {
    return (bitboard & (1 << index)) !== 0;
}

let bitboard = 0b0;
let boards = [0b0, 0b0];
let counter = 0;

function KI_Action() {
    // remove access to set X from Player1 
    cells.forEach(cell => {
        cell.removeEventListener('click', cellCicked);
        cell.style.cursor = 'default';
    });

    counter++;

    let bestMove = -1;
    let startTime = Date.now();
    let maxDepth = 1;

    while (Date.now() - startTime < 1000) { // Adjust the time limit as needed
        let tempBestMove = iterativeDeepening(bitboard, maxDepth);
        if (tempBestMove !== -1) {
            bestMove = tempBestMove;
        }
        maxDepth++;
    }

    console.log(bitboard);
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

function terativeDeepening(options, maxDepth) {
    let bestMove = -1;
    let bestScore = -Infinity;
    let alpha = -Infinity;
    let beta = Infinity;

    for (let i = 0; i < 9; i++) {
        if (options[i] == "") {

            options[i] = PlayerData[2].PlayerForm;
            let score = minimax(options, 0, alpha, beta, false, maxDepth);
            options[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            };
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        };
    };

    return bestMove;
};

function iterativeDeepening(bitboard, maxDepth) {
    let bestMove = -1;
    let bestScore = -Infinity;
    let alpha = -Infinity;
    let beta = Infinity;

    for (let i = 0; i < 9; i++) {
        if (!isBitSet(bitboard, i)) {
            // let newBitboard = setBit(boards[0], i, true);
            let newBitboard = setBit(bitboard, i, false);
            let score = minimax(newBitboard, 0, alpha, beta, false, maxDepth);
            setBit(bitboard, i, false);

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }

            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        }
    }

    return bestMove;
}

function rotateBoard(board) {
    let rotatedBoard = [];
    for (let col = 0; col < board.length; col++) {
        let newRow = "";
        for (let row = board.length - 1; row >= 0; row--) {
            newRow += board[row][col];
        }
        rotatedBoard.push(newRow);
    }
    return rotatedBoard;
};

// minimax algorithm
function minimax(bitboard, depth, alpha, beta, isMaximazing) {
    // console.count();
    let result = minimax_checkWinner(bitboard);
    // console.log(result);
    if (result !== null) {
        return scores[result];
    };

    // let alphaOrigin = alpha;
    // let ttEntry = tt.getItem(JSON.stringify(cells));

    // if (ttEntry != null && ttEntry.depth >= depth) {
    //     if (ttEntry.flag == "EXACT") {
    //         return ttEntry.bestScore;

    //     } else if (ttEntry.flag == alpha) {
    //         alpha = Math.max(alpha, ttEntry.bestScore);

    //     } else if (ttEntry.flag == beta) {
    //         beta = Math.min(beta, ttEntry.bestScore);
    //     };

    //     if (alpha >= beta) return ttEntry.bestScore;
    // };

    // if (depth % 2 === 0) {
    //     board = rotateBoard(options);
    // };

    if (isMaximazing) {
        // let moves = [];
        // for (let i = 0; i < 9; i++) {
        //     if (!isBitSet(bitboard, i)) {
        //         moves.push(i);
        //     };
        // };
        // moves.sort(compareMoves);
        // console.log(moves);

        // for (let j = 0; j < moves.length; j++) {
        //     let i = moves[j];
        //     options[i] = PlayerData[2].PlayerForm;
        //     let Iscore = minimax_checkWinner() === PlayerData[2].PlayerForm ? 1 : 0;
        //     options[i] = "";
        //     // console.log(Iscore);
        //     if (Iscore === 1) {
        //         return 1; // Der maximierende Spieler kann sofort gewinnen
        //     };
        // };

        let bestScore = -Infinity;
        for (let k = 0; k < 9; k++) {
            if (!isBitSet(bitboard, i)) {
                const i = k;

                // setBit(boards[0], i, true);
                let newBitboard = setBit(bitboard, i, false);
                counter++;
                // cells[i].textContent = PlayerData[2].PlayerForm;
                let score = minimax(newBitboard, depth + 1, alpha, beta, false);
                // setBit(boards[0], i, false);
                setBit(bitboard, i, false);
                counter--;
                // cells[i].textContent = '';

                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);

                if (beta <= alpha) break;
                if (depth >= max_depth) break;
            };
        };

        // if (bestScore <= alphaOrigin) {
        //     flag = beta;

        // } else if (bestScore >= beta) {
        //     flag = alpha;

        // } else {
        //     flag = 'EXACT';
        // };
        // tt.setItem(JSON.stringify(cells), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

        return bestScore;

    } else {
        // let moves = [];
        // for (let i = 0; i < 9; i++) {
        //     if (!isBitSet(bitboard, i)) {
        //         moves.push(i);
        //     };
        // };
        // moves.sort(compareMoves).reverse();
        // console.log(moves);

        // for (let j = 0; j < moves.length; j++) {
        //     let i = moves[j];
        //     options[i] = PlayerData[1].PlayerForm;
        //     let Iscore = minimax_checkWinner() === PlayerData[1].PlayerForm ? -1 : 0;
        //     options[i] = "";
        //     // console.log(Iscore);
        //     if (Iscore === -1) {
        //         return -1; // Der maximierende Spieler kann sofort gewinnen
        //     };
        // };

        let bestScore = Infinity;
        for (let k = 0; k < 9; k++) {
            if (!isBitSet(bitboard, i)) {
                const i = k;

                // setBit(boards[1], i, true);
                let newBitboard = setBit(bitboard, i, true);
                counter++;
                // cells[i].textContent = PlayerData[1].PlayerForm;
                let score = minimax(newBitboard, depth + 1, alpha, beta, true);
                // setBit(boards[1], i, false);
                setBit(bitboard, i, false);
                counter--;
                // cells[i].textContent = '';

                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);

                if (beta <= alpha) break;
                if (depth >= max_depth) break;
            };
        };

        // if (bestScore <= alphaOrigin) {
        //     flag = beta;

        // } else if (bestScore >= beta) {
        //     flag = alpha;

        // } else {
        //     flag = 'EXACT';
        // };
        // tt.setItem(JSON.stringify(cells), { bestScore: bestScore, flag: flag, is_valid: true, depth: depth });

        return bestScore;
    };
};

// This is just for the minimax algorithm
function minimax_checkWinne() {
    let winner = null;
    for (let i = 0; i < WinConditions.length; i++) {
        const condition = WinConditions[i];

        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];
        let cellD = options[condition[3]];
        let cellE = options[condition[4]]; // fifth block

        if (cellE == undefined && cellD != undefined) { // Check win for a 4 block pattern combination
            if (cellA == "" || cellB == "" || cellC == "" || cellD == "") {
                continue
            };
            if (cellA == cellB && cellB == cellC && cellC == cellD && cellA != "") {
                winner = cellA;
                break
            }
        } else if (cellD == undefined && cellE == undefined && cellC != undefined) { // Check win for a 3 block pattern combination
            if (cellA == "" || cellB == "" || cellC == "") {
                continue
            }
            if (cellA == cellB && cellB == cellC) {
                winner = cellA;
                break
            }
        } else if (cellD != undefined && cellE != undefined) { // Check win for a 5 block pattern combination
            if (cellA == "" || cellB == "" || cellC == "" || cellD == "" || cellE == "") {
                continue
            }
            if (cellA == cellB && cellB == cellC && cellC == cellD && cellD == cellE && cellA != "") {
                winner = cellA;
                break
            }
        } else if (cellD == undefined && cellE == undefined && cellC == undefined && cellB != undefined) { // Check win for a 3 block pattern combination
            if (cellA == "" || cellB == "") {
                continue
            }
            if (cellA == cellB && cellA != "") {
                winner = cellA;
                break
            }
        }
    }

    let openSpots = 0;
    for (let i = 0; i < options.length; i++) {
        if (options[i] == "") {
            openSpots++;
        };
    };
    if (winner == null && openSpots == 0) { return 'tie' } else { return winner };
};

function minimax_checkWinner() {
    // let winner = null;
    // if (counter < 5) return winner;
    const winPatterns = [
        // Horizontale Kombinationen
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Vertikale Kombinationen
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonale Kombinationen
        [0, 4, 8],
        [2, 4, 6],
    ]; // Diagonal

    // let bitboard = boards[counter & 1]; // ungerade = board von player x, gerade = board von player o

    // const winPatterns = [0b111000000, 0b000111000, 0b000000111, 0b100100100, 0b010010010, 0b001001001, 0b100010001, 0b001010100];
    // let bitfilter = 0b1001001001001001001001;

    // (((counter % 2) === 1) ? winner = PlayerData[1].PlayerForm : winner = PlayerData[2].PlayerForm) checks which player won now
    // return ((bitboard & (bitboard >> 1) & (bitboard >> 2) & bitfilter) > 0) ? (((counter % 2) === 1) ? winner = PlayerData[1].PlayerForm : winner = PlayerData[2].PlayerForm) : winner = null;

    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (isBitSet(bitboard, a) && isBitSet(bitboard, b) && isBitSet(bitboard, c) && isBitSet(bitboard, d)) {
            return isBitSet(bitboard, a) ? PlayerData[2].PlayerForm : PlayerData[1].PlayerForm;
            // break;
        }
    }

    // for (let i = 0; i < winPatterns.length; i++) {
    //     if ((x_player & winPatterns[i]) == winPatterns[i]) {
    //         winner = PlayerData[1].PlayerForm;
    //         break;
    //     };

    //     console.log((o_player & winPatterns[i]), (x_player & winPatterns[i]))
    //     if ((o_player & winPatterns[i]) == winPatterns[i]) {
    //         winner = PlayerData[2].PlayerForm;
    //         break;
    //     };
    // };

    // let openSpots = false;
    for (let i = 0; i < 9; i++) {
        if (!isBitSet(bitboard, i)) {
            // openSpots = true;
            // break;
            return 'tie';
        };
    };

    return null;
    // if (winner == null && !openSpots) { return 'tie' } else { return winner };
};